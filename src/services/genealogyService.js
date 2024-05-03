import Service from './AjaxService';
import {
  BMS_APP_PYTHON_SERVICE,
  MDH_APP_PYTHON_SERVICE,
} from '../constants/apiBaseUrl';

//geanealogy plant/product/batch

export const getGeanealogyFilter = (_queryParam) => {
  return Service.post(
    BMS_APP_PYTHON_SERVICE + '/genealogy-filter',
    _queryParam
  ).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.data;
    }
  );
};

export const getBackwardData = (_queryParam) => {
  return Service.get(
    MDH_APP_PYTHON_SERVICE + '/mdhgenealogy/v1/genealogy',
    _queryParam
  ).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.data;
    }
  );
};

export const getForwardData = (_queryParam) => {
  return Service.get(
    MDH_APP_PYTHON_SERVICE + '/mdhgenealogy/v1/genealogy',
    _queryParam
  ).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.data;
    }
  );
};

/**
 * TODO: get batch details from node
 */
export const getBatchInfo = (_queryParam) => {
  return Service.get(
    MDH_APP_PYTHON_SERVICE + '/mdhgenealogy/v1/batch-info',
    _queryParam
  ).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.data;
    }
  );
};

/**
 * TODO: get Input Proces Order & From Process Order details
 */

export const getProcessInfo = (_queryParam) => {
  return Service.get(
    MDH_APP_PYTHON_SERVICE + '/mdhgenealogy/v1/process-info',
    _queryParam
  ).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.data;
    }
  );
};
