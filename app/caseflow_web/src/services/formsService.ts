import {
    httpGETRequest,
    httpPOSTRequest,
  } from "../apiManager/httpRequestHandler";
import { GRAPHQL, FORM_URL, FORMSFLOW_APPLICATION_URL} from "../apiManager/endpoints";
import { print } from "graphql";
import { ADD_WORKFLOW_CASE_HISTORY } from "../graphql/caseRequests";
import { FORMSFLOW_FORM_URL } from "../apiManager/endpoints/config";
import UserService from "./UserService";




  

  export const getFormsList = async (caseType) => {
    console.log(parseInt(caseType))
    const url =   `${FORM_URL}/form`;
    const  output =  await httpGETRequest(url,{},null)
      .then((res) => {return res.data})
      .catch((error) => {
        console.log({"error" : error})
        return {}
      });
      return output

  };

  export const getFormDetails = async (formId) => {
    const url =   `${FORMSFLOW_APPLICATION_URL}/formio/form/${formId}`;
    const formIoToken = await getFormIORoleIds()
    const token = {"x-jwt-token" : formIoToken};
    const  output =  await httpGETRequest(url,{},formIoToken,true,token)
      .then((res) => {return res.data})
      .catch((error) => {
        console.log({"error" : error})
        return {}
      });
      return output

  };
  export const startNewWorkflow = async (id,body) => {
    console.log(parseInt(id))
    const url = `${FORM_URL}/camunda/engine-rest-ext/v1/process-definition/key/${id}/start`;
    const  output =  await httpPOSTRequest(url,body,null)
      .then((res) => {return res.data})
      .catch((error) => {
        console.log({"error" : error})
        return {}
      });
      return output

  };

  export const getTaksByCaseId = async (id) => {
    const url = `${FORM_URL}/camunda/engine-rest-ext/v1/task?caseInstanceId=${id}`;
    const  output =  await httpGETRequest(url,{},null)
      .then((res) => {return res.data})
      .catch((error) => {
        console.log({"error" : error})
        return {}
      });
      return output

  };

  
  export const getTaksByUserId = async (id) => {
    const url = `${FORM_URL}/camunda/engine-rest-ext/v1/task?assignee=${id}`;
    const  output =  await httpGETRequest(url,{},null)
      .then((res) => {return res.data})
      .catch((error) => {
        console.log({"error" : error})
        return {}
      });
      return output

  };

  export const addWorkflowCaseHistory = async(caseId:string) => {
    const url =  GRAPHQL;
    return httpPOSTRequest(url,{query: print(ADD_WORKFLOW_CASE_HISTORY),
      variables: {
        createCaseEventInput: {
          artifactId:parseInt(caseId),
          eventtypeId: 12,
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

export const getFormIORoleIds = () => {
  // eslint-disable-next-line
  const url = FORMSFLOW_FORM_URL +'/formio/roles';
  
  return httpGETRequest(url, {}, UserService.getToken(), true)
      .then((res) => {
        return res.headers["x-jwt-token"];
       
      })
      .catch((error) => {
        return error;
      });

};