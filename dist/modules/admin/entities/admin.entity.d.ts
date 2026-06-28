export declare enum AdminRole {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    MODERATOR = "moderator"
}
export declare class Admin {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: AdminRole;
    isActive: boolean;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
