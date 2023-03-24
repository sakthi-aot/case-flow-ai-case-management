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
query SearchCaseDocument($searchField:String!,$searchColumn:String!,$orderBy:String!,$orderType:String!,$skip:Int!,$take:Int!,$fromDate:String!,$toDate:String!){
  SearchCaseDocument(searchField:$searchField,searchColumn:$searchColumn,orderBy:$orderBy,orderType:$orderType,skip:$skip,take:$take,fromDate:$fromDate,toDate:$toDate){
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
