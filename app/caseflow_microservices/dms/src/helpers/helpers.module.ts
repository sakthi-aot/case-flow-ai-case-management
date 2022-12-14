import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

//_____________________Custom Imports_____________________//
import { TransformService } from './transform.service';
import { AmazonS3Service } from './amazon-s3.service';
import { FileUploadService } from './file-upload.service';
import {FileDownloadService} from './file-download.service'
import { FileDeleteService } from './file-delete-service ';

@Module({
  providers: [
    TransformService,
    AmazonS3Service,
    ConfigService,
    FileUploadService,
    FileDownloadService,
    FileDeleteService
  ],
  exports: [TransformService, AmazonS3Service, FileUploadService,FileDownloadService, FileDeleteService],
})
export class HelpersModule {}
