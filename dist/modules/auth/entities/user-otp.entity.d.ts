import { User } from '../../users/entities/user.entity';
import { OtpRequestStatus } from '../enums/otp-request-status.enum';
export declare class UserOtp {
    id: string;
    otp: string;
    userId: string;
    user: User;
    isUsed: boolean;
    expiresAt: Date;
    status: OtpRequestStatus;
    processedAt: Date;
    createdAt: Date;
    isPasswordReset: boolean;
    resetToken: string;
}
