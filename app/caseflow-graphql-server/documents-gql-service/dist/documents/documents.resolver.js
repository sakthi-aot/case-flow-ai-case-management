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
exports.DocumentsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const documents_service_1 = require("./documents.service");
const document_entity_1 = require("./entities/document.entity");
const create_document_input_1 = require("./dto/create-document.input");
let DocumentsResolver = class DocumentsResolver {
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    createDocument(createDocumentInput) {
        return this.documentsService.create(createDocumentInput);
    }
    findAll() {
        return this.documentsService.findAll();
    }
    cases(document) {
        return { __typename: "Cases", id: document.caseid };
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => document_entity_1.Document),
    __param(0, (0, graphql_1.Args)('createDocumentInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_document_input_1.CreateDocumentInput]),
    __metadata("design:returntype", void 0)
], DocumentsResolver.prototype, "createDocument", null);
__decorate([
    (0, graphql_1.Query)(() => [document_entity_1.Document], { name: 'documents' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocumentsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.ResolveField)((of) => document_entity_1.Document),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [document_entity_1.Document]),
    __metadata("design:returntype", void 0)
], DocumentsResolver.prototype, "cases", null);
DocumentsResolver = __decorate([
    (0, graphql_1.Resolver)(() => document_entity_1.Document),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsResolver);
exports.DocumentsResolver = DocumentsResolver;
//# sourceMappingURL=documents.resolver.js.map