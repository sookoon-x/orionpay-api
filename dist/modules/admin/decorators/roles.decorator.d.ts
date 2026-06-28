import { AdminRole } from '../entities/admin.entity';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: AdminRole[]) => import("@nestjs/common").CustomDecorator<string>;
