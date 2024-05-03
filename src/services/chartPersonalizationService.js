import Service from './AjaxService';
import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';

//get site id
export const getSiteId = (_queryParam) => {
  return Service.get(BMS_APP_PYTHON_SERVICE + '/site_ids', _queryParam).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.data;
    }
  );
};

//get chart type
export const getChartList = (request) => {
  return Service.get(BMS_APP_PYTHON_SERVICE + '/chart-list', request).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.data;
    }
  );
};

//get chart obj
export const getChartObj = (request) => {
  return Service.get(BMS_APP_PYTHON_SERVICE + '/chart', request).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error;
    }
  );
};

//put chart obj
export const putChartObj = (request) => {
  return Service.put(BMS_APP_PYTHON_SERVICE + '/chart', request).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.data;
    }
  );
};

export const viewBatchData = (request) => {
  return Service.post(BMS_APP_PYTHON_SERVICE + '/views', request).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.data;
    }
  );
};

//get rule list
export const getRuleList = (request) => {
  return Service.get(BMS_APP_PYTHON_SERVICE + '/rules', request).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error;
    }
  );
};
