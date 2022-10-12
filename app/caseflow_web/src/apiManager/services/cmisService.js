import {
  httpGETBolbRequest,
  httpPOSTRequest,
} from "../../apiManager/httpRequestHandler";
import API from "../endpoints/index";
// import fs from 'fs';

export const fetchCMISfile = (documentId) => {
  return (dispatch) => {
    const downloadURL = API.DMS_API + "/download";
    httpGETBolbRequest(downloadURL, { id: documentId })
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
export const uploadCMISfile = (file, fileName) => {
  return (dispatch) => {
    console.log(file);
    const downloadURL = API.DMS_API + "/upload";
    let formData = {
      upload: file,
      name: fileName ? fileName : file.name,
      nodeType: "cm:content",
      "cm:title": "My text",
      "cm:description": "My text document description",
      relativePath: "Uploads",
    };
    let bodyFormData = new FormData();
    for (let key in formData) {
      //converts the javascript object into FormData type
      bodyFormData.append(key, formData[key]);
    }
    httpPOSTRequest(downloadURL, bodyFormData)
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
  };
};
