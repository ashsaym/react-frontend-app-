import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import configData from '../../config';
import { useSelector } from 'react-redux';
import { fabClasses, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../utils/api';

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

export default function DataGridAPI() {
    const [tableData, setTableData] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedLicence, setSelectedLicence] = useState({ comments: '' });
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [licenceTypes, setLicenceTypes] = useState([]);
    const account = useSelector((state) => state.account);

    useEffect(() => {
        api.get(configData.API_SERVER + 'Licences/').then((response) => setTableData(response.data));

        fetchLicenceTypes();
    }, []);

    const fetchLicenceTypes = () => {
        api.get(configData.API_SERVER + '/LicenceTypes/')
            .then((response) => {
                setLicenceTypes(response.data);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const columns = [
        {
            field: 'Edit',
            headerName: 'Edit',
            sortable: false,
            width: 100,
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
            width: 150
        },
        {
            field: 'expired',
            headerName: 'Expired',
            width: 80,
            editable: true
        },
        {
            field: 'license_type',
            headerName: 'Type',
            width: 80,
            editable: true
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
            width: 100,
            editable: true
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
                                return { ...prevData, comments: e.target.data };
                            });
                        }}
                    />
                </DialogContent>
                <DialogActions>
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
                    <Button>Save</Button>
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
                    <Button color="error">Yes</Button>
                </DialogActions>
            </Dialog>
            <DataGrid rows={tableData} columns={columns} pageSize={20} rowsPerPageOptions={[20]} />
        </div>
    );
}
