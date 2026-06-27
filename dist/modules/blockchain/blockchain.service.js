"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const web3_1 = require("web3");
let BlockchainService = class BlockchainService {
    configService;
    providers;
    constructor(configService) {
        this.configService = configService;
        this.providers = new Map();
        this.initializeProviders();
    }
    initializeProviders() {
        const rpcUrls = this.configService.get('BLOCKCHAIN_RPC_URLS', '').split(',');
        const chains = ['ethereum', 'polygon', 'arbitrum', 'optimism', 'base', 'solana', 'avalanche'];
        chains.forEach((chain, index) => {
            if (rpcUrls[index]) {
                this.providers.set(chain, new web3_1.Web3(rpcUrls[index]));
            }
        });
    }
    async generateAddress(chain) {
        const web3 = this.providers.get(chain);
        if (!web3)
            throw new Error(`No provider configured for chain: ${chain}`);
        const account = web3.eth.accounts.create();
        return account.address;
    }
    async getBalance(chain, address) {
        const web3 = this.providers.get(chain);
        if (!web3)
            throw new Error(`No provider configured for chain: ${chain}`);
        const balance = await web3.eth.getBalance(address);
        return Number(web3.utils.fromWei(balance, 'ether'));
    }
    async sendTransaction(chain, fromAddress, toAddress, amount, privateKey) {
        const web3 = this.providers.get(chain);
        if (!web3)
            throw new Error(`No provider configured for chain: ${chain}`);
        const value = web3.utils.toWei(amount.toString(), 'ether');
        const gasPrice = await web3.eth.getGasPrice();
        const tx = {
            from: fromAddress,
            to: toAddress,
            value,
            gas: 21000,
            gasPrice,
        };
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt.transactionHash.toString();
    }
    getSupportedChains() {
        return Array.from(this.providers.keys());
    }
};
exports.BlockchainService = BlockchainService;
exports.BlockchainService = BlockchainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], BlockchainService);
//# sourceMappingURL=blockchain.service.js.map