import axios from 'axios';

import Uris from '@constants/uris';

import {store} from '../App';
import {signOut} from '../modules/auth/actions';
import globalConfig from './global';

const API_ENDPOINT = Uris.main_url;
const request = axios.create();

const jwtNotRequiredList = [Uris.signin];

request.interceptors.request.use(
  config => {
    config.baseURL = API_ENDPOINT + Uris.api_url;
    const url = config.url;
    const checkJwt = !jwtNotRequiredList.findIndex(jwt => url.includes(jwt));
    if (checkJwt >= 0 && globalConfig.getToken()) {
      config.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${globalConfig.getToken()}`,
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error('Network Error: ', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        store.dispatch(signOut());
      }
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

request.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
request.defaults.headers.Accept = 'application/json';

export default request;
