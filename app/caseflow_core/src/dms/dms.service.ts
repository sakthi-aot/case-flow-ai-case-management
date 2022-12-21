import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class DmsService {
  constructor(@Inject('DMS') private readonly dmsClient: ClientProxy) {}
  getDocument(): any {
    return this.dmsClient.send({ cmd: 'get_s3_document' }, {});
  }
  uploadDocument(file, data): any {
    return this.dmsClient.send(
      { cmd: 'create_document' },
      { file, ...data },
    );
  }
}
