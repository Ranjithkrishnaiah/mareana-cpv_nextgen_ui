import {  SELECTED_REPORT_ID ,SCREEN_CHANGE} from '../../constants/actionTypes'


// export const sendReportId = (dispatch) => (data) => {
//     dispatch({
//       type: SELECTED_REPORT_ID,
//       payload: data
//     })
//   };

export const sendReport = (payload) => ({
    type: SELECTED_REPORT_ID,
    payload,
  });

export const screenChange = (payload) => ({
    type: SCREEN_CHANGE,
    payload,
  });
  
  