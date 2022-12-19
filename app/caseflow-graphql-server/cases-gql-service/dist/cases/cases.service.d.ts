import { Repository } from 'typeorm';
import { Cases } from './entities/cases.entity';
import { CreateCaseInput } from './dto/create-case.input';
import { UpdateCaseInput } from './dto/update-case.input';
export declare class CasesService {
    private caseRepository;
    constructor(caseRepository: Repository<Cases>);
    createCase(createCaseInput: CreateCaseInput): Promise<Cases>;
    findAll(): Promise<Cases[]>;
    findOne({ id }: {
        id: number;
    }): Promise<Cases>;
    update(id: number, updateCaseInput: UpdateCaseInput): Promise<Cases>;
    remove(id: number): Promise<Cases>;
}
