import {
  httpGETBolbRequest,
  httpGETRequest,
  httpDELETERequest

} from "../apiManager/httpRequestHandler";
import {API} from "../apiManager/endpoints";

// export const getDocumetById = (documentId) => {
//   return (dispatch) => {
//     const url = API.DMS_API + "download?id=" + documentId;
//     httpGETRequest(url)
//       .then((res) => {})
//       .catch((error) => {
//         if (error?.response?.data) {
//           dispatch(dashboardErrorHandler(error.response.data));
//         } else {
//           dispatch(dashboardErrorHandler("Failed to fetch dashboards"));
//         }
//       });
//   };
// };




export const  getAllDocuments = async () => {
  const url = API.DMS_API + "/doc_fetchdata";
  const data = await httpGETRequest(url,null,null)
  .then((res) => {return res["data"]["message"]["data"]["getDocumentList"]})
  .catch((error) => {
    if (error?.response?.data) {
      return({"error" : error})
    } else {
      return({"error" : "something went wrong"})

    }
  })
  
  return data;
}

export const  getDocument = async (id) => {
  const url = API.DMS_API + "?id=" + id;
  const data = await httpGETBolbRequest(url,null,null)
  .then((res) => {return res})
  .catch((error) => {
    if (error?.response?.data) {
      return({"error" : error})
    } else {
      return({"error" : "something went wrong"})

    }
  })
  
  return data;
}

export const  deleteDocument = async (id) => {
  const url = API.DMS_API + "?id=" + id;
  const data = await httpDELETERequest(url,null)
  .then((res) => {return res})
  .catch((error) => {
    if (error?.response?.data) {
      return({"error" : error})
    } else {
      return({"error" : "something went wrong"})

    }
  })
  
  return data;
}
