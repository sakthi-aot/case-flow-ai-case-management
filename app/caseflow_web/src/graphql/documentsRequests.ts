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