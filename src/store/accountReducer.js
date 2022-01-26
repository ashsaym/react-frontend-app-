// action - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT, UPDATE_ACCESSTOKEN,SET_USER_PRIVILEGE } from './actions';

export const initialState = {
    access_token: '',
    refresh_token: '',
    isLoggedIn: false,
    isInitialized: false,
    email: '',
    is_superuser: false,
    is_staff: false
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_INITIALIZE: {
            const { isLoggedIn, access_token, refresh_token, email } = action.payload;
            return {
                ...state,
                isLoggedIn,
                isInitialized: true,
                access_token,
                refresh_token,
                email
            };
        }
        case LOGIN: {
            const { user } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                user
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                access_token: '',
                refresh_token: ''
            };
        }
        case UPDATE_ACCESSTOKEN: {
            return {
                ...state,
                access_token: action.payload
            };
        }
        case SET_USER_PRIVILEGE: {
            return {
                ...state,
                is_staff: action.payload.is_staff,
                is_superuser: action.payload.is_superuser
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
