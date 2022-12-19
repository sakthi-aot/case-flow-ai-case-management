import { Injectable } from '@nestjs/common';

//_____________________Custom Imports_____________________//
import { AmazonS3Service } from './amazon-s3.service';
import { AlfrescoService } from './alfresco.service';

@Injectable()
export class FileService {
  constructor(private readonly s3Service: AmazonS3Service,private readonly alfrescoService: AlfrescoService) {}

  // Summary : Upload File to crespective DMS 
  // Created By : Don C Varghese
  async uploadFile(file, data, dms) {
    switch (dms) {
      case '1': {
        return await this.s3Service.uploadDocument(file, data.fileName);
      }
      case '3': {
        return await this.alfrescoService.uploadDocument(file, data);
      }
    }
  }

  // Summary : Update File to respective DMS 
  // Created By : Don C Varghese
  async updateFile(file, data,document, dms,) {
    switch (dms) {
      case '1': {
        return await this.s3Service.uploadDocument(file, data.fileName);
      }
      case '3': {
        return await this.alfrescoService.updateDocument(file,document, data);
      }
    }
  }

   // Summary : Download file from respective DMS 
  // Created By : Don Basil
  async downloadFile(documentId, dms) {
    switch (dms) {
      case '1': {
        return await this.s3Service.getDocument(documentId);
      }
      case '3': {
        return await this.s3Service.getDocument(documentId);
      }
    }
  }

  async deleteFile(documentId, dms) {
    switch (dms) {
      case '1': {
        return await this.s3Service.deleteDocument(documentId);
      }
    }
  }
  
}
