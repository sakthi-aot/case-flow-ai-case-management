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
  Put,
  Response,
  Headers
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response as ExpressResponse } from 'express';

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
    @UploadedFile() file: Express.Multer.File, @Body() body,@Headers() headers
  ): Promise<any> {
    console.log(body)
    return this.dmsService.uploadDocument(file, body,headers);
  }

    @Put()
    @UseInterceptors(FileInterceptor('file'))
    async editDocument(
      @UploadedFile() file: Express.Multer.File, @Body() body,@Headers() headers
    ): Promise<any> {
      return this.dmsService.editDocument(file.buffer, body,headers);
    }
  
    @Get()
    async fetchDocument(@Query() param,@Response() res: ExpressResponse,@Headers() headers): Promise<any>   {
     const document = await this.dmsService.fetchDocument(param,headers).then(data=> data);
    //  res.set("Content-Type",document.type);
    //  res.set("file-name",document.name);

          return res.send(new Buffer(document.data));
    }
    @Delete()
    async deleteDocument(@Query() param,@Headers() headers): Promise<any>   {
      return this.dmsService.deleteDocument(param,headers);
    }
}
