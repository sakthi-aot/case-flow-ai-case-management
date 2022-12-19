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
exports.CasesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const cases_entity_1 = require("./entities/cases.entity");
const cases_service_1 = require("./cases.service");
const create_case_input_1 = require("./dto/create-case.input");
const update_case_input_1 = require("./dto/update-case.input");
let CasesResolver = class CasesResolver {
    constructor(caseService) {
        this.caseService = caseService;
    }
    case() {
        return this.caseService.findAll();
    }
    getCase(id) {
        return this.caseService.findOne({ id });
    }
    createCase(createCaseInput) {
        return this.caseService.createCase(createCaseInput);
    }
    resolverefernce(ref) {
        return this.caseService.findOne({ id: ref.id });
    }
    updateCases(updateCaseInput) {
        return this.caseService.update(updateCaseInput.id, updateCaseInput);
    }
    removeCases(id) {
        return this.caseService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Query)(returns => [cases_entity_1.Cases]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CasesResolver.prototype, "case", null);
__decorate([
    (0, graphql_1.Query)(returns => [cases_entity_1.Cases]),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CasesResolver.prototype, "getCase", null);
__decorate([
    (0, graphql_1.Mutation)(returns => cases_entity_1.Cases),
    __param(0, (0, graphql_1.Args)('createCaseInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_case_input_1.CreateCaseInput]),
    __metadata("design:returntype", Promise)
], CasesResolver.prototype, "createCase", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CasesResolver.prototype, "resolverefernce", null);
__decorate([
    (0, graphql_1.Mutation)(() => cases_entity_1.Cases),
    __param(0, (0, graphql_1.Args)('cases')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_case_input_1.UpdateCaseInput]),
    __metadata("design:returntype", void 0)
], CasesResolver.prototype, "updateCases", null);
__decorate([
    (0, graphql_1.Mutation)(() => cases_entity_1.Cases),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CasesResolver.prototype, "removeCases", null);
CasesResolver = __decorate([
    (0, graphql_1.Resolver)(of => cases_entity_1.Cases),
    __metadata("design:paramtypes", [cases_service_1.CasesService])
], CasesResolver);
exports.CasesResolver = CasesResolver;
//# sourceMappingURL=cases.resolver.js.map