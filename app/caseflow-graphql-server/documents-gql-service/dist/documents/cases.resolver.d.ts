import { DocumentsService } from "./documents.service";
import { Cases } from "./entities/cases.entity";
import { Document } from "./entities/document.entity";
export declare class CasesResolver {
    private readonly documentService;
    constructor(documentService: DocumentsService);
    documents(cases: Cases): Promise<Document[]>;
}
