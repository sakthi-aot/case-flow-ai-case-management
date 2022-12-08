import {
    httpGETRequest,
    httpPUTRequest,
    httpPOSTRequest,
  } from "../apiManager/httpRequestHandler";
  import API from "../apiManager/endpoints";
  
  
  export const getCases = (documentId) => {
    return (dispatch) => {
      const url = API.DMS_API + "download?id=" + documentId;
      httpGETRequest(url)
        .then((res) => {})
        .catch((error) => {
          if (error?.response?.data) {
            return({"error" : error})
          } else {
            return({"error" : "something went wrong"})
          }
        });
    };
  };
  