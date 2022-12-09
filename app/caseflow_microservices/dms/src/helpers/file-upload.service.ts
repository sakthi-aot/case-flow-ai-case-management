import { Injectable } from '@nestjs/common';

//_____________________Custom Imports_____________________//
import { AmazonS3Service } from './amazon-s3.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly s3Service: AmazonS3Service) {}

  // summery : Upload File to crespective DMS 
  // Created By : Don C Varghese
  async uploadFile(file, data, dms) {
    switch (dms) {
      case '1': {
        return await this.s3Service.uploadDocument(file, data.fileName);
      }
    }
  }
}
