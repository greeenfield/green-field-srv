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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const typeorm_1 = require("typeorm");
const baseDate_entity_1 = require("./baseDate.entity");
const user_entity_1 = require("./user.entity");
const noteMeta_entity_1 = require("./noteMeta.entity");
const tag_entity_1 = require("./tag.entity");
let Note = class Note extends baseDate_entity_1.BaseDate {
};
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Note.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => noteMeta_entity_1.NoteMeta, (noteMeta) => noteMeta.note),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", noteMeta_entity_1.NoteMeta)
], Note.prototype, "noteMeta", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Note.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Note.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.Tag),
    (0, typeorm_1.JoinTable)({
        name: 'note_tags',
        joinColumn: {
            name: 'note',
        },
        inverseJoinColumn: {
            name: 'tag',
        },
    }),
    __metadata("design:type", Array)
], Note.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Note.prototype, "isTemp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Note.prototype, "isPrivate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Note.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Note.prototype, "releasedAt", void 0);
Note = __decorate([
    (0, typeorm_1.Entity)()
], Note);
exports.Note = Note;
//# sourceMappingURL=note.entity.js.map