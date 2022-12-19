import { DocumentsService } from './documents.service';
import { Document } from './entities/document.entity';
import { CreateDocumentInput } from './dto/create-document.input';
export declare class DocumentsResolver {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    createDocument(createDocumentInput: CreateDocumentInput): Promise<Document>;
    findAll(): Promise<Document[]>;
    cases(document: Document): {
        __typename: string;
        id: number;
    };
}
