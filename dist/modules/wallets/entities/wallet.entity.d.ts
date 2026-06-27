import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../payments/entities/transaction.entity';
export declare class Wallet {
    id: string;
    address: string;
    chain: string;
    balance: number;
    currency: string;
    user: User;
    sentTransactions: Transaction[];
    receivedTransactions: Transaction[];
    createdAt: Date;
}
