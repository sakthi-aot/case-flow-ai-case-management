import {
  httpGETRequest,
  httpPUTRequest,
  httpPOSTRequest,
} from "../apiManager/httpRequestHandler";
import API from "../apiManager/endpoints";

export const getDocumetById = (documentId) => {
  return (dispatch) => {
    const url = API.DMS_API + "download?id=" + documentId;
    httpGETRequest(url)
      .then((res) => {})
      .catch((error) => {
        if (error?.response?.data) {
          dispatch(dashboardErrorHandler(error.response.data));
        } else {
          dispatch(dashboardErrorHandler("Failed to fetch dashboards"));
        }
      });
  };
};
