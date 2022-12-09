import { Controller, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

//_____________________Custom Imports_____________________//
import { TransformService } from 'src/helpers/transform.service';
import { FileUploadService } from '../helpers/file-upload.service';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly fileUpload: FileUploadService,
    private helper: TransformService,
    private documentService: DocumentsService,
  ) {}
  @Post()
  @MessagePattern({ cmd: 'create_document' })
  async uploadDocument(data) {
    console.log(data)
    let documentDetails = await this.fileUpload.uploadFile(data.file, data, data.dmsprovider);
    console.log(documentDetails)
    let document: any = this.helper.transform(
      data.dmsprovider,
      'CREATE',
      documentDetails,
      data,
    );
    console.log("document",document);
    return this.documentService.createDocument(document);
  }
}
