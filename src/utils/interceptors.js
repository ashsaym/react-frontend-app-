import axios from 'axios';
import { refreshToken, LOGOUT } from '../store/actions';

import configData from '../config';
import { store } from '../store';

const API_URL = configData.API_SERVER;

const state = store.getState();
const { dispatch } = store;

const onRequest = (config) => {
    const state = store.getState();
    const access_token = state.account.access_token;

    config.headers['Authorization'] = `Bearer ${access_token}`;

    return config;
};

const onRequestError = (error) => {
    return Promise.reject(error);
};

const onResponse = (response) => {
    return response;
};

const onResponseError = async (error) => {
    console.log(error.response);

    if (error.response) {
        // Access Token was expired
        if (error.response.status === 500) {
            console.log('Status 500 error');
        }

        if (error.response.data[1].detail === 'bad_authorization_header' || error.response.data[1].code === 'token_not_valid') {
            dispatch({
                type: LOGOUT
            });
        }

        // if (error.response.status === 401 && error.response.data[0].code === 'token_not_valid') {
        //     const state = store.getState();
        //     const access_token = state.account.access_token;
        //     const refresh_token = state.account.refresh_token;

        //     try {
        //         const rs = await axios.post(`${API_URL}Token/renew`, {
        //             refresh_token: refresh_token
        //         });

        //         const access_token = rs.data.access;
        //         dispatch(refreshToken(access_token));

        //         return;
        //     } catch (_error) {
        //         return Promise.reject(_error);
        //     }
        // }
    }
    return Promise.reject(error);
};

export const setupInterceptorsTo = (axiosInstance) => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
};
