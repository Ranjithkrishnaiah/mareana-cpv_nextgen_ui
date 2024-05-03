import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';
import Service from './AjaxService';

export const getViews = (request) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/views-list', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const getViewConfig = (request) => {
  return Service.get(BMS_APP_PYTHON_SERVICE + '/view-config', request, {
    'content-type': 'application/json',
    username: 'user_mareana1',
    password: 'mareana_pass1',
  }).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.data;
    }
  );
};
