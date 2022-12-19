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
exports.Cases = void 0;
const graphql_1 = require("@nestjs/graphql");
const document_entity_1 = require("./document.entity");
let Cases = class Cases {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.ID),
    (0, graphql_1.Directive)('@external'),
    __metadata("design:type", Number)
], Cases.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [document_entity_1.Document]),
    __metadata("design:type", Array)
], Cases.prototype, "documents", void 0);
Cases = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.Directive)('@extends'),
    (0, graphql_1.Directive)('@key(fields:"id")')
], Cases);
exports.Cases = Cases;
//# sourceMappingURL=cases.entity.js.map