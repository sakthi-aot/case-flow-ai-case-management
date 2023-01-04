import {
  httpGETBolbRequest,
  httpGETRequest,

} from "../apiManager/httpRequestHandler";
import {API, GRAPHQL} from "../apiManager/endpoints";
import { FETCH_DOCUMENTS } from "../graphql/documentsRequests";
import { print } from "graphql";
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
  const url = GRAPHQL;
  const  output =  await httpGETRequest(url,{query: print(FETCH_DOCUMENTS),
    variables: {
    },
  },null)
    .then((res) => {return res.data.data.documents    })
    .catch((error) => {
      console.log({"error" : "error loading data"})
      return []
    });
    return output
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