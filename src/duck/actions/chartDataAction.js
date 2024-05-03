import { GET_CHART_DATA } from '../../constants/actionTypes';

export const getChartData = (dispatch) => (data) => {
    dispatch({
        type: GET_CHART_DATA,
        payload: data,
    });
};
