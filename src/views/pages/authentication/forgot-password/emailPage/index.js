import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from '@material-ui/core';

// project imports
import RestLogin from './RestLogin';
import ForgotPasswordVerficationPage from './VerficationPage';
import PasswordResetComp from './PasswordResetPage';
import AuthWrapper1 from './../../AuthWrapper1';
import Logo from './../../../../../ui-component/Logo';
import AuthCardWrapper from './../../AuthCardWrapper';
import AnimateButton from '../../../../../ui-component/extended/AnimateButton';
import AuthFooter from './../../../../../ui-component/cards/AuthFooter';

// assets

//================================|| LOGIN MAIN ||================================//

const ForgotPasswordEmailPage = () => {
    const [emailField, setEmailField] = useState(true);
    const [verificationField, setVerificationField] = useState(false);
    const [passwordResetField, setPasswordResetField] = useState(false);
    const [verificationNo, setVerificationNo] = useState('');

    return (
        <div>
            {emailField && <EmailPage setEmailField={setEmailField} setVerificationField={setVerificationField} />}
            {verificationField && (
                <ForgotPasswordVerficationPage
                    setVerificationField={setVerificationField}
                    setPasswordResetField={setPasswordResetField}
                    verificationNo={verificationNo}
                    setVerificationNo={setVerificationNo}
                />
            )}
            {passwordResetField && <PasswordResetPage verificationNo={verificationNo} />}
        </div>
    );
};

export default ForgotPasswordEmailPage;

const EmailPage = ({ setEmailField, setVerificationField }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 1 }}>
                                        <RouterLink to="/">
                                            <Logo />
                                        </RouterLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                                        Enter your email
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RestLogin setEmailField={setEmailField} setVerificationField={setVerificationField} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            item
                                            container
                                            direction="column"
                                            alignItems="center"
                                            xs={12}
                                            textAlign={matchDownSM ? 'center' : ''}
                                        >
                                            <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                                Don't have an account? Please contact Lemken !!
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

const PasswordResetPage = ({ verificationNo }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 1 }}>
                                        <RouterLink to="/">
                                            <Logo />
                                        </RouterLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                                        Enter New Password
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <PasswordResetComp verificationNo={verificationNo} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            item
                                            container
                                            direction="column"
                                            alignItems="center"
                                            xs={12}
                                            textAlign={matchDownSM ? 'center' : ''}
                                        >
                                            <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                                Don't have an account? Please contact Lemken !!
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};
