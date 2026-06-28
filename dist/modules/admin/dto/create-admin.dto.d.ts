import { AdminRole } from '../entities/admin.entity';
export declare class CreateAdminDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: AdminRole;
}
