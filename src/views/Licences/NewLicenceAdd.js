import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import configData from '../../config';
import api from '../../utils/api';

import MainCard from './../../ui-component/cards/MainCard';
import Autocomplete from '@mui/material/Autocomplete';

import SaveIcon from '@mui/icons-material/Save';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@material-ui/lab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const NewLicenceAdd = () => {
    const autoCompleteData = useSelector((state) => state.autoComplete);
    const user = useSelector((state) => state.account);
    const [selectedSerialNo, setSelectedSerialNo] = useState();
    const [newLicence, setNewLicence] = useState('');
    const [licenceTypes, setLicenceTypes] = useState([]);
    const [adminUser, setAdminUser] = useState(false);

    const [selectedLicenceType, setSelectedLicenceType] = useState('');
    const [expireDate, setExpireDate] = useState();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [adminButtonLoading, setAdminButtonLoading] = useState(false);
    const fetchLicenceTypes = () => {
        api.get(configData.API_SERVER + 'LicenceTypes/')
            .then((response) => {
                setLicenceTypes(response.data);
            })
            .catch((error) => {
                alert(error.message);
            });
    };
    const addLicenceType = async () => {
        setButtonLoading(true);
        console.log({
            Serial_Number: selectedSerialNo,
            license_type: selectedLicenceType,
            modified_by: user.email,
            expired_on: expireDate,
            added_by: user.email
        });
        try {
            const licenceExistence = await api.get(
                configData.API_SERVER + 'Licences/check/' + selectedSerialNo + '&&' + selectedLicenceType
            );

            if (licenceExistence.data[0].length == 0) {
                const res = await api.post(configData.API_SERVER + 'Licences/', {
                    Serial_Number: selectedSerialNo,
                    license_type: selectedLicenceType,
                    modified_by: user.email,
                    expired_on: expireDate,
                    added_by: user.email
                });
                console.log('added');
                console.log(res);
            } else {
                const res = await api.put(configData.API_SERVER + 'Licences/'+licenceExistence.data[0].id, {
                    
                    Serial_Number: selectedSerialNo,
                    license_type: selectedLicenceType,
                    modified_by: user.email,
                    expired_on: expireDate,
                    added_by: licenceExistence.data[0].added_by
                });
                console.log('updated');
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }

        setButtonLoading(false);
    };
    useEffect(() => {
        fetchLicenceTypes();
        api.get(configData.API_SERVER + 'Users/' + user.email).then((response) => {
            if (response.data.is_superuser) {
                setAdminUser(true);
                console.log('you are admin');
            }
        });
    }, []);
    return (
        <React.Fragment>
            <MainCard>
                <Box
                    component="form"
                    noValidate
                    autoComplete="on"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& > :not(style)': { m: 1 }
                    }}
                >
                    <Autocomplete
                        sx={{ width: 300 }}
                        options={autoCompleteData}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        onChange={(event, value) => {
                            setSelectedSerialNo(value.SerialNumber);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Serial Number"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password' // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                    <Box sx={{ width: 160 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Licence Types</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedLicenceType}
                                label="Licence Type"
                                onChange={(e) => {
                                    setSelectedLicenceType(e.target.value);
                                }}
                            >
                                {licenceTypes.map((elem) => (
                                    <MenuItem value={elem.LicenceType}>{elem.LicenceType}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="EXPIRE DATE"
                            value={expireDate}
                            minDate={new Date()}
                            onChange={(newValue) => {
                                setExpireDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        loading={buttonLoading}
                        startIcon={<SaveIcon />}
                        variant="contained"
                        onClick={addLicenceType}
                    >
                        ADD
                    </LoadingButton>
                    <Box sx={{ paddingLeft: 20 }}>
                        <TextField
                            value={newLicence}
                            label="Add New Licence"
                            onChange={(e) => {
                                setNewLicence(e.target.value);
                            }}
                        />
                    </Box>
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        loading={adminButtonLoading}
                        startIcon={<SaveIcon />}
                        variant="contained"
                    >
                        ADD NEW LICENCE
                    </LoadingButton>
                </Box>
            </MainCard>
        </React.Fragment>
    );
};
export default NewLicenceAdd;
