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
    FETCH_DOCUMENT_OF_CASES,
    FETCH_CASE_DETAILS,
    FETCH_CASEHISTORY
  } from "../graphql/caseRequests"
  import { Case } from "../dto/cases"
  import { print } from "graphql";
  


  
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
  export const getDocumentofCaseList = async (id) => {
    console.log(parseInt(id))
    const url = GRAPHQL;
    const  output =  await httpPOSTRequest(url,{query: print(FETCH_DOCUMENT_OF_CASES),
      variables: {
        CaseId : parseInt(id),
      },
    },null)
      .then((res) => {return res.data.data.getCase.documents})
      .catch((error) => {
        console.log({"error" : error})
        return []
      });
      return output


  };

  export const getCaseDetails = async (id) => {
    console.log(parseInt(id))
    const url = GRAPHQL;
    const  output =  await httpPOSTRequest(url,{query: print(FETCH_CASE_DETAILS),
      variables: {
        CaseId : parseInt(id),
      },
    },null)
      .then((res) => {return res.data.data.getCase})
      .catch((error) => {
        console.log({"error" : error})
        return {}
      });
      return output

  };

  export const getCaseHistory = async(id) =>{
    const url = GRAPHQL
    const  output =  await httpPOSTRequest(url,{query: print(FETCH_CASEHISTORY),
      variables: {
        CaseId : parseInt(id),
      },
    },null)
      .then((res)=>{return res.data.data})
      .catch(error=>{
        console.log({"error":error})
        return {}
      });
      return output
  }