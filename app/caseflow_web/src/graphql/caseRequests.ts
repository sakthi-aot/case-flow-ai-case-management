import gql from 'graphql-tag'

export const FETCH_CASES = gql`
query{
  case{
    id,
    name,
    desc,
  }
}`

export const FETCH_DOCUMENT_OF_CASES = gql`
query getCase($CaseId:Int!){
  getCase(id:$CaseId){
    documents{
      id,
      name,
      caseid,
      latestversion,
      creationdate
    }
  }
  }`



export const ADD_CASE = gql`
  mutation createCase($createCaseInput:CreateCaseInput!){
    createCase(createCaseInput:$createCaseInput){
      id
    }
  }`


export const DELETE_CASE = gql`
  mutation removeCase($caseId:Int!){
    removeCase(id:$caseId){
      id
    }
  }`

export const UPDATE_CASE = gql`
  mutation updateCase($updateCaseInput:UpdateCaseInput!){
    updateCase(updateCaseInput:$updateCaseInput){
     id
    }
  }`

