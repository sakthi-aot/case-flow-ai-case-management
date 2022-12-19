import { Injectable } from '@nestjs/common';

//_____________________Custom Imports_____________________//
import { AmazonS3Service } from './amazon-s3.service';

@Injectable()
export class FileDownloadService {
  constructor(private readonly s3Service: AmazonS3Service) {}


  async downloadFile(documentId, dms) {
    switch (dms) {
      case '1': {
        return await this.s3Service.getDocument(documentId);
      }
    }
  }
}
