import {
    API_RESULTSET_URL,
    API_CPV_URL,
    API_PLOT_URL,
    BMS_APP_PYTHON_SERVICE,
} from '../../constants/apiBaseUrl';
import Service from '../../services/AjaxService';

export const fetchPost = (_queryParam, dataTableConfig) => {
    return fetch(API_RESULTSET_URL + '/returnData', {
        //platform-services //prismmicro-resultset
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(_queryParam),
    })
        .then((res) => res.json())
        .then((posts) => {
            let dataTable = { ...dataTableConfig };
            if (posts.data && posts.config) {
                posts.filters = _queryParam.filters;
                dataTable = {
                    ...dataTableConfig,
                    header: {
                        ...dataTableConfig.header,
                        config: [...posts.config],
                    },
                    body: {
                        ...dataTableConfig.body,
                        ...posts.data,
                    },
                    filters: [...posts.filters],
                };
            }
            return dataTable;
        });
};

export const unApprovedReturnData = (request) => {
    return Service.post(API_PLOT_URL + 'unapproved_plot', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const deviationsPlotReturnData = (request) => {
    return Service.post(API_PLOT_URL + 'deviations_plot', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const excursionPlotReturnData = (request) => {
    return Service.post(API_PLOT_URL + 'excursion_plot', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const excursionTableReturnData = (request) => {
    return Service.post(API_PLOT_URL + 'excursiontable', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const rulesViolation = (request) => {
    return Service.post(API_PLOT_URL + 'rules-violation', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const returnData = (_queryParam, dataTableConfig) => {
    return fetch(API_RESULTSET_URL + '/returnData', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(_queryParam),
    })
        .then((res) => res.json())
        .then((posts) => {
            return posts;
        });
};

export const uploaddatafile = (_queryParam) => {
    return fetch(API_CPV_URL + '/uploaddatafile', {
        method: 'POST',
        body: _queryParam,
    })
        .then((res) => res.json())
        .then((fields) => fields);
};
