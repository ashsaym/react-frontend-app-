import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import configData from '../../config';
import api from '../../utils/api';
import { store } from '../../store';
import { settingLabels } from '../../store/actions';
import DeleteIcon from '@mui/icons-material/Delete';
import MainCard from './../../ui-component/cards/MainCard';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewLicenceAdd = ({
    setLoadNewData,
    setTableDataWithAutocomplete,
    tableDataWithAutocomplete,
    selectedSerialNo,
    setSelectedSerialNo
}) => {
    const dispatch = useDispatch();
    const autoCompleteData = useSelector((state) => state.autoComplete);

    //  const [autoCompleteData, setAutoCompleteData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [autoCompleteValue, setAutoCompleteValue] = useState();
    const [autoCompleteShow, setAutoCompleteShow] = useState(false);

    const [newLicence, setNewLicence] = useState('');
    const [licenceTypes, setLicenceTypes] = useState([]);
    const [interactiveLicenceTypes, setInteractiveLicenceTypes] = useState([]);
    const [editLicence, setEditLicence] = useState([]);
    const [licenceTypeEdited, setLicenceTypeEdited] = useState([]);
    const [newLicenceTypes, setNewLicenceTypes] = useState([]);
    const [isPrevLicenceEdited, setIsPrevLicenceEdited] = useState(false);
    const [adminUser, setAdminUser] = useState(false);

    const [selectedLicenceType, setSelectedLicenceType] = useState('');
    const [expireDate, setExpireDate] = useState();
    const [comments, setComments] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);
    const [adminButtonLoading, setAdminButtonLoading] = useState(false);
    const [showAddLicenceDialog, setShowAddLicenceDialog] = useState(false);

    const [blankState, setBlankState] = useState('');

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
                const ServerData = response.data;
                setLicenceTypeEdited([]);
                ServerData.forEach((licence) => {
                    setLicenceTypeEdited((prevData) => [...prevData, licence.LicenceType]);
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    };
    useEffect(() => {
        var temp = [];
        licenceTypes.forEach((licence, index) => {
            temp.push(false);
        });
        setEditLicence(temp);
    }, [licenceTypes]);

    const addNewLicence = async () => {
        const user = store.getState().account;

        setButtonLoading(true);

        try {
            const licenceExistence = await api.get(
                configData.API_SERVER + 'Licences/check/type/' + selectedSerialNo.SerialNumber + '&&' + selectedLicenceType
            );

            const res = await api.post(configData.API_SERVER + 'Licences/', {
                Serial_Number: selectedSerialNo.SerialNumber,
                license_type: selectedLicenceType,
                modified_by: user.email,
                expired_on: expireDate,
                added_by: user.email,
                comments: comments
            });
            console.log('added');
            setLoadNewData((prev) => prev + 'a');
            setSuccessfullyAdded((prev) => ({ ...prev, open: true }));
            setSelectedSerialNo();
            setInputValue('');
            setComments('');
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
                setShowAddLicenceDialog(false);
                setNewLicence('');
                setSuccessfullyAdded((prev) => ({ ...prev, open: true }));
            })
            .catch((err) => {
                console.error(err);
                setAddedFail(true);
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

    //fetch table data with selcted Autocomplete value

    const fetchTableDataWithSelectedAutoCompleteValue = async () => {
        api.get(configData.API_SERVER + 'Licences/check/' + selectedSerialNo.SerialNumber)
            .then((res) => {
                setTableDataWithAutocomplete(res.data);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchInteractiveLicenceType = () => {
        if (selectedSerialNo != null) {
            api.get(configData.API_SERVER + 'Licences/check/' + selectedSerialNo.SerialNumber)
                .then((res) => {
                    var temp = [];
                    var temp2 = [];
                    var flag = false;

                    res.data.forEach((elem) => {
                        if (elem.license_type) {
                            temp.push(elem.license_type);
                        }
                    });

                    licenceTypes.forEach((licence) => {
                        temp.forEach((elem) => {
                            if (elem === licence.LicenceType) {
                                flag = true;
                            }
                        });
                        if (!flag) {
                            temp2.push(licence);
                        }
                        flag = false;
                    });

                    setInteractiveLicenceTypes(temp2);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setInteractiveLicenceTypes([]);
        }
    };
    useEffect(() => {
        fetchTableDataWithSelectedAutoCompleteValue();

        fetchInteractiveLicenceType();
    }, [selectedSerialNo]);

    useEffect(() => {
        fetchLicenceTypes();
    }, [successfullyAdded, blankState]);

    useEffect(() => {
        setIsPrevLicenceEdited(true);
    }, [licenceTypeEdited]);

    //disabled text fields
    const [disabledTextField, setDisabledTextField] = useState(true);

    useEffect(() => {
        if (interactiveLicenceTypes.length > 0) {
            setDisabledTextField(false);
        } else {
            setDisabledTextField(true);
        }
    }, [interactiveLicenceTypes]);

    const deleteLicenceTypes = (licenceType) => {
        api.delete(configData.API_SERVER + 'LicenceTypes/' + licenceType + '/')
            .then((res) => {
                setBlankState((prevData) => prevData + ' ');
            })
            .catch((err) => {
                console.log(err);
            });
    };
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

            <Dialog
                open={showAddLicenceDialog}
                onClose={() => {
                    setShowAddLicenceDialog(false);
                }}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    {' '}
                    <h2>Add New Licence</h2>{' '}
                </DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" justifyContent="center" width={250}>
                        <Typography variant="h5" sx={{ marginBottom: 2 }}>
                            Pre-existing Licence Types
                        </Typography>
                        {licenceTypes.map((licence, index) => {
                            return (
                                <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
                                    <TextField
                                        value={licenceTypeEdited[index]}
                                        onChange={(e) => {
                                            var temp = licenceTypeEdited;
                                            temp[index] = e.target.value;

                                            setLicenceTypeEdited(temp);
                                            setBlankState((prevData) => prevData + ' ');
                                        }}
                                        disabled={!editLicence[index]}
                                    />
                                    <IconButton
                                        color="error"
                                        sx={{ marginLeft: 1 }}
                                        onClick={() => {
                                            deleteLicenceTypes(licenceTypeEdited[index]);

                                            setBlankState((prevData) => prevData + ' ');
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    {blankState}
                                </Box>
                            );
                        })}
                        <Box>
                            <Typography variant="h5" sx={{ marginBottom: 2, marginTop: 2 }}>
                                Add new Licence Type
                            </Typography>
                            <TextField
                                value={newLicence}
                                label="Add New Licence"
                                onChange={(e) => {
                                    setNewLicence(e.target.value);
                                }}
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={addNewLicenceType}>ADD</Button>
                </DialogActions>
            </Dialog>
            <MainCard>
                <Box
                    component="form"
                    noValidate
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& > :not(style)': { m: 1 }
                    }}
                >
                    <Autocomplete
                        // open={autoCompleteShow}

                        freeSolo
                        sx={{ width: 300 }}
                        options={autoCompleteData}
                        value={selectedSerialNo}
                        onChange={(event, value) => {
                            setSelectedSerialNo(value);
                            //setAutoCompleteValue(value);
                            // if (value.SerialNumber) {
                            // }
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, value, reason) => {
                            setInputValue(value);
                        }}
                        onClose={() => setAutoCompleteShow(false)}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
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
                                disabled={disabledTextField}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedLicenceType}
                                label="Licence Type"
                                onChange={(e) => {
                                    setSelectedLicenceType(e.target.value);
                                }}
                            >
                                {interactiveLicenceTypes.map((elem) => (
                                    <MenuItem value={elem.LicenceType}>{elem.LicenceType}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            disabled={disabledTextField}
                            label="EXPIRE DATE"
                            value={expireDate}
                            minDate={new Date()}
                            onChange={(newValue) => {
                                setExpireDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    <Box>
                        <TextField
                            value={comments}
                            label="Comment"
                            onChange={(e) => {
                                setComments(e.target.value);
                            }}
                            disabled={disabledTextField}
                        />
                    </Box>

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
                        <LoadingButton
                            color="secondary"
                            loadingPosition="start"
                            loading={adminButtonLoading}
                            startIcon={<SaveIcon />}
                            variant="contained"
                            onClick={() => {
                                setShowAddLicenceDialog(true);
                            }}
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
