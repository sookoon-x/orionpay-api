import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(createUserDto: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        createdAt: Date;
        wallets: import("../wallets/entities/wallet.entity").Wallet[];
    }>;
    getProfile(req: any): any;
    findAll(): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        createdAt: Date;
        wallets: import("../wallets/entities/wallet.entity").Wallet[];
    }[]>;
}
