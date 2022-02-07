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
exports.NoteMeta = void 0;
const typeorm_1 = require("typeorm");
const baseDate_entity_1 = require("./baseDate.entity");
const note_entity_1 = require("./note.entity");
let NoteMeta = class NoteMeta extends baseDate_entity_1.BaseDate {
};
__decorate([
    (0, typeorm_1.OneToOne)(() => note_entity_1.Note, (note) => note.noteMeta),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", note_entity_1.Note)
], NoteMeta.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], NoteMeta.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, type: 'varchar' }),
    __metadata("design:type", String)
], NoteMeta.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], NoteMeta.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], NoteMeta.prototype, "description", void 0);
NoteMeta = __decorate([
    (0, typeorm_1.Entity)()
], NoteMeta);
exports.NoteMeta = NoteMeta;
//# sourceMappingURL=noteMeta.entity.js.map