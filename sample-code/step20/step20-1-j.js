/* eslint-disable no-unused-vars, no-undef */
// モック化対象のオブジェクト
import * as veeValidate from 'vee-validate';

global.mockVeeValidate = valid => {
  // vee-validate をモック化
  jest.spyOn(veeValidate, 'validate').mockResolvedValue({ valid: valid });
};
