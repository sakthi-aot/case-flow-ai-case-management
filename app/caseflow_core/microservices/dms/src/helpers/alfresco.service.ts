import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService} from '@nestjs/config';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';

const FormData = require('form-data');
@Injectable()
export class AlfrescoService {
  constructor(private readonly configService: ConfigService,private readonly httpService: HttpService) {}

  // Summary : Upload File to Alfresco
  // Created By : Don C Varghese
  async uploadDocument(file: any, data: any,token:string):  Promise<any>  {
  //  console.log(file,data);
  try{
   let body = this.mapAlfrescoForm(file,data);
   const headersRequest = {
    'Content-Type': 'multipart/form-data',
    "Authorization": token ,
   };
 
    const url = this.configService.get('ALFRESCO_REPO_URL') + "/1/nodes/-root-/children"
    
      let response = await firstValueFrom(this.httpService.post(url,body,{
        headers : headersRequest
      
      }));
      
      return response.data;
    }
    catch(error){
    console.log(error);
    throw error;
    }
   
   
  }

  // Summary : Upload File to Alfresco
  // Created By : Don C Varghese
  async updateDocument(file: any,documnet : any,data: any,token:string):  Promise<any>  {
    try{
   let body = new Buffer(file.buffer ? file.buffer : file);
   const headersRequest = {
    "Authorization": token ,
};
 
    const url = this.configService.get('ALFRESCO_REPO_URL') + "/1/nodes/" + documnet.documentref + '/content'
  const params =  {
    "name" : data.name,
    "cm:description" : data.desc
  }
    
      let response = await firstValueFrom(this.httpService.put(url,body,{
        
        headers : headersRequest,
        params: params,
      
      }));
     
      return response;
    }
    catch(error){
 console.log(error);
 throw error;
    }
   
   
  }

    // Summary : Get  File from Afresco
  // Created By : Don C Varghese
  async getDocument(documentId: string,token:string): Promise<any> {
    try{
       const url = this.configService.get('ALFRESCO_REPO_URL') + "/1/nodes/"+ documentId +"/content?attachment=false"
    return axios.get(url, {
      headers : {"Authorization": token },
      responseType: 'arraybuffer'
    })
    .then(response => Buffer.from(response.data, 'binary'))
    }
    catch(error){
    console.log(error);
    throw error;
    }

    
  }

    // Summary : Delete  File from Afresco
  // Created By : Don C Varghese
  async deleteDocument(documentId: string,token:string): Promise<any> {
    try{
      const headersRequest = {
        "Authorization": token 
    };
      const url = this.configService.get('ALFRESCO_REPO_URL') + "/1/nodes/"+ documentId +"/content?attachment=true"
      let response = await firstValueFrom(this.httpService.delete(url,{
        headers : headersRequest
      
      }));
    
      return response;
    }
    catch(error){
      console.log(error);
      throw error;
    }

    
  }

  // Summary : Upload File to S3
  // Created By : Don C Varghese
  mapAlfrescoForm(file,data) {
    let fileData = new Buffer(file.buffer ? file.buffer : file)
    
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
