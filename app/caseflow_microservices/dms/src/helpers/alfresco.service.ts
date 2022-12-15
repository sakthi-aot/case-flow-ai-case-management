import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService} from '@nestjs/config';
import {AxiosResponse} from 'axios'
import { createReadStream } from 'fs';
import { firstValueFrom, map, Observable } from 'rxjs';

const FormData = require('form-data');
@Injectable()
export class AlfrescoService {
  constructor(private readonly configService: ConfigService,private readonly httpService: HttpService) {}
  getDocument() {
    return 'Hello From Micro Service';
  }

  // Summary : Upload File to S3
  // Created By : Don C Varghese
  async uploadDocument(file: any, data: any):  Promise<any>  {
   console.log(file,data);
   let body = this.mapAlfrescoForm(file,data)
   const headersRequest = {
    'Content-Type': 'multipart/form-data'
};

   console.log(body);
   const auth = {
    username: 'admin',
    password: 'admin'
  }
    const url = this.configService.get('ALFRESCO_REPO_URL') + "1/nodes/-root-/children"
    try{
      let response = await firstValueFrom(this.httpService.post(url,body,{
        auth: {
          username: 'admin',
          password: 'admin'
        },
        headers : headersRequest
      
      }));
      console.log("response",response)
      return response;
    }
    catch(err){
 console.log(err);
    }
   
   
  }

  // Summary : Upload File to S3
  // Created By : Don C Varghese
  async updateDocument(file: any, data: any):  Promise<any>  {
   console.log(file,data);
   let body = this.mapAlfrescoForm(file,data)
   const headersRequest = {
    'Content-Type': 'multipart/form-data'
};

   console.log(body);
   const auth = {
    username: 'admin',
    password: 'admin'
  }
    const url = this.configService.get('ALFRESCO_REPO_URL') + "1/nodes/-root-/children"
    try{
      let response = await firstValueFrom(this.httpService.post(url,body,{
        auth: {
          username: 'admin',
          password: 'admin'
        },
        headers : headersRequest
      
      }));
      console.log("response",response)
      return response;
    }
    catch(err){
 console.log(err);
    }
   
   
  }

  // Summary : Upload File to S3
  // Created By : Don C Varghese
  mapAlfrescoForm(file,data) {
    let fileData = new Buffer(file.buffer)
  //   const form = new FormData( { 
  //   'name' : data.name,
  //   'nodeType': 'cm:content',
  //   'cm:title' : data.name,
  //   'cm:description' : data.desc,
  //   'relativePath' : this.configService.get('ALFRESCO_RELATIVE_PATH'),
  //   'filedata' : fileData,
   
  // });
  const form = new FormData();
form.append('filedata', fileData, data.name);
form.append('name', data.name);
form.append('nodeType', 'cm:content');
form.append('cm:title', data.name);
form.append('cm:description', data.desc);
form.append('relativePath', this.configService.get('ALFRESCO_RELATIVE_PATH'))
    return form;
  }
}
