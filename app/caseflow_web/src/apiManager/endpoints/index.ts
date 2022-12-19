/* eslint-disable max-len */
//  const SERVER_BASE_URL = "http://localhost:5000";
 import { CASEFLOW_API_URL} from "./config";

export const GRAPHQLAPI:string = `${CASEFLOW_API_URL}`

//alert(CASEFLOW_API_URL)
export const API = {
  DMS_API: `${CASEFLOW_API_URL}/doc`,
 

};
export const GRAPHQL= GRAPHQLAPI+"/graphql"
