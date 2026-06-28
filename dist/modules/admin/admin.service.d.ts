import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './entities/admin.entity';
import { AdminOtp } from './entities/admin-otp.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
export declare class AdminService {
    private readonly adminRepository;
    private readonly adminOtpRepository;
    private readonly jwtService;
    constructor(adminRepository: Repository<Admin>, adminOtpRepository: Repository<AdminOtp>, jwtService: JwtService);
    generateOtp(email: string): Promise<{
        message: string;
        otp?: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        accessToken: string;
        admin: Omit<Admin, 'password'>;
    }>;
    create(createAdminDto: CreateAdminDto): Promise<Omit<Admin, 'password'>>;
    login(adminLoginDto: AdminLoginDto): Promise<{
        accessToken: string;
        admin: Omit<Admin, 'password'>;
    }>;
    findAll(): Promise<Omit<Admin, 'password'>[]>;
    findOne(id: string): Promise<Omit<Admin, 'password'>>;
    update(id: string, updateAdminDto: UpdateAdminDto): Promise<Omit<Admin, 'password'>>;
    remove(id: string): Promise<void>;
    getAllUsers(userRepository: Repository<any>): Promise<any[]>;
    toggleUserStatus(userRepository: Repository<any>, userId: string): Promise<any>;
    getAllTransactions(transactionRepository: Repository<any>): Promise<any[]>;
    getTransactionStats(transactionRepository: Repository<any>): Promise<{
        totalTransactions: number;
        totalVolume: any;
        recentTransactions: any[];
    }>;
}
