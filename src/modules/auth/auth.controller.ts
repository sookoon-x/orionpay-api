import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { WalletConnectDto, GenerateNonceDto } from './dto/wallet-connect.dto';
import { UserGenerateOtpDto } from './dto/user-generate-otp.dto';
import { UserVerifyOtpDto } from './dto/user-verify-otp.dto';

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

  @Post('otp/request')
  @HttpCode(HttpStatus.OK)
  async requestOtp(@Body() userGenerateOtpDto: UserGenerateOtpDto) {
    return this.authService.requestUserOtp(userGenerateOtpDto.email);
  }

  @Post('otp/verify')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() userVerifyOtpDto: UserVerifyOtpDto) {
    return this.authService.verifyUserOtp(userVerifyOtpDto.email, userVerifyOtpDto.otp);
  }

  // Admin endpoint to manually process pending OTP requests (until cron is set up)
  @Post('otp/process')
  @HttpCode(HttpStatus.OK)
  async processPendingOtps() {
    return this.authService.processPendingOtpRequests();
  }

  // Admin endpoint to manually clean up expired OTPs
  @Post('otp/cleanup')
  @HttpCode(HttpStatus.OK)
  async cleanupExpired() {
    return this.authService.cleanupExpiredOtps();
  }
}