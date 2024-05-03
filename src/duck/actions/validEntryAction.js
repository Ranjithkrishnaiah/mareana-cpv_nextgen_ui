import { API_PLOT_URL } from '../constants/apiBaseUrl';

export const validationData = queryParam => {
    return fetch(API_PLOT_URL + 'validateentry', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(queryParam)
    })
        .then(res => res.json())
        .then(fields => fields);

};
