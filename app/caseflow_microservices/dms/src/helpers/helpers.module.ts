import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

//_____________________Custom Imports_____________________//
import { TransformService } from './transform.service';
import { AmazonS3Service } from './amazon-s3.service';
import { FileUploadService } from './file-upload.service';

@Module({
  providers: [
    TransformService,
    AmazonS3Service,
    ConfigService,
    FileUploadService,
  ],
  exports: [TransformService, AmazonS3Service, FileUploadService],
})
export class HelpersModule {}
