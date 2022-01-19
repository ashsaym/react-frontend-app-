import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import configData from '../../config';
import api from '../../utils/api';
import { store } from '../../store';
import { settingLabels } from '../../store/actions';

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
    const dispatch = useDispatch();
    const autoCompleteData = useSelector((state) => state.autoComplete);
    //  const [autoCompleteData, setAutoCompleteData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [autoCompleteShow, setAutoCompleteShow] = useState(false);

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
    const addNewLicence = async () => {
        const user = store.getState().account;

        setButtonLoading(true);
      
        try {
            const licenceExistence = await api.get(
                configData.API_SERVER + 'Licences/check/type/' + selectedSerialNo + '&&' + selectedLicenceType
            );

            if (licenceExistence.data.length == 0) {
                const res = await api.post(configData.API_SERVER + 'Licences/', {
                    Serial_Number: selectedSerialNo,
                    license_type: selectedLicenceType,
                    modified_by: user.email,
                    expired_on: expireDate,
                    added_by: user.email
                });
                console.log('added');
            } else {
                const res = await api.put(configData.API_SERVER + 'Licences/' + licenceExistence.data[0].id + '/', {
                    Serial_Number: selectedSerialNo,
                    license_type: selectedLicenceType,
                    modified_by: user.email,
                    expired_on: expireDate,
                    added_by: licenceExistence.data[0].added_by
                });
                console.log('updated');
            }
        } catch (error) {
            console.log(error);
        }

        setButtonLoading(false);
    };

    const addNewLicenceType = () => {
        setAdminButtonLoading(true);
        const user = store.getState().account;
        api.post(configData.API_SERVER + 'LicenceTypes/', {
            LicenceType: newLicence,
            added_by: user.email
        })
            .then((res) => {
                console.log('added new Licence');
            })
            .catch((err) => {
                console.error(err);
            });
        setAdminButtonLoading(false);
    };
    useEffect(() => {
        fetchLicenceTypes();
        const user = store.getState().account;
        api.get(configData.API_SERVER + 'Users/check/' + user.email).then((response) => {
            if (response.data[0].is_superuser) {
                setAdminUser(true);
                console.log('you are admin');
            }
        });

        // const state = store.getState();
        // setAutoCompleteData(state.autoComplete);
    }, []);

    useEffect(() => {
        // api.get(configData.API_SERVER + 'MyCCIs/').then((response) => {
        //     var usuableData = response.data;
        //     settingLabels(usuableData, dispatch);
        //     const state = store.getState();
        //     setAutoCompleteData(state.autoComplete);
        // });
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
                        open={autoCompleteShow}
                        filterSelectedOptions
                        sx={{ width: 300 }}
                        options={autoCompleteData}
                        inputValue={inputValue}
                        onInputChange={(event, value) => {
                            setInputValue(value);

                            if (value.length > 2) {
                                setAutoCompleteShow(true);
                            }
                        }}
                        onClose={() => setAutoCompleteShow(false)}
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
                                    ...params.inputProps
                                    //  autoComplete: 'new-password' // disable autocomplete and autofill
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
                        onClick={addNewLicence}
                    >
                        ADD
                    </LoadingButton>

                    {adminUser && (
                        <Box sx={{ paddingLeft: 20 }}>
                            <TextField
                                value={newLicence}
                                label="Add New Licence"
                                onChange={(e) => {
                                    setNewLicence(e.target.value);
                                }}
                            />
                        </Box>
                    )}
                    {adminUser && (
                        <LoadingButton
                            color="secondary"
                            loadingPosition="start"
                            loading={adminButtonLoading}
                            startIcon={<SaveIcon />}
                            variant="contained"
                            onClick={addNewLicenceType}
                        >
                            ADD NEW LICENCE TYPE
                        </LoadingButton>
                    )}
                </Box>
            </MainCard>
        </React.Fragment>
    );
};
export default NewLicenceAdd;
