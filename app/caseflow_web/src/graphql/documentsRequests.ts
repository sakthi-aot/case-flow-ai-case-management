import gql from 'graphql-tag'

export const FETCH_DOCUMENTS = gql`
query{
    documents{
    id,
    name,
    desc,
    caseId,
    creationdate,
    type
  }
}`

export const SEARCH_DOCUMENT_LIST = gql`
query SearchCaseDocument($searchField:String!,$searchColumn:String!){
  SearchCaseDocument(searchField:$searchField,searchColumn:$searchColumn){
    id,
    name,
    desc,
    caseId,
    creationdate,
    type
    }
  }`
