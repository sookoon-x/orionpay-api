"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const admin_entity_1 = require("./entities/admin.entity");
const admin_otp_entity_1 = require("./entities/admin-otp.entity");
const user_entity_1 = require("../users/entities/user.entity");
const transaction_entity_1 = require("../payments/entities/transaction.entity");
const admin_guard_1 = require("./guards/admin.guard");
const roles_guard_1 = require("./guards/roles.guard");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([admin_entity_1.Admin, admin_otp_entity_1.AdminOtp, user_entity_1.User, transaction_entity_1.Transaction]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'your-secret-key',
                signOptions: { expiresIn: '1d' },
            }),
        ],
        providers: [admin_service_1.AdminService, admin_guard_1.AdminGuard, roles_guard_1.RolesGuard],
        controllers: [admin_controller_1.AdminController],
        exports: [admin_service_1.AdminService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map