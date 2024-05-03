import { API_AUTHENTICATION_URL } from '../constants/apiBaseUrl';
import { AjaxService } from '../utilities/AjaxService';

export const userLogin = _queryParam => {
    return AjaxService.post(
        API_AUTHENTICATION_URL + '/signin',
        JSON.stringify(_queryParam)
    ).then(
        res => {
            return res.data;
        },
        error => {
            return error.response.data;
        }
    );
};

export const userRefresh = _queryParam => {
    return AjaxService.post(
        API_AUTHENTICATION_URL + '/signin/refresh',
        {},
        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            refreshToken: _queryParam
        }
    ).then(
        res => {
            return res.data;
        },
        error => {
            return error.response.data;
        }
    );
};


export const userLogout = _queryParam => {
    return AjaxService.post(
        API_AUTHENTICATION_URL + '/signout',
        JSON.stringify(_queryParam)
    ).then(
        res => {
            return res.data;
        },
        error => {
            return error.response.data;
        }
    );
};


export const getAccessRoles = (...params) => {
    const url = `${API_AUTHENTICATION_URL}/user/get/servicesByApp-Usr?appName=${params[0]}&userName=${params[1]}`;
    return AjaxService.get(url);
};