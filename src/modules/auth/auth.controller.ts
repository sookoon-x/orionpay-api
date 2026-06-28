import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { WalletConnectDto, GenerateNonceDto } from './dto/wallet-connect.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }

  @Post('wallet/nonce')
  @HttpCode(HttpStatus.OK)
  async generateWalletNonce(@Body() generateNonceDto: GenerateNonceDto) {
    return this.authService.generateNonce(generateNonceDto.walletAddress, generateNonceDto.chain);
  }

  @Post('wallet/connect')
  @HttpCode(HttpStatus.OK)
  async connectWallet(@Body() walletConnectDto: WalletConnectDto) {
    return this.authService.verifyWalletSignature(
      walletConnectDto.walletAddress,
      walletConnectDto.chain,
      walletConnectDto.signature,
      walletConnectDto.message,
      walletConnectDto.nonce
    );
  }
}