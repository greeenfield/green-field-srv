"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const create_note_handler_1 = require("./application/commands/handler/create-note.handler");
const factory_1 = require("./domain/factory");
const note_controller_1 = require("./interface/note.controller");
const note_repository_1 = require("./infrastructure/repositories/note.repository");
const injection_token_1 = require("./application/injection.token");
const infrastructure = [
    {
        provide: injection_token_1.InjectionToken.NOTE_REPOSITORY,
        useClass: note_repository_1.NoteRepositoryImplement,
    },
];
const application = [create_note_handler_1.CreateNoteHandler];
const domain = [factory_1.NoteFactory];
let NoteModule = class NoteModule {
};
NoteModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, config_1.ConfigService],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [note_controller_1.NoteController],
        providers: [...infrastructure, ...application, ...domain],
    })
], NoteModule);
exports.NoteModule = NoteModule;
//# sourceMappingURL=note.module.js.map