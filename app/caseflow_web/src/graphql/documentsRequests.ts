import gql from 'graphql-tag'

export const FETCH_DOCUMENTS = gql`
query{
    documents{
    id,
    name,
    desc,
    caseid,
    creationdate,
  }
}`

export const SEARCH_DOCUMENT_LIST = gql`
query SearchcaseDocument($searchField:String!,$searchColumn:String!){
  SearchcaseDocument(searchField:$searchField,searchColumn:$searchColumn){
    id,
    name,
    desc,
    caseid,
    creationdate,
    }
  }`
