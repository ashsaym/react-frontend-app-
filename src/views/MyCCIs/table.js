import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import api from '../../utils/api';

import configData from '../../config';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'react-router-dom/es/Link';

const TableData = () => {
    const history = useHistory();
    useEffect(() => {
        getComUnits();
    }, []);
    const [ComUnits, setComUnits] = useState([]);
    const [loading, setLoading] = useState(false);

    const account = useSelector((state) => state.account);

    const getComUnits = async () => {
        try {
            const res = await api.get(configData.API_SERVER + 'MyCCIs/'); //{ headers: { Authorization: 'Token ' + account.access_token } });

            setComUnits(res.data);
            setLoading(true);
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Serial Number</TableCell>
                            <TableCell align="right">Scrapped</TableCell>
                            <TableCell align="right">Device Name</TableCell>
                            <TableCell align="right">Machine Serial No.</TableCell>
                            <TableCell align="right">Machine Name Series</TableCell>
                            <TableCell align="right">Machine Production Year</TableCell>
                            <TableCell align="right">Comments</TableCell>
                            <TableCell align="right">Last Updated</TableCell>
                            <TableCell align="right">Created On</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading &&
                            ComUnits.map((rows) => (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Link to={'details/' + rows.SerialNumber} style={{ textDecoration: 'none', color: 'blue' }}>
                                            <b>{rows.SerialNumber}</b>
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{rows.scrapped}</TableCell>
                                    <TableCell align="right">{rows.device_name}</TableCell>
                                    <TableCell align="right">{rows.machineSerialNo}</TableCell>
                                    <TableCell align="right">{rows.machineNameSeries}</TableCell>
                                    <TableCell align="right">{rows.machineProductionYear}</TableCell>
                                    <TableCell align="right">{rows.comments}</TableCell>
                                    <TableCell align="right">{rows.updated_on}</TableCell>
                                    <TableCell align="right">{rows.created_on}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
};
export default TableData;
