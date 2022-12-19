import gql from 'graphql-tag'

export const FETCH_CASES = gql`
  query{
    cases{      
      data{
        name
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
  mutation updateCase($updateCase:UpdateCaseInput!){
    updateUser(updateCaseInput:$updateCase){
      httpStatusCode
      recordUpdated
    }
  }`

