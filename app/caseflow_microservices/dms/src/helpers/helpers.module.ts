import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
//_____________________Custom Imports_____________________//
import { TransformService } from './transform.service';
import { AmazonS3Service } from './amazon-s3.service';
import { FileUploadService } from './file-upload.service';
import { AlfrescoService } from './alfresco.service';

@Module({
  imports:[HttpModule],
  providers: [
    TransformService,
    AmazonS3Service,
    ConfigService,
    FileUploadService,
    AlfrescoService,
  ],
  exports: [TransformService, AmazonS3Service, FileUploadService,AlfrescoService],
})
export class HelpersModule {}
