"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const body_parser_1 = __importDefault(require("body-parser"));
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const app_module_1 = require("./app.module");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, configuration_1.validateEnvironmentVars)();
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.use(body_parser_1.default.json());
        const configService = app.get(config_1.ConfigService);
        yield app.listen(configService.get('PORT'));
    });
}
bootstrap();
//# sourceMappingURL=main.js.map