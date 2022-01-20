import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../../../../../utils/api';
import configData from '../../../../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
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
    Stack,
    Typography
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project imports
import useScriptRef from '../../../../../hooks/useScriptRef';
import AnimateButton from '../../../../../ui-component/extended/AnimateButton';
import { ACCOUNT_INITIALIZE } from './../../../../../store/actions';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// style constant
const useStyles = makeStyles((theme) => ({
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    }
}));

//============================|| API JWT - LOGIN ||============================//

const PasswordResetComp = (props, { ...others }) => {
    const classes = useStyles();
    const dispatcher = useDispatch();
    const history = useHistory();

    const scriptedRef = useScriptRef();
    const [checked, setChecked] = React.useState(true);
    const [password, setPassword] = React.useState('');
    const [confirmationPassword, setConfirmationPassword] = React.useState('');
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
    const [showPasswordError, setShowPasswordError] = React.useState(false);

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = () => {
        if (password != confirmationPassword) {
            setShowPasswordError(true);
        }
        if(password===confirmationPassword){
            

            // axios.post(configData.API_SERVER+'password/reset/confirm/',{
            //     password: password,
            //     token: props.verificationNo
            // })
        }
    };

    return (
        <React.Fragment>
            {showPasswordError && <Typography color="error">Passwords didn't match</Typography>}
            <Formik
                initialValues={{
                    passwordConfirm: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    password: Yup.string().max(255).required('Password is required'),
                    confirmationPassword: Yup.string().max(255).required('Password is required')
                })}
            >
                {({ errors, handleBlur, handleChange, isSubmitting, touched, values }) => (
                    <form noValidate {...others}>
                        <FormControl fullWidth className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-password-login">New Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {' '}
                                    {errors.password}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-password-login">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPasswordConfirm ? 'text' : 'password'}
                                value={confirmationPassword}
                                name="confirmPassword"
                                onBlur={handleBlur}
                                onChange={(e) => setConfirmationPassword(e.currentTarget.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordConfirm}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {' '}
                                    {errors.password}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box
                                sx={{
                                    mt: 3
                                }}
                            >
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box
                            sx={{
                                mt: 2
                            }}
                        >
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    onClick={handleSubmit}
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Save
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </React.Fragment>
    );
};

export default PasswordResetComp;
