import { Injectable } from '@nestjs/common';

//_____________________Custom Imports_____________________//
import { AmazonS3Service } from './amazon-s3.service';
import { AlfrescoService } from './alfresco.service';

@Injectable()
export class FileUploadService {
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
}
