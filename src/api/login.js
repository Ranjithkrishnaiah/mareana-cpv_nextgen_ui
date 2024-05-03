import { API_AUTHENTICATION_URL } from '../constants/apiBaseUrl';
import Service from '../services/AjaxService';

export const userLogin = (_queryParam) => {
    return Service.post(
        API_AUTHENTICATION_URL + '/signin',
        JSON.stringify(_queryParam)
    ).then(
        (res) => res.data,
        (error) => {
            throw error.response.data;
        }
    );
};

export const userRefresh = (_queryParam) => {
    return Service.post(
        API_AUTHENTICATION_URL + '/signin/refresh',
        {},
        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            refreshToken: _queryParam,
        }
    ).then(
        (res) => res.data,
        (error) => {
            throw error.response.data;
        }
    );
};

export const userLogout = (_queryParam) => {
    return Service.post(
        API_AUTHENTICATION_URL + '/signout',
        JSON.stringify(_queryParam)
    ).then(
        (res) => res.data,
        (error) => {
            throw error.response.data;
        }
    );
};
