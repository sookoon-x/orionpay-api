import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { BlockchainService } from '../blockchain/blockchain.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private blockchainService: BlockchainService
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }

  async validateUser(userId: string) {
    return this.usersService.findById(userId);
  }

  // Store nonces for wallet authentication (in production, use Redis)
  private walletNonces = new Map<string, { nonce: string; expiresAt: number; chain: string }>();

  async generateNonce(walletAddress: string, chain: string): Promise<{ nonce: string; message: string }> {
    // Clean up expired nonces
    const now = Date.now();
    for (const [key, data] of this.walletNonces.entries()) {
      if (data.expiresAt < now) {
        this.walletNonces.delete(key);
      }
    }

    // Create unique key for chain+address
    const uniqueKey = `${chain}:${walletAddress.toLowerCase()}`;
    
    // Generate new nonce
    const nonce = uuidv4();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    this.walletNonces.set(uniqueKey, { nonce, expiresAt, chain });

    // Create message to sign
    const message = `Sign this message to authenticate with OrionPay. Chain: ${chain}. Nonce: ${nonce}`;
    return { nonce, message };
  }

  async verifyWalletSignature(
    walletAddress: string,
    chain: string,
    signature: string,
    message: string,
    nonce: string
  ): Promise<{ access_token: string; user: any; isNewUser: boolean }> {
    const uniqueKey = `${chain}:${walletAddress.toLowerCase()}`;
    
    // Verify nonce exists and is valid
    const storedNonceData = this.walletNonces.get(uniqueKey);
    if (!storedNonceData || storedNonceData.nonce !== nonce) {
      throw new BadRequestException('Invalid or expired nonce');
    }

    if (storedNonceData.expiresAt < Date.now()) {
      this.walletNonces.delete(uniqueKey);
      throw new BadRequestException('Nonce has expired');
    }

    // Verify signature using blockchain service
    let isSignatureValid = false;
    try {
      isSignatureValid = await this.blockchainService.verifySignature(
        chain,
        message,
        signature,
        walletAddress
      );
    } catch (error) {
      throw new UnauthorizedException('Failed to verify signature');
    }

    if (!isSignatureValid) {
      throw new UnauthorizedException('Invalid signature');
    }

    // Consume the nonce
    this.walletNonces.delete(uniqueKey);

    // Find or create user
    const userIdentifier = `${chain}:${walletAddress.toLowerCase()}`;
    let user = await this.usersService.findByWalletAddress(userIdentifier);
    let isNewUser = false;

    if (!user) {
      // Create new user with chain-specific wallet address
      const randomPassword = crypto.randomBytes(32).toString('hex');
      user = await this.usersService.create({
        email: `${userIdentifier}@wallet.local`,
        password: randomPassword,
        firstName: `${chain.charAt(0).toUpperCase() + chain.slice(1)}`,
        lastName: 'User',
        walletAddress: userIdentifier
      });
      isNewUser = true;
    }

    // Generate JWT
    const payload = { sub: user.id, email: user.email, walletAddress: user.walletAddress, chain: chain };
    const access_token = await this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        walletAddress: walletAddress,
        chain: chain,
        email: user.email
      },
      isNewUser
    };
  }
}