import {
    httpGETRequest,
    httpPOSTRequest,
  } from "../apiManager/httpRequestHandler";
  import { BPM_URL } from "../apiManager/endpoints";



  

  export const getWorkflowList = async (caseType) => {
    console.log(parseInt(caseType))
    const url =   `${BPM_URL}/camunda/engine-rest-ext/v1/process-definition?latestVersion=true`;
    const  output =  await httpGETRequest(url,{},null)
      .then((res) => {return res.data})
      .catch((error) => {
        console.log({"error" : error})
        return {}
      });
      return output

  };
  export const startNewWorkflow = async (id,body) => {
    console.log(parseInt(id))
    const url = `${BPM_URL}/camunda/engine-rest-ext/v1/process-definition/key/${id}/start`;
    const  output =  await httpPOSTRequest(url,body,null)
      .then((res) => {return res.data})
      .catch((error) => {
        console.log({"error" : error})
        return {}
      });
      return output

  };

  export const getTaksByCaseId = async (id) => {
    const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task?caseInstanceId=${id}`;
    const  output =  await httpGETRequest(url,{},null)
      .then((res) => {return res.data})
      .catch((error) => {
        console.log({"error" : error})
        return {}
      });
      return output

  };

  
  export const getTaksByUserId = async (id) => {
    const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task?assignee=${id}`;
    const  output =  await httpGETRequest(url,{},null)
      .then((res) => {return res.data})
      .catch((error) => {
        console.log({"error" : error})
        return {}
      });
      return output

  };