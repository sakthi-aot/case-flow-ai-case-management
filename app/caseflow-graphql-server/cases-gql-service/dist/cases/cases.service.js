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
exports.CasesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cases_entity_1 = require("./entities/cases.entity");
let CasesService = class CasesService {
    constructor(caseRepository) {
        this.caseRepository = caseRepository;
    }
    createCase(createCaseInput) {
        const newCase = this.caseRepository.create(createCaseInput);
        return this.caseRepository.save(newCase);
    }
    async findAll() {
        return this.caseRepository.find();
    }
    async findOne({ id }) {
        return this.caseRepository.findOne({
            where: {
                id: id
            }
        });
    }
    update(id, updateCaseInput) {
        let cases = this.caseRepository.create(updateCaseInput);
        cases.id = id;
        return this.caseRepository.save(cases);
    }
    async remove(id) {
        let caseData = this.caseRepository.findOne({
            where: {
                id: id
            }
        });
        if (caseData) {
            let ret = await this.caseRepository.delete(id);
            if (ret.affected === 1) {
                return caseData;
            }
        }
        throw new common_1.NotFoundException(`Record cannot find by id ${id}`);
    }
};
CasesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cases_entity_1.Cases)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CasesService);
exports.CasesService = CasesService;
//# sourceMappingURL=cases.service.js.map