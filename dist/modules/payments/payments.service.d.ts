import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { WalletsService } from '../wallets/wallets.service';
import { BlockchainService } from '../blockchain/blockchain.service';
import { AiService } from '../ai/ai.service';
export declare class PaymentsService {
    private transactionsRepository;
    private walletsService;
    private blockchainService;
    private aiService;
    constructor(transactionsRepository: Repository<Transaction>, walletsService: WalletsService, blockchainService: BlockchainService, aiService: AiService);
    initiateTransaction(userId: string, fromWalletId: string, toAddress: string, amount: number, currency: string): Promise<Transaction>;
    getUserTransactions(userId: string): Promise<Transaction[]>;
    getTransactionById(id: string, userId: string): Promise<Transaction | null>;
}
