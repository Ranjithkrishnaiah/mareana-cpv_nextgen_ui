import * as types from '../../constants/actionTypes';

const initState = {
  selectedView: {},
  viewId: '',
  viewName: '',
  viewStatus: '',
  viewVersion: '',
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.SELECTED_VIEW:
      return { ...state, selectedView: action.payload };
    case types.SELECTED_VIEW_ID:
      return { ...state, viewId: action.payload };
    case types.SELECTED_VIEW_NAME:
      return { ...state, viewName: action.payload };
    case types.SELECTED_VIEW_STATUS:
      return { ...state, viewStatus: action.payload };
    case types.SELECTED_VIEW_VERSION:
      return { ...state, viewVersion: action.payload };
    case types.RESET_CHART:
      return initState;
    default:
      return state;
  }
};
