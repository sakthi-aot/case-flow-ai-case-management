import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import  {  AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios/dist';
import { firstValueFrom } from 'rxjs';


//Created By:Gokul VG
//Summary: Sharepoint Rest API services Upload,Update,Delete,Download

@Injectable()
export class SharepointServices{
    constructor(private readonly configService: ConfigService,private readonly httpService:HttpService){}

   async uploadDocument(file,fileName):Promise<any>{  

            const spURL = this.configService.get('SHAREPOINT_UPLOAD_URL').replace('${FileName}',fileName)
           
            try {  
                const accessToken =await this.getAccessToken(); 
                const FormDigestValue= await this.getFormDigestValue()  
                const responseUpload = await firstValueFrom(this.httpService.post(spURL,file,{
                    maxBodyLength:Infinity,
                    maxContentLength:Infinity,                    
                    headers:{
                        "Authorization":`Bearer ${accessToken}`,
                        'X-RequestDigest': `${FormDigestValue}`
                    }
                }))
                
              return responseUpload.data    
            } catch (e) {
              console.log(e)
            }         
    }    


    async getDocument (fileName:any):Promise<any>{
        const spURL = this.configService.get('SHAREPOINT_GET_DOCUMENT_URL').replace('${FileName}',fileName)
        try {    
            const accessToken =await this.getAccessToken();           
            const responseUpload = await firstValueFrom(this.httpService.get(spURL,{
                headers:{
                    "Authorization":`Bearer ${accessToken}`,                   
                },
                responseType : 'arraybuffer'
            }))          
           
          return responseUpload.data;
        } catch (e) {
          console.log(e)

        }       
    }

    async deleteDocument (fileName:any):Promise<any>{
            const spURL = this.configService.get('SHAREPOINT_DELETE_DOCUMENT_URL').replace('${FileName}',fileName)          
            try {   
                const accessToken = await this.getAccessToken();             

                const responseUpload = await firstValueFrom(this.httpService.delete(spURL,{ 
                    headers:{
                        "Authorization":`Bearer ${accessToken}`,                       
                        "X-HTTP-Method":"DELETE",
                        "Accept": "application/json;odata=verbose",
                        "IF-MATCH": "*"                        

                    }
                }))                            
              return responseUpload    
            } catch (e) {
              console.log(e)

            }
    }

    async getAccessToken():Promise<any>{
       try{
        const data = {
            grant_type:"client_credentials",
            client_id:this.configService.get('SHAREPOINT_CLIENT_ID'),
            client_secret:this.configService.get('SHAREPOINT_CLIENT_SECRET'),
            resource:this.configService.get('SHAREPOINT_RESOURCE')           
        } 
         const headersRequest = {
                "Content-Type": "application/x-www-form-urlencoded"                        
            };
            const spurl = this.configService.get("SHAREPOINT_ACCESS_TOKEN_URL")
        const getToken = await firstValueFrom (this.httpService.post(spurl,
        data  ,   {headers:headersRequest}       
        )   )
        return  getToken.data.access_token;

       }catch(err){    
        console.log(err)
       }
    }

    async getFormDigestValue():Promise<AxiosResponse>{
        try{
            const access_token =await this.getAccessToken()
            const spurl = this.configService.get("SHAREPOINT_FORM_DIGEST_VALUE_URL")
            const formDigestValue = await firstValueFrom(this.httpService.post(spurl,{},
            {
                headers:{
                    "Authorization":`Bearer ${access_token}`
                }
            }))
            return formDigestValue.data.FormDigestValue
            

        }catch(err){
            console.log(err)
        }
    }

}


