// action - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT, UPDATE_ACCESSTOKEN } from './actions';

export const initialState = {
    access_token: '',
    refresh_token: '',
    isLoggedIn: false,
    isInitialized: false,
   
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_INITIALIZE: {
            const { isLoggedIn, access_token, refresh_token } = action.payload;
            return {
                ...state,
                isLoggedIn,
                isInitialized: true,
                access_token,
                refresh_token
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
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
