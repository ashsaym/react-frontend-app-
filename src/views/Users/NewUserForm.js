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

export default function NewUserForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userPrivilege, setUserPrivilege] = useState({
        is_superuser: false,
        is_staff: false,
        is_external: false,
        is_seller: false
    });
    return (
        <div>
            <MainCard>
                <h2>Adding New User</h2>
                <Box display="flex" columnGap={5}>
                    <TextField
                        label="Email"
                        sx={{ width: 400 }}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
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
                        <FormGroup sx={{ width: 200 }} sx={{display:'flex',flexDirection:"row"}}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={userPrivilege.is_superuser}
                                        onClick={() => {
                                            console.log('helo');
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
                                            console.log('helo');
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
                                            console.log('helo');
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
                                            console.log('helo');
                                            setUserPrivilege((prevData) => ({ ...prevData, is_external: !prevData.is_external }));
                                        }}
                                    />
                                }
                                label="is_external"
                            />
                        </FormGroup>
                    </Box>
                    <Box>
                        <LoadingButton color="secondary" variant="contained" sx={{ marginTop: 2 }}>
                            Add New User
                        </LoadingButton>
                    </Box>
                </Box>
            </MainCard>
        </div>
    );
}
