import { Injectable } from '@nestjs/common';

//_____________________Custom Imports_____________________//
import { AmazonS3Service } from './amazon-s3.service';
import { AlfrescoService } from './alfresco.service';
import { SharepointServices } from './sharepoint.service';

@Injectable()
export class FileService {
  constructor(
    private readonly s3Service: AmazonS3Service,
    private readonly alfrescoService: AlfrescoService,
    private readonly spService: SharepointServices,
  ) {}

  async uploadFile(file, data, dms, token = null) {
    switch (dms) {
      case '1': {
        return await this.s3Service.uploadDocument(file, data.name);
      }
      case '2': {
        return await this.spService.uploadDocument(file.buffer, data.name);
      }
      case '3': {
        return await this.alfrescoService.uploadDocument(file, data, token);
      }
    }
  }

  async updateFile(file, data, document, dms, token = null) {
    switch (dms) {
      case '1': {
        return await this.s3Service.uploadDocument(file, data.fileName);
      }
      case '2': {
        return await this.spService.uploadDocument(file, data.fileName);
      }
      case '3': {
        return await this.alfrescoService.updateDocument(
          file,
          document,
          data,
          token,
        );
      }
    }
  }

  async downloadFile(documentId, dms, token = null) {
    switch (dms) {
      case 1: {
        return await this.s3Service.getDocument(documentId);
      }
      case 2: {
        return await this.spService.getDocument(documentId);
      }
      case 3: {
        return await this.alfrescoService.getDocument(documentId, token);
      }
    }
  }

  async deleteFile(document, dms, token = null) {
    switch (dms) {
      case '1': {
        return await this.s3Service.deleteDocument(document.documentref);
      }
      case '2': {
        return await this.spService.deleteDocument(document.name);
      }
      case 3: {
        return await this.alfrescoService.deleteDocument(document.name, token);
      }
    }
  }
}
