import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import configData from '../../config';
import api from '../../utils/api';
import { store } from '../../store';
import { settingLabels } from '../../store/actions';

import MainCard from './../../ui-component/cards/MainCard';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import { LoadingButton } from '@material-ui/lab';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewUserForm({ setLoadNewData }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [successfullyAdded, setSuccessfullyAdded] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right'
    });
    const { vertical, horizontal } = successfullyAdded;

    const [addedFail, setAddedFail] = useState(false);
    const [userPrivilege, setUserPrivilege] = useState({
        is_superuser: false,
        is_staff: false,
        is_external: false,
        is_seller: false
    });
    const [userCreateFailed, setCreateUserFailed] = useState(false);
    const [addUserButtonLoading, setAddUserButtonLoading] = useState(false);

    const createNewUser = () => {
        setAddUserButtonLoading(true);
        api.post(configData.API_SERVER + 'Users/', {
            email: email,
            password: password,
            is_staff: userPrivilege.is_staff,
            is_superuser: userPrivilege.is_superuser,
            is_external: userPrivilege.is_external,
            is_seller: userPrivilege.is_seller
        })
            .then((res) => {
                console.log(res);
                setSuccessfullyAdded((prev) => ({ ...prev, open: true }));
                setLoadNewData((prev) => prev + 'a');
                setCreateUserFailed(false);
                setAddUserButtonLoading(false);
                setEmail('');
                setPassword('');
                setUserPrivilege({
                    is_superuser: false,
                    is_staff: false,
                    is_external: false,
                    is_seller: false
                });
            })
            .catch((err) => {
                console.log(err);
                setAddedFail(true);
                setCreateUserFailed(true);
                setAddUserButtonLoading(false);
            });
    };
    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={successfullyAdded.open}
                autoHideDuration={6000}
                onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }

                    setSuccessfullyAdded((prev) => ({ ...prev, open: false }));
                }}
            >
                <Alert
                    onClose={(event, reason) => {
                        if (reason === 'clickaway') {
                            return;
                        }

                        setSuccessfullyAdded((prev) => ({ ...prev, open: false }));
                    }}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Successfully Added!
                </Alert>
            </Snackbar>
            <Snackbar
                open={addedFail}
                autoHideDuration={6000}
                anchorOrigin={{ vertical, horizontal }}
                onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }

                    setAddedFail(false);
                }}
            >
                <Alert
                    onClose={(event, reason) => {
                        if (reason === 'clickaway') {
                            return;
                        }

                        setAddedFail(false);
                    }}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    Submission Failed!
                </Alert>
            </Snackbar>
            <MainCard>
                <h2>Adding New User</h2>
                <Box display="flex" columnGap={5}>
                    <Box>
                        <TextField
                            label="Email"
                            sx={{ width: 400 }}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        {userCreateFailed && (
                            <Typography color="red" sx={{ marginTop: 1 }}>
                                Email with the same user already exists!
                            </Typography>
                        )}
                    </Box>
                    <Box>
                        <TextField
                            label="Password"
                            type="password"
                            sx={{ width: 400 }}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="h4" color="#616161">
                            User Privilege:
                        </Typography>
                        <FormGroup sx={{ width: 200 }} sx={{ display: 'flex', flexDirection: 'row' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={userPrivilege.is_superuser}
                                        onClick={() => {
                                            setUserPrivilege((prevData) => ({ ...prevData, is_superuser: !prevData.is_superuser }));
                                        }}
                                    />
                                }
                                label="is_superuser"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={userPrivilege.is_staff}
                                        onClick={() => {
                                            setUserPrivilege((prevData) => ({ ...prevData, is_staff: !prevData.is_staff }));
                                        }}
                                    />
                                }
                                label="is_stuff"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={userPrivilege.is_seller}
                                        onClick={() => {
                                            setUserPrivilege((prevData) => ({ ...prevData, is_seller: !prevData.is_seller }));
                                        }}
                                    />
                                }
                                label="is_seller"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={userPrivilege.is_external}
                                        onClick={() => {
                                            setUserPrivilege((prevData) => ({ ...prevData, is_external: !prevData.is_external }));
                                        }}
                                    />
                                }
                                label="is_external"
                            />
                        </FormGroup>
                    </Box>
                    <Box>
                        <LoadingButton
                            color="secondary"
                            variant="contained"
                            sx={{ marginTop: 2 }}
                            loading={addUserButtonLoading}
                            onClick={createNewUser}
                        >
                            Add New User
                        </LoadingButton>
                    </Box>
                </Box>
            </MainCard>
        </div>
    );
}
