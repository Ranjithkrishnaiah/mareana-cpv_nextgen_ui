import {
    BMS_APP_PYTHON_SERVICE,
} from '../constants/apiBaseUrl';
import Service from './AjaxService';


export const saveReportGenerator = (request) => {
    return Service.put(BMS_APP_PYTHON_SERVICE + '/report-variant', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const getReportGenerator = (request) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/report-variant', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

