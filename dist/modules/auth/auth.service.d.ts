import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { BlockchainService } from '../blockchain/blockchain.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private blockchainService;
    constructor(usersService: UsersService, jwtService: JwtService, blockchainService: BlockchainService);
    signIn(email: string, pass: string): Promise<{
        access_token: string;
    }>;
    validateUser(userId: string): Promise<import("../users/entities/user.entity").User | null>;
    private walletNonces;
    generateNonce(walletAddress: string, chain: string): Promise<{
        nonce: string;
        message: string;
    }>;
    verifyWalletSignature(walletAddress: string, chain: string, signature: string, message: string, nonce: string): Promise<{
        access_token: string;
        user: any;
        isNewUser: boolean;
    }>;
}
