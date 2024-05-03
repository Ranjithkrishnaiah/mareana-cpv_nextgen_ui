import {
    BMS_APP_PYTHON_SERVICE,
} from '../constants/apiBaseUrl';
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

export const getCharts = (request) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/chart-list/' + request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const getReports = (request) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/reports' , request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const saveReportDesign = (request) => {
    return Service.put(BMS_APP_PYTHON_SERVICE + '/put-report-data' , request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const PublishReport = (request) => {
    return Service.put(BMS_APP_PYTHON_SERVICE + '/put-report-data' , request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};