import {
    httpGETRequest,
    httpPUTRequest,
    httpPOSTRequest,
  } from "../apiManager/httpRequestHandler";
  import { API} from "../apiManager/endpoints";
  import { GRAPHQL } from "../apiManager/endpoints";
import {
    FETCH_CASES,
    ADD_CASE,
    DELETE_CASE,
    UPDATE_CASE,
  } from "../graphql/caseRequests"
  import { Case } from "../dto/cases"
  import { print } from "graphql";
  

  
  
  export const getCases = (documentId :string) => {
    return () => {
      const url = API + "download?id=" + documentId;
      httpGETRequest(url,null,null)
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
  
  export const addCases = async(newCase: Case) => {

      console.log("data11",newCase)
      const url =  GRAPHQL;
      httpPOSTRequest(url,{query: print(ADD_CASE),
        variables: {
          createCaseInput: {
            name: newCase.name,
            statusid: newCase.statusid,
          },
        },
      },null)
        .then((res) => {
          return {"success" : res};
        })
        .catch((error) => {
          if (error?.response?.data) {
            return({"error" : error})
          } else {
            return({"error" : "something went wrong"})
          }
        });
   
  };


  export const updateCases = async(newCase: Case) => {
console.log("update");
    console.log("data11",newCase)
    const url =  GRAPHQL;
    httpPOSTRequest(url,{query: print(UPDATE_CASE),
      variables: {
        updateCaseInput: {
          id:newCase.id,
          name: newCase.name,
          statusid: newCase.statusid,
        },
      },
    },null)
      .then((res) => {
        return {"success" : res};
      })
      .catch((error) => {
        if (error?.response?.data) {
          return({"error" : error})
        } else {
          return({"error" : "something went wrong"})
        }
      });
 
};
  export const getCasesList = async () => {
     
    const url = GRAPHQL;
    const  output =  await httpGETRequest(url,{query: print(FETCH_CASES),
      variables: {
      },
    },null)
      .then((res) => {return res.data.data.case})
      .catch((error) => {
        console.log({"error" : "error loading data"})
        return []
      });
      return output

  };