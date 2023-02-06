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
query getLobDetails($Skip:Int!,$Take:Int!,$SearchField:String!,$SearchColumn:String! ){
  searchCaseflowLob(searchField:$SearchField,searchColumn:$SearchColumn,skip:$Skip,take:$Take){
    totalCount,
    CaseflowLob{     
      policyNumber,
      createdDate,
      isActive,
      caseId,
      sumAssured
    }
  }
  
  }`


export const CREATE_NEW_CASEFLOW_LOB = gql`
mutation createCaseflowLob($createCaseflowLobInput:CreateCaseflowLobInput!){
  createCaseflowLob(createCaseflowLobInput:$createCaseflowLobInput){
    id
  }
}
`