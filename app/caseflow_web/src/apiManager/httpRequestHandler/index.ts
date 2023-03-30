import axios from "axios";

import UserService from "../../services/UserService";
import { store } from "../../services/Store";
import { setLoader, setProgress } from "../../reducers/applicationReducer";
const axionInstanceWithIntercepter = axios.create();
const axionInstanceWithOutIntercepter = axios.create();
export const httpGETRequest = (url, data, token, isBearer = true, headers?) => {
  return axionInstanceWithIntercepter.get(url, {
    params: data,
    headers: !headers
      ? {
          Authorization: isBearer
            ? `Bearer ${token || UserService.getToken()}`
            : token,
        }
      : headers,
  });
};

export const httpPOSTRequest = (
  url,
  data,
  token,
  isBearer = true,
  isUpload = false,
  headers?
) => {
  return axionInstanceWithIntercepter.post(url, data, {
    headers: headers
      ? headers
      : {
          Authorization: isBearer
            ? `Bearer ${token || UserService.getToken()}`
            : token,
        },
    onUploadProgress: (data) => {
      if (isUpload)
        store.dispatch(
          setProgress(
            Math.round(
              (100 * data.loaded) / (data["total"] ? data["total"] : 0)
            )
          )
        );
    },
  });
};
export const httpSearchRequest = (url, data, token, isBearer = true) => {
  return axionInstanceWithOutIntercepter.post(url, data, {
    headers: {
      Authorization: isBearer
        ? `Bearer ${token || UserService.getToken()}`
        : token,
    },
  });
};

export const httpPOSTRequestWithoutToken = (
  url,
  data,
  token,
  isBearer = true
) => {
  return axionInstanceWithIntercepter.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const httpPOSTRequestWithHAL = (url, data, token, isBearer = true) => {
  return axionInstanceWithIntercepter.post(url, data, {
    headers: {
      Authorization: isBearer
        ? `Bearer ${token || UserService.getToken()}`
        : token,
      Accept: "application/hal+json",
    },
  });
};

export const httpPUTRequest = (url, data, token, isBearer = true) => {
  return axionInstanceWithIntercepter.put(url, data, {
    headers: {
      Authorization: isBearer
        ? `Bearer ${token || UserService.getToken()}`
        : token,
    },
  });
};

export const httpDELETERequest = (url, token, isBearer = true) => {
  return axionInstanceWithIntercepter.delete(url, {
    headers: {
      Authorization: isBearer
        ? `Bearer ${token || UserService.getToken()}`
        : token,
    },
  });
};

export const httpGETBolbRequest = (
  url,
  data,
  token,
  isBearer = true,
  headers = null
) => {
  return axionInstanceWithIntercepter.get(url, {
    params: data,
    headers: !headers
      ? {
          Authorization: isBearer
            ? `Bearer ${token || UserService.getToken()}`
            : token,
        }
      : headers,
    responseType: "blob",
  });
};

axionInstanceWithIntercepter.interceptors.request.use(
  function (config) {
    store.dispatch(setLoader(true));
    return config;
  },
  function (error) {
    store.dispatch(setLoader(false));
    return Promise.reject(error);
  }
);

axionInstanceWithIntercepter.interceptors.response.use(
  function (response) {
    store.dispatch(setLoader(false));
    return response;
  },
  function (error) {
    store.dispatch(setLoader(false));
    return Promise.reject(error);
  }
);
