import {
  httpGETBolbRequest,
  httpPOSTRequest,
  httpPUTRequest,
} from "../../apiManager/httpRequestHandler";
import API from "../endpoints/index";
// import fs from 'fs';

export const fetchCMISfile = (documentId,DMS) => {
  return (dispatch) => {
    const downloadURL = API.DMS_API + "/download";
    httpGETBolbRequest(downloadURL, { id: documentId ,"DMS" :DMS})
      .then((response) => {
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );

        const link = document.createElement("a");

        link.href = downloadUrl;

        link.setAttribute("download", "file.zip"); //any other extension

        document.body.appendChild(link);

        link.click();

        link.remove();
      })
      .catch((error) => {
        if (error?.response?.data) {
        } else {
        }
      });
  };
};
//uploadCMISfile is used to send and save  files into the cmis server
export const uploadCMISfile = (file,fileName,description,DMS) => { 
    const downloadURL = API.DMS_API + "/upload";
    let formData = {
      "upload": file,
      "name": fileName ? fileName : file.name,
      "nodeType": "cm:content",
      "cm:title": "My text",
      "cm:description": description,
      "relativePath": "Uploads",
      "DMS" : DMS
    };
    let bodyFormData = new FormData(); 
    for (let key in formData) {           //converts the javascript object into FormData type
      bodyFormData.append(key, formData[key]);
    }
    console.log(bodyFormData)
   return httpPOSTRequest(downloadURL,bodyFormData,)
      .then((res) => {
        if (res.data) {
        } else {
        }
      })
      .catch((error) => {
        if (error?.response?.data) {
          console.log(error);
        } else {
        }
      });
    }


export const updateCMISdocument = (id,file,fileName,description,DMS) =>{      
    const downloadURL = API.DMS_API + "/update";
    let formData = {
      "upload": file,
      "id":id,
      "name": fileName ? fileName : file.name,
      "nodeType": "cm:content",
      "cm:title": "My text",
      "cm:description": description,
      "relativePath": "Uploads",
      "majorVersion":true,
      "comment":"test",
      "DMS" : DMS

    };
    let bodyFormData = new FormData();
    for (let key in formData) {
      //converts the javascript object into FormData type
      bodyFormData.append(key, formData[key]);
    }
   return httpPUTRequest(downloadURL, bodyFormData)
      .then((res) => {
        if (res.data) {
        } else {
        }
      })
      .catch((error) => {
        if (error?.response?.data) {          
        } else {
        }
      });
  
}
