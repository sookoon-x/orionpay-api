import { Repository } from 'typeorm';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { GenerateOtpDto } from './dto/generate-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { User } from '../users/entities/user.entity';
import { Transaction } from '../payments/entities/transaction.entity';
export declare class AdminController {
    private readonly adminService;
    private readonly userRepository;
    private readonly transactionRepository;
    constructor(adminService: AdminService, userRepository: Repository<User>, transactionRepository: Repository<Transaction>);
    login(adminLoginDto: AdminLoginDto): Promise<{
        accessToken: string;
        admin: Omit<import("./entities/admin.entity").Admin, "password">;
    }>;
    generateOtp(generateOtpDto: GenerateOtpDto): Promise<{
        message: string;
        otp?: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        accessToken: string;
        admin: Omit<import("./entities/admin.entity").Admin, "password">;
    }>;
    create(createAdminDto: CreateAdminDto): Promise<Omit<import("./entities/admin.entity").Admin, "password">>;
    findAll(): Promise<Omit<import("./entities/admin.entity").Admin, "password">[]>;
    findOne(id: string): Promise<Omit<import("./entities/admin.entity").Admin, "password">>;
    update(id: string, updateAdminDto: UpdateAdminDto): Promise<Omit<import("./entities/admin.entity").Admin, "password">>;
    remove(id: string): Promise<void>;
    getAllUsers(): Promise<any[]>;
    toggleUserStatus(id: string): Promise<any>;
    getAllTransactions(): Promise<any[]>;
    getDashboardStats(): Promise<{
        totalTransactions: number;
        totalVolume: any;
        recentTransactions: any[];
    }>;
}
