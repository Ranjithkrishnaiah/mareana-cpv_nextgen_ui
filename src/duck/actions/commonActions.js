import {
  HIDE_LOADING,
  HIDE_NOTIFICATION,
  SET_NAVIGATION_DATA,
  SET_THEME,
  SHOW_LOADING,
  SHOW_NOTIFICATION,
  TOGGLE_MENU,
} from '../types/types';

export const toggleMenu = () => (dispatch) => {
  dispatch({
    type: TOGGLE_MENU,
  });
};
export const showLoader = () => (dispatch) => {
  dispatch({
    type: SHOW_LOADING,
    payload: true,
  });
};
export const hideLoader = () => (dispatch) => {
  dispatch({
    type: HIDE_LOADING,
    payload: false,
  });
};
export const showNotification = (type, message, description) => (dispatch) => {
  dispatch({
    type: SHOW_NOTIFICATION,
    payload: {
      type,
      message,
      description,
      status: true,
    },
  });
};
export const hideNotification = () => (dispatch) => {
  dispatch({
    type: HIDE_NOTIFICATION,
    payload: {
      status: false,
    },
  });
};

export const setTheme = (theme) => (dispatch) => {
  dispatch({
    type: SET_THEME,
    payload: theme,
  });
};

export const setNavigationData = (data) => (dispatch) => {
  dispatch({
    type: SET_NAVIGATION_DATA,
    payload: data,
  });
};
