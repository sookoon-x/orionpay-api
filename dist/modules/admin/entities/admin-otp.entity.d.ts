import { Admin } from './admin.entity';
export declare class AdminOtp {
    id: string;
    otp: string;
    adminId: string;
    admin: Admin;
    isUsed: boolean;
    expiresAt: Date;
    createdAt: Date;
}
