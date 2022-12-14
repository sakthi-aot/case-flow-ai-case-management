import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

//_____________________Custom Imports_____________________//
import { DmsService } from './dms.service';

@Controller('dms')
export class DmsController {
  constructor(private readonly dmsService: DmsService) {}
  // @Get()
  // getDocument(): string {
  //   return this.dmsService.getDocument();
  // }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File, @Body() body
  ): Promise<any> {
    return this.dmsService.uploadDocument(file.buffer, body);
  }

    @Patch()
    @UseInterceptors(FileInterceptor('file'))
    async editDocument(
      @UploadedFile() file: Express.Multer.File, @Body() body
    ): Promise<any> {
      return this.dmsService.editDocument(file.buffer, body);
    }
  
    @Get()
    async fetchDocument(@Query() param,): Promise<any>   {
      return this.dmsService.fetchDocument(param).catch((err)=>{
        throw new HttpException('No item found', HttpStatus.NOT_FOUND)
      });
    }
    @Delete()
    async deleteDocument(@Query() param,): Promise<any>   {
      return this.dmsService.deleteDocument(param);
    }
}
