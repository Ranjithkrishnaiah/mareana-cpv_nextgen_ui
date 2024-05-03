import Service from './AjaxService';
import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';

//get count data
export const getCountData = (_queryParam) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/workflow-count', _queryParam,{
        'content-type': 'application/json',
        'username': localStorage.getItem('user'),
    }).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

//get table data

export const getTableData = (_queryParam) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/approvals'+ _queryParam,'',{
        'content-type': 'application/json',
        'username': localStorage.getItem('user'),
    }).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};