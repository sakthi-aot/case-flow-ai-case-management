export const CASEFLOW_API_URL: string =
  (window._env_ && window._env_.REACT_APP_CASEFLOW_API_URL) ||
  process.env.REACT_APP_CASEFLOW_API_URL;

export const CASEFLOW_GRAPHQL_API_URL: string =
  (window._env_ && window._env_.REACT_APP_CASEFLOW_GRAPHQL_API_URL) ||
  process.env.REACT_APP_CASEFLOW_GRAPHQL_API_URL;

export const KEYCLOAK_URL =
  (window._env_ && window._env_.REACT_APP_KEYCLOAK_URL) ||
  process.env.REACT_APP_KEYCLOAK_URL;

export const KEYCLOAK_AUTH_URL = `${KEYCLOAK_URL}/auth`;

export const CASEFLOW_DMS: string =
  (window._env_ && window._env_.REACT_APP_CASEFLOW_DMS) ||
  process.env.REACT_APP_CASEFLOW_DMS;

export const CASEFLOW_LOB_GRAPHQL_API_URL: string =
  (window._env_ && window._env_.REACT_APP_CASEFLOW_LOB_GRAPHQL_API_URL) ||
  process.env.REACT_APP_CASEFLOW_LOB_GRAPHQL_API_URL;
export const PAGINATION_TAKE: string =
  (window._env_ && window._env_.REACT_APP_PAGINATION_TAKE) ||
  process.env.REACT_APP_PAGINATION_TAKE;

export const FORMSFLOW_URL: string =
  (window._env_ && window._env_.REACT_APP_FORMSFLOW_URL) ||
  process.env.REACT_APP_FORMSFLOW_URL;

export const FORMSFLOW_APP_URL: string =
  (window._env_ && window._env_.REACT_APP_FORMSFLOW_APP_URL) ||
  process.env.REACT_APP_FORMSFLOW_APP_URL;

export const CASEFLOW_DMS_API_URL: string =
  (window._env_ && window._env_.REACT_APP_CASEFLOW_DMS_API_URL) ||
  process.env.REACT_APP_CASEFLOW_DMS_API_URL;

export const FORMSFLOW_FORM_URL: string =
  (window._env_ && window._env_.REACT_APP_FORMSFLOW_FROM_URL) ||
  process.env.REACT_APP_FORMSFLOW_FROM_URL;

export const GENERIC_NAME: string =
  (window._env_ && window._env_.REACT_APP_GENERIC_NAME) ||
  process.env.REACT_APP_GENERIC_NAME;
