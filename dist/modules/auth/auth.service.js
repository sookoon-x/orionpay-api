"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const blockchain_service_1 = require("../blockchain/blockchain.service");
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
const crypto = __importStar(require("crypto"));
let AuthService = class AuthService {
    usersService;
    jwtService;
    blockchainService;
    constructor(usersService, jwtService, blockchainService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.blockchainService = blockchainService;
    }
    async signIn(email, pass) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.sign(payload),
        };
    }
    async validateUser(userId) {
        return this.usersService.findById(userId);
    }
    walletNonces = new Map();
    async generateNonce(walletAddress, chain) {
        const now = Date.now();
        for (const [key, data] of this.walletNonces.entries()) {
            if (data.expiresAt < now) {
                this.walletNonces.delete(key);
            }
        }
        const uniqueKey = `${chain}:${walletAddress.toLowerCase()}`;
        const nonce = (0, uuid_1.v4)();
        const expiresAt = Date.now() + 5 * 60 * 1000;
        this.walletNonces.set(uniqueKey, { nonce, expiresAt, chain });
        const message = `Sign this message to authenticate with OrionPay. Chain: ${chain}. Nonce: ${nonce}`;
        return { nonce, message };
    }
    async verifyWalletSignature(walletAddress, chain, signature, message, nonce) {
        const uniqueKey = `${chain}:${walletAddress.toLowerCase()}`;
        const storedNonceData = this.walletNonces.get(uniqueKey);
        if (!storedNonceData || storedNonceData.nonce !== nonce) {
            throw new common_1.BadRequestException('Invalid or expired nonce');
        }
        if (storedNonceData.expiresAt < Date.now()) {
            this.walletNonces.delete(uniqueKey);
            throw new common_1.BadRequestException('Nonce has expired');
        }
        let isSignatureValid = false;
        try {
            isSignatureValid = await this.blockchainService.verifySignature(chain, message, signature, walletAddress);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Failed to verify signature');
        }
        if (!isSignatureValid) {
            throw new common_1.UnauthorizedException('Invalid signature');
        }
        this.walletNonces.delete(uniqueKey);
        const userIdentifier = `${chain}:${walletAddress.toLowerCase()}`;
        let user = await this.usersService.findByWalletAddress(userIdentifier);
        let isNewUser = false;
        if (!user) {
            const randomPassword = crypto.randomBytes(32).toString('hex');
            user = await this.usersService.create({
                email: `${userIdentifier}@wallet.local`,
                password: randomPassword,
                firstName: `${chain.charAt(0).toUpperCase() + chain.slice(1)}`,
                lastName: 'User',
                walletAddress: userIdentifier
            });
            isNewUser = true;
        }
        const payload = { sub: user.id, email: user.email, walletAddress: user.walletAddress, chain: chain };
        const access_token = await this.jwtService.sign(payload);
        return {
            access_token,
            user: {
                id: user.id,
                walletAddress: walletAddress,
                chain: chain,
                email: user.email
            },
            isNewUser
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        blockchain_service_1.BlockchainService])
], AuthService);
//# sourceMappingURL=auth.service.js.map