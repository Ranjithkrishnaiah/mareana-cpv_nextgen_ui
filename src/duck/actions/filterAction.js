import { API_RESULTSET_URL } from '../../constants/apiBaseUrl';

export const saveRecord = (queryParam) => {
    return fetch(API_RESULTSET_URL + '/saveRecord', {
        //platform-services //prismmicro-resultset
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryParam),
    })
        .then((res) => res.json())
        .then((fields) => {
            return fields;
        });
};

export const getData = (queryParam) => {
    return fetch(
        API_RESULTSET_URL + '/returnData',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(queryParam),
        },
        {
            mode: 'no-cors',
        }
    )
        .then((res) => {
            return res.json();
        })
        .then((posts) => {
            if (posts.error) {
                throw posts.message;
            }
            return posts;
        });
};

export const loadFilter = (queryParam) => {
    return fetch(
        API_RESULTSET_URL + '/loadFilter',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(queryParam),
        },
        {
            mode: 'no-cors',
        }
    )
        .then((res) => {
            return res.json();
        })
        .then((posts) => {
            if (posts.error) {
                throw posts.message;
            }
            return posts;
        });
};

export const downloadData = (_queryParam) => {
    return fetch(API_RESULTSET_URL + '/returnExcel', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
        responseType: 'blob',
        body: JSON.stringify(_queryParam),
    })
        .then((response) => response.json())
        .then((posts) => {
            return posts;
        });
};
