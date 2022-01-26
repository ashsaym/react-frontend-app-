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

export default function DataGridAPI({ loadNewData }) {
    const [users, setUsers] = useState([]);
    
    const getUsersData = async () => {
        api.get(configData.API_SERVER + 'Users/')
            .then((res) => {
                setUsers(res.data.results);
         
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        getUsersData();
    }, []);

    useEffect(() => {
        getUsersData();
    }, [loadNewData]);

    const columns = [
        // {
        //     field: 'Edit',
        //     headerName: 'Edit',
        //     sortable: false,
        //     width: 100,
        //     headerAlign: 'center',
        //     align: 'center',
        //     renderCell: (params) => {
        //         return (
        //             <IconButton color="primary" onClick={() => {}}>
        //                 <EditIcon />
        //             </IconButton>
        //         );
        //     }
        // },

        {
            field: 'email',
            headerName: 'Email',
            headerAlign: 'center',
            width: 180
        },
        {
            field: 'is_staff',
            headerName: 'Is Staff',
            sortable: true,
            align: 'center',
            headerAlign: 'center',
            width: 100
        },
        {
            field: 'is_superuser',
            headerName: 'Is Admin',
            sortable: true,
            align: 'center',
            headerAlign: 'center',
            width: 100
        },
        {
            field: 'is_seller',
            headerName: 'Is Seller',
            sortable: true,
            align: 'center',
            headerAlign: 'center',
            width: 100
        },
        {
            field: 'is_external',
            headerName: 'Is External',
            sortable: true,
            align: 'center',
            headerAlign: 'center',
            width: 100
        },
        {
            field: 'is_active',
            headerName: 'Is Active',
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            width: 100
        },
        {
            field: 'date_joined',
            headerName: 'Date Joined',
            align: 'center',
            headerAlign: 'center',
            width: 200
        },
        {
            field: 'last_login',
            headerName: 'Last Login',
            align: 'center',
            headerAlign: 'center',
            width: 200
        },
        {
            field: 'groups',
            headerName: 'Groups',
            sortable: true,
            align: 'center',
            headerAlign: 'center',
            width: 160
        },

        {
            field: 'user_permissions',
            headerName: 'User Permissions',
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            width: 200
        }
    ];

    return (
        <div>
            <DataGrid autoHeight rows={users} columns={columns} pageSize={20} rowsPerPageOptions={[20]} getRowId={(row) => row.email} />
        </div>
    );
}
