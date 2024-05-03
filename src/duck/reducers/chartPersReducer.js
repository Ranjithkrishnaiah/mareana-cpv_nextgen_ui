import * as types from '../../constants/actionTypes';

const initState = {
  site: '',
  dateRange: '',
  unApprovedData: false,
  getBatchCoverage: {},
  parameterTableData: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.SELECTED_SITE:
      return { ...state, site: action.payload };
    case types.SELECTED_DATE_RANGE:
      return { ...state, dateRange: action.payload };
    case types.SELECTED_UNAPPROVED_DATA:
      return { ...state, unApprovedData: action.payload };
    case types.GET_BATCH_COVERAGE:
      return { ...state, getBatchCoverage: action.payload };
    case types.PARAMETER_TABLE_DATA:
      return { ...state, parameterTableData: action.payload };
    case types.RESET_CHART:
      return initState;
    default:
      return state;
  }
};
