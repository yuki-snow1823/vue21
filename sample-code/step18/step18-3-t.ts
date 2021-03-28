import axios from 'axios';
import { UnauthorizedHandler } from '@/axios/unauthorized-handler';
import { UnprocessableEntityHandler } from '@/axios/unprocessable-entity-handler';

axios.defaults.baseURL = 'api/';

axios.interceptors.response.use(
  response => response,
  UnauthorizedHandler.onRejected(),
);
axios.interceptors.response.use(
  response => response,
  UnprocessableEntityHandler.onRejected(),
);
