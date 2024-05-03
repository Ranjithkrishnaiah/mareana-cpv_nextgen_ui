import {
    API_PLOT_URL,
    API_RESULTSET_URL,
    BMS_APP_PYTHON_SERVICE,
    BMS_APP_PYTHON_SERVICE_DNS,
    BMS_APP_PYTHON_SERVICE_IP,
    GRAFANA_DASHBOARD,
} from '../../constants/apiBaseUrl';
import Service from '../../services/AjaxService';

/*To get the list of tables*/
export const returnData = (request) => {
    return Service.post(API_RESULTSET_URL + '/returnData', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const CustmReturnData = (request) => {
    return Service.post(API_PLOT_URL + 'apqrreport', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};
export const dataQualityReturnData = (request) => {
    return Service.post(API_PLOT_URL + 'data_quality_report', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};
export const ipcConfigSaveRecord = (request) => {
    return Service.post(GRAFANA_DASHBOARD + 'config_dashboard', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const loadFilter = (request) => {
    return Service.post(API_RESULTSET_URL + '/loadFilter', request).then(
        (response) => {
            return response;
        },
        (error) => {
            return error.response.data;
        }
    );
};
export const auditDataChange = (request) => {
    return Service.post(
        BMS_APP_PYTHON_SERVICE + '/audit-data-change',
        request
    ).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const exportAuditData = (request) => {
    return Service.gett(
        BMS_APP_PYTHON_SERVICE + '/audit-information',
        request
    ).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const getMoleculeData = (request) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/molecules', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const getChartType = (request) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/chartTypes', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};
