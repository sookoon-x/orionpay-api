import { Wallet } from '../../wallets/entities/wallet.entity';
export declare enum TransactionStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    CONFIRMED = "confirmed",
    FAILED = "failed",
    CANCELLED = "cancelled"
}
export declare class Transaction {
    id: string;
    amount: number;
    currency: string;
    chain: string;
    status: TransactionStatus;
    txHash: string;
    fromWallet: Wallet;
    toWallet: Wallet | null;
    fraudRiskScore: number;
    routingData: any;
    createdAt: Date;
    confirmedAt: Date;
}
