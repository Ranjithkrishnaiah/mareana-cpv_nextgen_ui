import * as types from '../../constants/actionTypes';

const initState = {
  chartName: '',
  chartDesc: '',
  chartData: {},
  chartType: '',
  chartxAxis: '',
  chartyAxis: '',
  chartId: '',
  chartVersion: '',
  selectedChartData: {},
  chartMapping: {},
  data: [],
  layout: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.GET_CHART_NAME:
      return { ...state, chartName: action.payload };
    case types.GENERATE_CHART:
      return { ...state, chartData: action.payload };
    case types.SELECTED_CHART_TYPE:
      return { ...state, chartType: action.payload };
    case types.SELECTED_X_AXIS:
      return { ...state, chartxAxis: action.payload };
    case types.SELECTED_Y_AXIS:
      return { ...state, chartyAxis: action.payload };
    case types.SELECTED_CHART_NAME:
      return { ...state, chartName: action.payload };
    case types.SELECTED_CHART_DESCRIPTION:
      return { ...state, chartDesc: action.payload };
    case types.SELECTED_CHART_ID:
      return { ...state, chartId: action.payload };
    case types.SELECTED_CHART_VERSION:
      return { ...state, chartVersion: action.payload };
    case types.SELECTED_CHART_DATA:
      return { ...state, selectedChartData: action.payload };
    case types.CHART_MAPPING:
      return { ...state, chartMapping: action.payload };
    case types.SEND_CHART_DATA:
      return { ...state, data: action.payload };
    case types.SEND_CHART_LAYOUT:
      return { ...state, layout: action.payload };
    case types.RESET_CHART:
      return initState;
    default:
      return state;
  }
};
