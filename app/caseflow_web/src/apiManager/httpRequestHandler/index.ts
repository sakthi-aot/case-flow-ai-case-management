import axios from "axios";

import UserService from "../../services/UserService";
import {store} from "../../services/Store";
import {setLoader, setProgress} from "../../reducers/applicationReducer";
const axionInstanceWithIntercepter = axios.create();
const axionInstanceWithOutIntercepter = axios.create();
export const httpGETRequest = (
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
      : headers
  });
};

export const httpPOSTRequest = (url, data, token,  isBearer = true,isUpload= false,headers) => {
  return axionInstanceWithIntercepter.post(url, data, {
    headers: headers ? headers : {
      Authorization: isBearer
        ? `Bearer ${token || UserService.getToken()}`
        : token,
    },
    onUploadProgress: data => {
      //Set the progress value to show the progress bar
      if(isUpload)
      store.dispatch(setProgress(Math.round((100 * data.loaded) /(data["total"] ? data["total"] : 0))));
      
    },
  });
};
export const httpSearchRequest = (url, data, token, isBearer = true) => {
  return axionInstanceWithOutIntercepter.post(url, data, {
    headers: {
      Authorization: isBearer
        ? `Bearer ${token || UserService.getToken()}`
        : token,
    }
  });
};

export const httpPOSTRequestWithoutToken = (
  url,
  data,
  token,
  // eslint-disable-next-line no-unused-vars
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

axionInstanceWithIntercepter.interceptors.request.use(function (config) {
  // Do something before request is sent
  store.dispatch(setLoader(true));
  return config;
}, function (error) {
  // Do something with request error
  store.dispatch(setLoader(false));
  return Promise.reject(error);
});

// Add a response interceptor
axionInstanceWithIntercepter.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  store.dispatch(setLoader(false));
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  store.dispatch(setLoader(false));
  return Promise.reject(error);
});