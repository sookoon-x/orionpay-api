import { ConfigService } from '@nestjs/config';
export declare class BlockchainService {
    private configService;
    private providers;
    constructor(configService: ConfigService);
    private initializeProviders;
    generateAddress(chain: string): Promise<string>;
    getBalance(chain: string, address: string): Promise<number>;
    sendTransaction(chain: string, fromAddress: string, toAddress: string, amount: number, privateKey: string): Promise<string>;
    getSupportedChains(): string[];
}
