import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class DmsService {
  constructor(@Inject('DMS') private readonly dmsClient: ClientProxy) {}

  async fetchDocument(data): Promise<any> {
    let response = await this.dmsClient.send({ cmd: 'fetch_document' }, { ...data }).toPromise();
    return response;
  }

  uploadDocument(file, data): any {
    return this.dmsClient.send({ cmd: 'create_document' }, { file, ...data });
  }

  editDocument(file, data): any {
    return this.dmsClient.send({ cmd: 'edit_document' }, { file, ...data });
  }

  deleteDocument(data): any {
    return this.dmsClient.send({ cmd: 'delete_document' }, { ...data });
  }
}
