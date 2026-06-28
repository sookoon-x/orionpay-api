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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wallet_entity_1 = require("./entities/wallet.entity");
const blockchain_service_1 = require("../blockchain/blockchain.service");
let WalletsService = class WalletsService {
    walletsRepository;
    blockchainService;
    constructor(walletsRepository, blockchainService) {
        this.walletsRepository = walletsRepository;
        this.blockchainService = blockchainService;
    }
    async createWallet(userId, chain, currency) {
        const { address } = await this.blockchainService.generateAddress(chain);
        const wallet = this.walletsRepository.create({
            address,
            chain,
            currency,
            user: { id: userId },
        });
        return this.walletsRepository.save(wallet);
    }
    async getUserWallets(userId) {
        return this.walletsRepository.find({
            where: { user: { id: userId } },
            relations: ['sentTransactions', 'receivedTransactions'],
        });
    }
    async getWalletById(id, userId) {
        return this.walletsRepository.findOne({
            where: { id, user: { id: userId } },
            relations: ['sentTransactions', 'receivedTransactions'],
        });
    }
    async updateBalance(walletId) {
        const wallet = await this.walletsRepository.findOneBy({ id: walletId });
        if (!wallet)
            throw new Error('Wallet not found');
        const onChainBalance = await this.blockchainService.getBalance(wallet.chain, wallet.address);
        wallet.balance = onChainBalance;
        return this.walletsRepository.save(wallet);
    }
};
exports.WalletsService = WalletsService;
exports.WalletsService = WalletsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wallet_entity_1.Wallet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        blockchain_service_1.BlockchainService])
], WalletsService);
//# sourceMappingURL=wallets.service.js.map