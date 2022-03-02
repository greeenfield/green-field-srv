"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const injection_token_1 = require("../../shared/injection-token");
const user_repository_1 = require("./infrastructure/repositories/user.repository");
const create_user_handler_1 = require("./application/commands/handler/create-user.handler");
const user_controller_1 = require("./interface/user.controller");
const infrastructure = [
    {
        provide: injection_token_1.injectionToken.USER_REPOSITORY,
        useClass: user_repository_1.UserRepositoryImplement,
    },
];
const application = [create_user_handler_1.CreateUserHandler];
const domain = [];
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, config_1.ConfigService],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [user_controller_1.UserController],
        providers: [...infrastructure, ...application, ...domain],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map