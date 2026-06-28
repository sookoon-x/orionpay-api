import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin, AdminRole } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminLoginDto } from './dto/admin-login.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Omit<Admin, 'password'>> {
    const existingAdmin = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });

    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    const admin = this.adminRepository.create({
      ...createAdminDto,
      password: hashedPassword,
    });

    const savedAdmin = await this.adminRepository.save(admin);
    const { password, ...result } = savedAdmin;
    return result;
  }

  async login(adminLoginDto: AdminLoginDto): Promise<{ accessToken: string; admin: Omit<Admin, 'password'> }> {
    const admin = await this.adminRepository.findOne({
      where: { email: adminLoginDto.email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!admin.isActive) {
      throw new UnauthorizedException('Admin account is deactivated');
    }

    const isPasswordValid = await bcrypt.compare(adminLoginDto.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.adminRepository.update(admin.id, { lastLoginAt: new Date() });

    const payload = { sub: admin.id, email: admin.email, role: admin.role, isAdmin: true };
    const accessToken = this.jwtService.sign(payload);

    const { password, ...result } = admin;
    return { accessToken, admin: result };
  }

  async findAll(): Promise<Omit<Admin, 'password'>[]> {
    const admins = await this.adminRepository.find();
    return admins.map(({ password, ...rest }) => rest);
  }

  async findOne(id: string): Promise<Omit<Admin, 'password'>> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    const { password, ...result } = admin;
    return result;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Omit<Admin, 'password'>> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }

    Object.assign(admin, updateAdminDto);
    const updatedAdmin = await this.adminRepository.save(admin);
    const { password, ...result } = updatedAdmin;
    return result;
  }

  async remove(id: string): Promise<void> {
    const result = await this.adminRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Admin not found');
    }
  }

  // User management for admins
  async getAllUsers(userRepository: Repository<any>) {
    return userRepository.find({
      select: ['id', 'email', 'firstName', 'lastName', 'isActive', 'createdAt', 'walletAddress'],
    });
  }

  async toggleUserStatus(userRepository: Repository<any>, userId: string) {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isActive = !user.isActive;
    return userRepository.save(user);
  }

  // Transaction management for admins
  async getAllTransactions(transactionRepository: Repository<any>) {
    return transactionRepository.find({ relations: ['user', 'wallet'] });
  }

  async getTransactionStats(transactionRepository: Repository<any>) {
    const totalTransactions = await transactionRepository.count();
    const totalVolume = await transactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'total')
      .getRawOne();
    
    const recentTransactions = await transactionRepository.find({
      order: { createdAt: 'DESC' },
      take: 10,
    });

    return {
      totalTransactions,
      totalVolume: totalVolume.total || 0,
      recentTransactions,
    };
  }
}