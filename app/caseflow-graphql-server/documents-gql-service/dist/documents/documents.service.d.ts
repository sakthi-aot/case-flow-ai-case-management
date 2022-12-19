import { Repository } from 'typeorm';
import { CreateDocumentInput } from './dto/create-document.input';
import { Document } from './entities/document.entity';
export declare class DocumentsService {
    private documentRepository;
    constructor(documentRepository: Repository<Document>);
    create(createDocumentInput: CreateDocumentInput): Promise<Document>;
    findAll(): Promise<Document[]>;
    forCases(id: number): Promise<Document[]>;
}
