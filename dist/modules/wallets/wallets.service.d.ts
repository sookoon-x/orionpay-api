import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { BlockchainService } from '../blockchain/blockchain.service';
export declare class WalletsService {
    private walletsRepository;
    private blockchainService;
    constructor(walletsRepository: Repository<Wallet>, blockchainService: BlockchainService);
    createWallet(userId: string, chain: string, currency: string): Promise<Wallet>;
    getUserWallets(userId: string): Promise<Wallet[]>;
    getWalletById(id: string, userId: string): Promise<Wallet | null>;
    updateBalance(walletId: string): Promise<Wallet>;
}
