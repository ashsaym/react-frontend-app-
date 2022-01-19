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
import { fetchAutoCompleteData } from './store/actions';

//-----------------------|| APP ||-----------------------//

const App = () => {
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    useEffect(() => {
        api.get(configData.API_SERVER + 'SearchList/').then((response) => {
            var usuableData = response.data;

            fetchAutoCompleteData(usuableData, dispatch);
        });
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
