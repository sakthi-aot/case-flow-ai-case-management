
export const CASEFLOW_API_URL =
(window._env_ && window._env_.REACT_APP_CASEFLOW_API_URL) ||
process.env.REACT_APP_CASEFLOW_API_URL;

export const KEYCLOAK_URL =
(window._env_ && window._env_.REACT_APP_KEYCLOAK_URL) ||
process.env.REACT_APP_KEYCLOAK_URL;

export const KEYCLOAK_AUTH_URL = `${KEYCLOAK_URL}/auth`;

