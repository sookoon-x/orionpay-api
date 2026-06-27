import { Wallet } from '../../wallets/entities/wallet.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    createdAt: Date;
    wallets: Wallet[];
}
