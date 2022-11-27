import axios from 'axios';
import globalConfig from './global';

import Uris from '../constants/Uris';

const API_ENDPOINT = Uris.main_url
const request = axios.create();

const jwtRequiredList = [
  //put the urls you want to use the token for request  
];

request.interceptors.request.use(
  config => {
    config.baseURL = API_ENDPOINT + Uris.api_url;
    const url = config.url;
    console.log(API_ENDPOINT + Uris.api_url + url)
    const checkJwt = jwtRequiredList.findIndex(jwt => url.includes(jwt));
    //console.log(globalConfig.getToken(), checkJwt)
    if (checkJwt >= 0 && globalConfig.getToken()) {
      config.headers = {
        Authorization: `Bearer ${globalConfig.getToken()}`,
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  function (response) {
    // console.log("respooooonse", response.headers["total-pages"])
    // return response.data;
    return response;
  },
  function (error) {
    console.log("errrrr", error)
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return Promise.reject(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error);
    }
  },
);

// request.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

export default request;
