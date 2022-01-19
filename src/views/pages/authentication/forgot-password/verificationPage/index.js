import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import configData from '../../../../../config';

// material-ui
import { useTheme } from '@material-ui/core';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';
import { Box, Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';

// project imports
import AuthWrapper1 from './../../AuthWrapper1';
import Logo from './../../../../../ui-component/Logo';
import AuthCardWrapper from './../../AuthCardWrapper';

import AuthFooter from './../../../../../ui-component/cards/AuthFooter';
import AnimateButton from '../../../../../ui-component/extended/AnimateButton';

// assets

//================================|| LOGIN MAIN ||================================//

const ForgotPasswordVerficationPage = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verificationNo, setVerificationNo] = useState('');
    const [validVerfication, setValidVerification] = useState(true);
  
    const checkVerification = async () => {
        setIsSubmitting(true)
        axios
            .post(configData.API_SERVER + 'password/reset/validate_token/', {
                token: verificationNo
            })
            .then((res) => {
                console.log(res)
                setValidVerification(true)
            })
            .catch((error) => {
            
                setValidVerification(false)
                setIsSubmitting(false)
            });
    };

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
                                                        Enter The verification code sent to your email
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ marginBottom: 3 }}>
                                            <TextField
                                                required
                                                label="Verification Key"
                                                fullWidth
                                                value={verificationNo}
                                                onChange={(e) => {
                                                    setVerificationNo(e.target.value);
                                                }}
                                            />
                                            {!validVerfication && <Typography color="error">Invalid Key!</Typography>}
                                        </Box>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                onClick={checkVerification}
                                            >
                                                Reset Password
                                            </Button>
                                        </AnimateButton>
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

export default ForgotPasswordVerficationPage;
