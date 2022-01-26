import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import configData from '../../config';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { fabClasses, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../utils/api';
import { store } from '../../store';

import { Button, Box } from '@mui/material';
import { TextField } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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

export default function DataGridAPI({ loadNewData, tableDataWithAutocomplete, selectedSerialNo }) {
    const history = useHistory();
    const [tableData, setTableData] = useState([]);
    const [tableDataCache, setTableDataCache] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedLicence, setSelectedLicence] = useState({ comments: '' });
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [licenceTypes, setLicenceTypes] = useState([]);
    const [submitted, setSubmitted] = useState('');
    const [adminUser, setAdminUser] = useState(false);
    const account = useSelector((state) => state.account);
    const [successfullyAdded, setSuccessfullyAdded] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right'
    });
    const { vertical, horizontal } = successfullyAdded;

    const [addedFail, setAddedFail] = useState(false);

    //choosing Table data
    useEffect(() => {
        if (selectedSerialNo) {
            if (selectedSerialNo.SerialNumber.length > 0) {
                setTableData(tableDataWithAutocomplete);
            } else {
                setTableData(tableDataCache);
            }
        } else {
            setTableData(tableDataCache);
        }
    }, [tableDataWithAutocomplete, selectedSerialNo]);

    useEffect(() => {
        api.get(configData.API_SERVER + 'Licences/').then((response) => {
            setTableDataCache(response.data.results);
        });
        const user = store.getState().account;
        api.get(configData.API_SERVER + 'Users/check/' + user.email).then((response) => {
            if (response.data[0].is_superuser) {
                setAdminUser(true);
                console.log('you are admin');
            }
        });
        fetchLicenceTypes();
    }, []);
    useEffect(() => {
        api.get(configData.API_SERVER + 'Licences/').then((response) => setTableData(response.data.results));
    }, [submitted, loadNewData]);
    const saveLicenceData = async () => {
        const user = store.getState().account;

        try {
            const res = await api.put(configData.API_SERVER + 'Licences/' + selectedLicence.id + '/', {
                expired: selectedLicence.expired,
                license_type: selectedLicence.license_type,
                Serial_Number: selectedLicence.Serial_Number,
                comments: selectedLicence.comments,
                expired_on: new Date(selectedLicence.expired_on),
                added_by: selectedLicence.added_by,
                modified_by: user.email
            });
      
            console.log('updated');
            setSubmitted((prev) => prev + 'a');
            setSuccessfullyAdded((prev) => ({ ...prev, open: true }));
        } catch (err) {
            console.log(err);
            setAddedFail(true);
        }
        setShowDialog(false);
    };
    const fetchLicenceTypes = () => {
        api.get(configData.API_SERVER + 'LicenceTypes/')
            .then((response) => {
             
                setLicenceTypes(response.data.results);
            })
            .catch((error) => {
                alert(error.message);
            });
    };
    const deleteHandler = async () => {
        setSubmitted((prev) => prev + 'a');
        try {
            const res = await api.delete(configData.API_SERVER + 'Licences/' + selectedLicence.id + '/');
            console.log('successfully deleted');
        } catch (err) {
            console.error(err.message);
        }
        setShowAlertDialog(false);
    };

    const columns = [
        {
            field: 'Edit',
            headerName: 'Edit',
            sortable: false,
            width: 100,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <IconButton
                        color="primary"
                        onClick={() => {
                            setSelectedLicence(params.row);

                            setShowDialog(true);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                );
            }
        },

        {
            field: 'Serial_Number',
            headerName: 'Serial Number',
            width: 150,
            renderCell: (params) => {
                return <Link to={'/details/' + params.row.Serial_Number}>{params.row.Serial_Number}</Link>;
            }
        },
        {
            field: 'expired',
            headerName: 'Expired',
            width: 80
        },
        {
            field: 'license_type',
            headerName: 'Type',
            width: 80
        },
        {
            field: 'expired_on',
            headerName: 'Expired On',
            sortable: true,
            width: 180
        },

        {
            field: 'comments',
            headerName: 'Comments',
            sortable: false,
            width: 100
        },
        {
            field: 'updated_on',
            headerName: 'Last Updated',
            sortable: true,
            width: 180
        },
        {
            field: 'modified_by',
            headerName: 'Updated by',
            sortable: true,
            width: 200
        },
        {
            field: 'created_on',
            headerName: 'Created On',
            sortable: true,
            width: 180
        },
        {
            field: 'added_by',
            headerName: 'Creator',
            sortable: true,
            width: 200
        },
        {
            field: 'LicenceCode',
            headerName: 'Code',
            sortable: false,
            width: 300
        }
    ];

    return (
        <div style={{ height: 1200, width: 'auto' }}>
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
                anchorOrigin={{ vertical, horizontal }}
                open={addedFail}
                autoHideDuration={6000}
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
                open={showDialog}
                onClose={() => {
                    setShowDialog(false);
                }}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    {' '}
                    <h2>Edit Licence</h2>{' '}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ width: 400, marginTop: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Expired</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Licence Type"
                                value={selectedLicence.expired}
                                onChange={(e) => {
                                    setSelectedLicence((prevData) => {
                                        return { ...prevData, expired: e.target.value };
                                    });
                                }}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ width: 400, marginTop: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Licence Types</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedLicence.license_type}
                                label="Licence Type"
                                onChange={(e) => {
                                    setSelectedLicence((prevData) => {
                                        return { ...prevData, license_type: e.target.value };
                                    });
                                }}
                            >
                                {licenceTypes.map((elem) => (
                                    <MenuItem value={elem.LicenceType}>{elem.LicenceType}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="EXPIRE DATE"
                                value={selectedLicence.expired_on}
                                minDate={new Date()}
                                onChange={(newValue) => {
                                    console.log(newValue);
                                    console.log(selectedLicence.expired_on);
                                    setSelectedLicence((prevData) => {
                                        return { ...prevData, expired_on: newValue };
                                    });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>

                    <TextField
                        sx={{ width: 400, marginTop: 3 }}
                        label="Comments"
                        value={selectedLicence.comments}
                        onChange={(e) => {
                            setSelectedLicence((prevData) => {
                                return { ...prevData, comments: e.target.value };
                            });
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    {adminUser && (
                        <Button
                            color="error"
                            variant="contained"
                            onClick={() => {
                                setShowDialog(false);
                                setShowAlertDialog(true);
                            }}
                        >
                            Delete
                        </Button>
                    )}
                    <Button onClick={saveLicenceData}>Save</Button>
                    <Button
                        onClick={() => {
                            setShowDialog(false);
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={showAlertDialog}
                keepMounted
                onClose={() => {
                    setShowAlertDialog(false);
                }}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    {' '}
                    <h2>Are you Sure you want to delete?</h2>{' '}
                </DialogTitle>

                <DialogActions>
                    <Button
                        onClick={() => {
                            setShowAlertDialog(false);
                        }}
                    >
                        No
                    </Button>
                    <Button color="error" onClick={deleteHandler}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <DataGrid rows={tableData} columns={columns} pageSize={20} rowsPerPageOptions={[20]} />
        </div>
    );
}
