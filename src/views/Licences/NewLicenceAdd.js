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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewLicenceAdd = ({ setLoadNewData }) => {
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

    const [successfullyAdded, setSuccessfullyAdded] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right'
    });
    const { vertical, horizontal } = successfullyAdded;

    const [addedFail, setAddedFail] = useState(false);
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

            const res = await api.post(configData.API_SERVER + 'Licences/', {
                Serial_Number: selectedSerialNo,
                license_type: selectedLicenceType,
                modified_by: user.email,
                expired_on: expireDate,
                added_by: user.email
            });
            console.log('added');
            setLoadNewData((prev) => prev + 'a');
            setSuccessfullyAdded((prev) => ({ ...prev, open: true }));
            setSelectedLicenceType('');

            setExpireDate(new Date());
        } catch (error) {
            console.log(error);
            setAddedFail(true);
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
                        key="10"
                        filterSelectedOptions
                        sx={{ width: 300 }}
                        options={autoCompleteData}
                        // inputValue={inputValue}
                        onInputChange={(event, value, reason) => {
                            setInputValue(value);

                            if (value.length > 1) {
                            }
                            setAutoCompleteShow(true);
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
