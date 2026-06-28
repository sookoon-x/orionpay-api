import { AuthService } from './auth.service';
import { WalletConnectDto, GenerateNonceDto } from './dto/wallet-connect.dto';
import { UserGenerateOtpDto } from './dto/user-generate-otp.dto';
import { UserVerifyOtpDto } from './dto/user-verify-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    generateWalletNonce(generateNonceDto: GenerateNonceDto): Promise<{
        nonce: string;
        message: string;
    }>;
    connectWallet(walletConnectDto: WalletConnectDto): Promise<{
        access_token: string;
        user: any;
        isNewUser: boolean;
    }>;
    requestOtp(userGenerateOtpDto: UserGenerateOtpDto): Promise<{
        message: string;
        requestId: string;
    }>;
    verifyOtp(userVerifyOtpDto: UserVerifyOtpDto): Promise<{
        accessToken: string;
        user: any;
    }>;
    processPendingOtps(): Promise<void>;
    cleanupExpired(): Promise<void>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
        requestId: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
