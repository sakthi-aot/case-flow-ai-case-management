import { Injectable } from '@nestjs/common';

//_____________________Custom Imports_____________________//
import { AmazonS3Service } from './amazon-s3.service';

@Injectable()
export class FileDeleteService {
  constructor(private readonly s3Service: AmazonS3Service) {}


  async deleteFile(documentId, dms) {
    switch (dms) {
      case '1': {
        return await this.s3Service.deleteDocument(documentId);
      }
    }
  }
}
