import { AuthService } from './auth.service';
import { WalletConnectDto, GenerateNonceDto } from './dto/wallet-connect.dto';
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
}
