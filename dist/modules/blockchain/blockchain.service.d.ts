import { ConfigService } from '@nestjs/config';
export declare class BlockchainService {
    private configService;
    private providers;
    private chainTypeMap;
    constructor(configService: ConfigService);
    private initializeProviders;
    getSupportedChains(): Array<{
        chain: string;
        type: string;
    }>;
    private getProvider;
    generateAddress(chain: string): Promise<{
        address: string;
        privateKey: string;
    }>;
    getBalance(chain: string, address: string): Promise<number>;
    sendTransaction(chain: string, fromPrivateKey: string, toAddress: string, amount: number): Promise<string>;
    verifySignature(chain: string, message: string, signature: string, address: string): Promise<boolean>;
}
