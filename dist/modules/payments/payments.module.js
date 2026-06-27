"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("@nestjs/axios");
const payments_service_1 = require("./payments.service");
const payments_controller_1 = require("./payments.controller");
const transaction_entity_1 = require("./entities/transaction.entity");
const wallets_module_1 = require("../wallets/wallets.module");
const blockchain_module_1 = require("../blockchain/blockchain.module");
const ai_module_1 = require("../ai/ai.module");
let PaymentsModule = class PaymentsModule {
};
exports.PaymentsModule = PaymentsModule;
exports.PaymentsModule = PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([transaction_entity_1.Transaction]),
            wallets_module_1.WalletsModule,
            blockchain_module_1.BlockchainModule,
            ai_module_1.AiModule,
            axios_1.HttpModule,
        ],
        providers: [payments_service_1.PaymentsService],
        controllers: [payments_controller_1.PaymentsController],
        exports: [payments_service_1.PaymentsService],
    })
], PaymentsModule);
//# sourceMappingURL=payments.module.js.map