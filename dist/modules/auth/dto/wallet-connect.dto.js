"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletAuthResponse = exports.GenerateNonceDto = exports.WalletConnectDto = void 0;
class WalletConnectDto {
    walletAddress;
    chain;
    signature;
    message;
    nonce;
}
exports.WalletConnectDto = WalletConnectDto;
class GenerateNonceDto {
    walletAddress;
    chain;
}
exports.GenerateNonceDto = GenerateNonceDto;
class WalletAuthResponse {
    access_token;
    user;
}
exports.WalletAuthResponse = WalletAuthResponse;
//# sourceMappingURL=wallet-connect.dto.js.map