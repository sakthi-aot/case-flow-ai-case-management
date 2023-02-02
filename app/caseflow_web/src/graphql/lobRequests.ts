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


export const FETCH_ALL_LOB_DATA= gql`
query getLobDetails($Skip:Int!,$Take:Int!){
  getLobList(skip:$Skip,take:$Take){
    totalCount,
    CaseflowLob{
      sumAssured,
      policyNumber,
      createdDate,
      isActive
    }
  }
  }`