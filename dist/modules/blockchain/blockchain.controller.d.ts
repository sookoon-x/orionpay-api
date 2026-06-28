import { BlockchainService } from './blockchain.service';
export declare class BlockchainController {
    private blockchainService;
    constructor(blockchainService: BlockchainService);
    getSupportedChains(): {
        chains: {
            chain: string;
            type: string;
        }[];
    };
}
