import { Cases } from './entities/cases.entity';
import { CasesService } from './cases.service';
import { CreateCaseInput } from './dto/create-case.input';
import { UpdateCaseInput } from './dto/update-case.input';
export declare class CasesResolver {
    private caseService;
    constructor(caseService: CasesService);
    case(): Promise<Cases[]>;
    getCase(id: number): Promise<Cases>;
    createCase(createCaseInput: CreateCaseInput): Promise<Cases>;
    resolverefernce(ref: {
        __typename: number;
        id: number;
    }): Promise<Cases>;
    updateCases(updateCaseInput: UpdateCaseInput): Promise<Cases>;
    removeCases(id: number): Promise<Cases>;
}
