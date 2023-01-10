import gql from 'graphql-tag'


export const FETCH_DATA = gql`
query getLobDetails($Id:Int!){
  getLobByCaseId(caseId:$Id){
  id,
  policyNumber,
  policyEffectiveDate,
  policyExpiryDate,
  sumAssured,
  isActive,
  createdDate
  }
  }`