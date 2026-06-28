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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_service_1 = require("./admin.service");
const admin_guard_1 = require("./guards/admin.guard");
const roles_guard_1 = require("./guards/roles.guard");
const roles_decorator_1 = require("./decorators/roles.decorator");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const update_admin_dto_1 = require("./dto/update-admin.dto");
const admin_login_dto_1 = require("./dto/admin-login.dto");
const admin_entity_1 = require("./entities/admin.entity");
const user_entity_1 = require("../users/entities/user.entity");
const transaction_entity_1 = require("../payments/entities/transaction.entity");
let AdminController = class AdminController {
    adminService;
    userRepository;
    transactionRepository;
    constructor(adminService, userRepository, transactionRepository) {
        this.adminService = adminService;
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
    }
    login(adminLoginDto) {
        return this.adminService.login(adminLoginDto);
    }
    create(createAdminDto) {
        return this.adminService.create(createAdminDto);
    }
    findAll() {
        return this.adminService.findAll();
    }
    findOne(id) {
        return this.adminService.findOne(id);
    }
    update(id, updateAdminDto) {
        return this.adminService.update(id, updateAdminDto);
    }
    remove(id) {
        return this.adminService.remove(id);
    }
    getAllUsers() {
        return this.adminService.getAllUsers(this.userRepository);
    }
    toggleUserStatus(id) {
        return this.adminService.toggleUserStatus(this.userRepository, id);
    }
    getAllTransactions() {
        return this.adminService.getAllTransactions(this.transactionRepository);
    }
    getDashboardStats() {
        return this.adminService.getTransactionStats(this.transactionRepository);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('login'),
    (0, roles_decorator_1.Roles)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_login_dto_1.AdminLoginDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('admins'),
    (0, roles_decorator_1.Roles)(admin_entity_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('admins'),
    (0, roles_decorator_1.Roles)(admin_entity_1.AdminRole.SUPER_ADMIN, admin_entity_1.AdminRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admins/:id'),
    (0, roles_decorator_1.Roles)(admin_entity_1.AdminRole.SUPER_ADMIN, admin_entity_1.AdminRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('admins/:id'),
    (0, roles_decorator_1.Roles)(admin_entity_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_admin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('admins/:id'),
    (0, roles_decorator_1.Roles)(admin_entity_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, roles_decorator_1.Roles)(admin_entity_1.AdminRole.SUPER_ADMIN, admin_entity_1.AdminRole.ADMIN, admin_entity_1.AdminRole.MODERATOR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Patch)('users/:id/toggle-status'),
    (0, roles_decorator_1.Roles)(admin_entity_1.AdminRole.SUPER_ADMIN, admin_entity_1.AdminRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "toggleUserStatus", null);
__decorate([
    (0, common_1.Get)('transactions'),
    (0, roles_decorator_1.Roles)(admin_entity_1.AdminRole.SUPER_ADMIN, admin_entity_1.AdminRole.ADMIN, admin_entity_1.AdminRole.MODERATOR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllTransactions", null);
__decorate([
    (0, common_1.Get)('dashboard/stats'),
    (0, roles_decorator_1.Roles)(admin_entity_1.AdminRole.SUPER_ADMIN, admin_entity_1.AdminRole.ADMIN, admin_entity_1.AdminRole.MODERATOR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getDashboardStats", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard, roles_guard_1.RolesGuard),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminController);
//# sourceMappingURL=admin.controller.js.map