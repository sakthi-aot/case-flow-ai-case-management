import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

//_____________________Custom Imports_____________________//
import { DmsService } from './dms.service';

@Controller('dms')
export class DmsController {
  constructor(private readonly dmsService: DmsService) {}
  @Get()
  getDocument(): string {
    return this.dmsService.getDocument();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File, @Body() body
  ): Promise<any> {
    console.log(body)
    return this.dmsService.uploadDocument(file, body);
  }
}
