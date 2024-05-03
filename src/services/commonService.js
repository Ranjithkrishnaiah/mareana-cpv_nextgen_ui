import Service from './AjaxService';
import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';

//get view table
export const getViewTable = (_queryParam) => {
  return Service.get(BMS_APP_PYTHON_SERVICE + '/views-list', _queryParam).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.data;
    }
  );
};
