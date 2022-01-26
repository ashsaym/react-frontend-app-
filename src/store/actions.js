import { store } from '.';

// action - account reducer
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_ACCESSTOKEN = 'UPDATE_ACCESSTOKEN';
export const ACCOUNT_INITIALIZE = 'ACCOUNT_INITIALIZE';
export const SET_USER_PRIVILEGE = 'SET_USER_PRIVILEGE';


// action - customization reducer
export const SET_MENU = '@customization/SET_MENU';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';

//
export const LOAD_AUTOCOMPLETE_DATA = 'LOAD_AUTOCOMPLETE_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';

export const refreshToken = (accessToken) => (dispatch) => {
    dispatch({
        type: UPDATE_ACCESSTOKEN,
        payload: accessToken
    });
};

export const fetchAutoCompleteData = (autoCompleteData, dispatch) => {
    dispatch({
        type: LOAD_AUTOCOMPLETE_DATA,
        payload: autoCompleteData
    });
};

//urtil fucntions
