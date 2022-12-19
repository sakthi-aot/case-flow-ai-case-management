import { Body, Controller, Post, UploadedFile, UseInterceptors,Delete, Get, Patch,NotFoundException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';

//_____________________Custom Imports_____________________//
import { TransformService } from 'src/helpers/transform.service';
import { FileUploadService } from '../helpers/file-upload.service';
import { FileDownloadService } from 'src/helpers/file-download.service';
import { FileDeleteService } from 'src/helpers/file-delete-service ';

import { DocumentsService } from './documents.service';
import { Express } from 'express';
@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly fileUpload: FileUploadService,
    private readonly FileDownload: FileDownloadService,
    private readonly FileDelete: FileDeleteService,
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
    console.log('document', document);
    return this.documentService.createDocument(document);
  }

  @Patch()
  @MessagePattern({ cmd: 'edit_document' })
  async editDocument(data) {
    try {
      const field = await this.documentService.findOne(parseInt(data.id));
      let docname: string = field.name;
      if(!field.isdeleted) {
        let documentDetails = await (data.file && docname && data.dmsprovider
          ? this.fileUpload.uploadFile(data.file, docname, data.dmsprovider)
          : null);
        let document: any = this.helper.transform(
          data.dmsprovider,
          'UPDATE',
          documentDetails,
          data,
        );
        console.log('document', document);
        return this.documentService.update(data.id, document);
      }
      else {
        return new NotFoundException("No file found to update")
      }

    } catch (err) {
      console.log(err.message);
    }
  }

  @Get()
  @MessagePattern({ cmd: 'fetch_document' })
  async fetchDocument(param) {
    try {
      const id = await (
        await this.documentService.findOne(parseInt(param.id))
      ).documentref;
      return this.FileDownload.downloadFile(id, param.dms);
    } catch (error) {
      console.log(error.message);
    }
  }

  @Delete()
  @MessagePattern({ cmd: 'delete_document' })
  async DeleteDocument(param) {
    try {
      let field = await this.documentService.findOne(parseInt(param.id));
      field.isdeleted = true;
      return this.FileDelete.deleteFile(field.documentref, param.dms).then(
        () => {
          return this.documentService.update(param.id, field);
        },
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}
