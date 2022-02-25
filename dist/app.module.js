"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
// import * as path from 'path'
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const note_module_1 = require("./modules/note/note.module");
const note_entity_1 = require("./entity/note.entity");
const profile_entity_1 = require("./entity/profile.entity");
const user_entity_1 = require("./entity/user.entity");
const tag_entity_1 = require("./entity/tag.entity");
const noteMeta_entity_1 = require("./entity/noteMeta.entity");
const getTypeOrmModule = () => {
    // const entitiesPath = path.join(__dirname, '/entity/*.entitiy{.ts,.js}')
    return typeorm_1.TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1111',
        database: 'postgres',
        extra: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
        entities: [note_entity_1.Note, profile_entity_1.UserProfile, user_entity_1.User, tag_entity_1.Tag, noteMeta_entity_1.NoteMeta],
        autoLoadEntities: true,
        keepConnectionAlive: true,
        namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    });
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [getTypeOrmModule(), auth_module_1.AuthModule, user_module_1.UserModule, note_module_1.NoteModule],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map