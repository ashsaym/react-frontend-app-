import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

// routing
import Routes from './routes';

// defaultTheme
import theme from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';

import api from './utils/api';
import configData from './config';
import { fetchAutoCompleteData, SET_USER_PRIVILEGE } from './store/actions';
import cookieCutter from 'cookie-cutter';
import { store } from './store';

//-----------------------|| APP ||-----------------------//

const App = () => {
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    useEffect(() => {
        api.get(configData.API_SERVER + 'SearchList/').then((response) => {
            var usuableData = response.data;

            fetchAutoCompleteData(usuableData, dispatch);
        });
        const user = store.getState().account;
        if(user.email){

            api.get(configData.API_SERVER + 'Users/check/' + user.email).then((response) => {
                if (response.data[0].is_superuser || response.data[0].is_stuff) {
                    cookieCutter.set('is_admin', true)
                }
                
            });
        }
    });

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
