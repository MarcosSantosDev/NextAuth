import axios from 'axios';

import * as interceptors from './interceptors';

const clientHttp = axios.create({
  baseURL: 'http://localhost:3333',
});

clientHttp.interceptors.request.use(interceptors.requestSuccess, interceptors.requestError);
clientHttp.interceptors.response.use(interceptors.responseSuccess, interceptors.responseError);

export default clientHttp;

