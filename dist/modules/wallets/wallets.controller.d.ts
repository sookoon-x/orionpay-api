import { WalletsService } from './wallets.service';
export declare class WalletsController {
    private walletsService;
    constructor(walletsService: WalletsService);
    createWallet(req: any, createWalletDto: {
        chain: string;
        currency: string;
    }): Promise<import("./entities/wallet.entity").Wallet>;
    getCurrentUserWallets(req: any): Promise<import("./entities/wallet.entity").Wallet[]>;
    getWalletById(req: any, id: string): Promise<import("./entities/wallet.entity").Wallet | null>;
    updateWalletBalance(id: string): Promise<import("./entities/wallet.entity").Wallet>;
}
