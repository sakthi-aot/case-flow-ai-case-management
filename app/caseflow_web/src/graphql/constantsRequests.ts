import gql from "graphql-tag";

export const FETCH_CASE_STATUSES = gql`
  query {
    getCaseStatuses {
      id
      casetypeid
      name
      displayname
      code
    }
  }
`;

export const FETCH_CASE_TYPES = gql`
  query {
    getCaseTypes {
      id
      name
      displayname
      code
      formid,
      searchterm
    }
  }
`;
