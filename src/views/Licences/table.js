import * as React from 'react';
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
import { Link } from 'react-router-dom';
import NestedList from './DataGridAPI';

const TableData = () => {
    useEffect(() => {
        getComUnits();
    }, []);
    const [ComUnits, setComUnits] = useState([]);
    const [loading, setLoading] = useState(false);

    const account = useSelector((state) => state.account);

    const getComUnits = async () => {
        try {
            const res = await axios.get(configData.API_SERVER + 'Licences/'); //,{ headers: { "Authorization": 'Token ' + (account.token) }});
            console.log(res);
            setComUnits(res.data);
            setLoading(true);
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <React.Fragment>
            <NestedList />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Serial Number</TableCell>
                            <TableCell align="right">Expired</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Expired On</TableCell>
                            <TableCell align="right">Comments</TableCell>
                            <TableCell align="right">Last Updated</TableCell>
                            <TableCell align="right">Updated by</TableCell>
                            <TableCell align="right">Created On</TableCell>
                            <TableCell align="right">Creator</TableCell>
                            <TableCell align="right">Code</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading &&
                            ComUnits.map((rows) => (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Link to={'LicenceDetails/' + rows.Serial_Number} style={{ textDecoration: 'none', color: 'blue' }}>
                                            {rows.Serial_Number}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{rows.expired}</TableCell>
                                    <TableCell align="right">{rows.license_type}</TableCell>
                                    <TableCell align="right">{rows.expired_on}</TableCell>
                                    <TableCell align="right">{rows.comments}</TableCell>
                                    <TableCell align="right">{rows.updated_on}</TableCell>
                                    <TableCell align="right">{rows.modified_by}</TableCell>
                                    <TableCell align="right">{rows.created_on}</TableCell>
                                    <TableCell align="right">{rows.added_by}</TableCell>
                                    <TableCell align="right">{rows.LicenceCode}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
};
export default TableData;
