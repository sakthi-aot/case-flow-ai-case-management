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
query SearchCaseDocument($searchField:String!,$searchColumn:String!,$skip:Int!,$take:Int!){
  SearchCaseDocument(searchField:$searchField,searchColumn:$searchColumn,skip:$skip,take:$take){
    CaseDocuments{
      id,
      name,
      desc,
      caseId,
      creationdate,
      type,
      versions{
        versions    
        modificationdate
      }
    }
      totalCount
    }
  }`
