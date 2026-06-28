import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { BlockchainService } from '../blockchain/blockchain.service';
import { UserOtp } from './entities/user-otp.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    private blockchainService;
    private readonly userOtpRepository;
    constructor(usersService: UsersService, jwtService: JwtService, blockchainService: BlockchainService, userOtpRepository: Repository<UserOtp>);
    requestUserOtp(email: string): Promise<{
        message: string;
        requestId: string;
    }>;
    verifyUserOtp(email: string, otp: string): Promise<{
        accessToken: string;
        user: any;
    }>;
    processPendingOtpRequests(): Promise<void>;
    cleanupExpiredOtps(): Promise<void>;
    requestPasswordReset(email: string): Promise<{
        message: string;
        requestId: string;
    }>;
    resetPassword(email: string, otp: string, newPassword: string): Promise<{
        message: string;
    }>;
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
