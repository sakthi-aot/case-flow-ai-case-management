import { Controller, Get, Post, Body,Headers, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { NatsService } from './nats.service';
import {  PublishNatDto } from './dto/publish-nat.dto';



@Controller('nats')
export class NatsController {
  constructor(private readonly natsService: NatsService) {}

  @Post('/publishNats')
  async publishNats(@Body() publishNatDto: PublishNatDto, @Headers() auth) {
    try {
    if (auth?.authorization) {
    const natsReturn= await this.natsService.publishMessage(publishNatDto);
    return {
      status: 'success',
      data: natsReturn,
    };
  } else {
    throw new BadRequestException('header not provided');
  }
} catch (error) {
  throw new HttpException(
    {
      status: HttpStatus.FORBIDDEN,
      error: 'Some error occurs during publishing to nats !',
    },
    HttpStatus.FORBIDDEN,
    { cause: error },
  );
}
  }




}
