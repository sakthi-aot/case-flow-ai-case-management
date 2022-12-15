import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';

//_____________________Custom Imports_____________________//
import { TransformService } from 'src/helpers/transform.service';
import { FileUploadService } from '../helpers/file-upload.service';
import { DocumentsService } from './documents.service';
import { Express } from 'express';
@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly fileUpload: FileUploadService,
    private helper: TransformService,
    private documentService: DocumentsService,
  ) {}
  @Post()
  @MessagePattern({ cmd: 'create_document' })
  // @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(data) {
   
    let documentDetails = await this.fileUpload.uploadFile(data.file, data, data.dmsprovider);
    // console.log(documentDetails)
    let document: any = this.helper.transform(
      data.dmsprovider,
      'CREATE',
      documentDetails,
      data,
    );
    // console.log("document",document);
    return this.documentService.createDocument(document);
  }
}
