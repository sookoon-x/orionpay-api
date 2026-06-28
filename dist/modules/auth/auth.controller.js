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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const wallet_connect_dto_1 = require("./dto/wallet-connect.dto");
const user_generate_otp_dto_1 = require("./dto/user-generate-otp.dto");
const user_verify_otp_dto_1 = require("./dto/user-verify-otp.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        return this.authService.signIn(loginDto.email, loginDto.password);
    }
    async generateWalletNonce(generateNonceDto) {
        return this.authService.generateNonce(generateNonceDto.walletAddress, generateNonceDto.chain);
    }
    async connectWallet(walletConnectDto) {
        return this.authService.verifyWalletSignature(walletConnectDto.walletAddress, walletConnectDto.chain, walletConnectDto.signature, walletConnectDto.message, walletConnectDto.nonce);
    }
    async requestOtp(userGenerateOtpDto) {
        return this.authService.requestUserOtp(userGenerateOtpDto.email);
    }
    async verifyOtp(userVerifyOtpDto) {
        return this.authService.verifyUserOtp(userVerifyOtpDto.email, userVerifyOtpDto.otp);
    }
    async processPendingOtps() {
        return this.authService.processPendingOtpRequests();
    }
    async cleanupExpired() {
        return this.authService.cleanupExpiredOtps();
    }
    async forgotPassword(forgotPasswordDto) {
        return this.authService.requestPasswordReset(forgotPasswordDto.email);
    }
    async resetPassword(resetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto.email, resetPasswordDto.otp, resetPasswordDto.newPassword);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('wallet/nonce'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wallet_connect_dto_1.GenerateNonceDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateWalletNonce", null);
__decorate([
    (0, common_1.Post)('wallet/connect'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wallet_connect_dto_1.WalletConnectDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "connectWallet", null);
__decorate([
    (0, common_1.Post)('otp/request'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_generate_otp_dto_1.UserGenerateOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestOtp", null);
__decorate([
    (0, common_1.Post)('otp/verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_verify_otp_dto_1.UserVerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('otp/process'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "processPendingOtps", null);
__decorate([
    (0, common_1.Post)('otp/cleanup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "cleanupExpired", null);
__decorate([
    (0, common_1.Post)('password/forgot'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('password/reset'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map