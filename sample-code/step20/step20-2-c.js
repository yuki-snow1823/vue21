/* eslint-disable no-unused-vars, no-undef */
// モック化対象のオブジェクト
import * as veeValidate from 'vee-validate';
// モック化対象のオブジェクト
import axios from 'axios';

global.mockVeeValidate = valid => {
  // vee-validate をモック化
  jest.spyOn(veeValidate, 'validate').mockResolvedValue({ valid: valid });
};

global.mockAxiosGet = value => {
  // axios.get をモック化
  jest.spyOn(axios, 'get').mockResolvedValue(value);
};

global.mockAxiosPatch = value => {
  // axios.patch をモック化
  jest.spyOn(axios, 'patch').mockResolvedValue(value);
};
