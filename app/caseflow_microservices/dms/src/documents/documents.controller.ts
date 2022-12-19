import { Body, Controller, Post, UploadedFile, UseInterceptors,Delete, Get, Patch,NotFoundException, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';

//_____________________Custom Imports_____________________//
import { TransformService } from 'src/helpers/transform.service';
import { FileService } from '../helpers/file.service';


import { DocumentsService } from './documents.service';
import { Express } from 'express';
@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly fileService: FileService,
    private helper: TransformService,
    private documentService: DocumentsService,
  ) {}
  @Post()
  @MessagePattern({ cmd: 'create_document' })
  // @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(data) {
   
    let documentDetails = await this.fileService.uploadFile(data.file, data, data.dmsprovider);
    // console.log(documentDetails)
    let formattedDocument: any = this.helper.transform(
      data.dmsprovider,
      'CREATE',
      documentDetails,
      data,
    );
    console.log('document', formattedDocument);
    return this.documentService.createDocument(formattedDocument);
  }

  @Put()
  @MessagePattern({ cmd: 'edit_document' })
  async editDocument(data) {
    try {
      const document = await this.documentService.findOne(parseInt(data.id));
 
      if(!document.isdeleted) {
        let documentDetails = await (data.file && document && data.dmsprovider
          ? this.fileService.updateFile(data.file, data,document, data.dmsprovider,)
          : null);
        let formattedDocument: any = this.helper.transform(
          data.dmsprovider,
          'UPDATE',
          documentDetails,
          data,
        );
        console.log('document', formattedDocument);
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
      return this.fileService.downloadFile(id, param.dms);
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
      return this.fileService.deleteFile(field.documentref, param.dms).then(
        () => {
          return this.documentService.update(param.id, field);
        },
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}
