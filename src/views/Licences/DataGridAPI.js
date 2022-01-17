import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import configData from '../../config';
import { useSelector } from 'react-redux';

const columns = [
    {
        field: 'Serial_Number',
        headerName: 'Serial Number',
        width: 150
    },
    {
        field: 'expired',
        headerName: 'Expired',
        width: 80,
        editable: true,
    },
    {
        field: 'license_type',
        headerName: 'Type',
        width: 80,
        editable: true,
    },
    {
        field: 'expired_on',
        headerName: 'Expired On',
        sortable: true,
        width: 180,
    },

    {
        field: 'comments',
        headerName: 'Comments',
        sortable: false,
        width: 100,
        editable: true,
    },
    {
        field: 'updated_on',
        headerName: 'Last Updated',
        sortable: true,
        width: 180,
    },
    {
        field: 'modified_by',
        headerName: 'Updated by',
        sortable: true,
        width: 200,
    },
    {
        field: 'created_on',
        headerName: 'Created On',
        sortable: true,
        width: 180,
    },
    {
        field: 'added_by',
        headerName: 'Creator',
        sortable: true,
        width: 200,
    },
    {
        field: 'LicenceCode',
        headerName: 'Code',
        sortable: false,
        width: 300,
    },
];

export default function DataGridAPI() {
    const [tableData, setTableData] = useState([])
    const account = useSelector((state) => state.account);
    useEffect(() => {
        fetch(configData.API_SERVER + 'Licences/',{ headers: { "Authorization": 'Token ' + (account.token) }})
            .then((data) => data.json())
            .then((data) => setTableData(data))
    }, [])
    return (
        <div style={{ height: 1200, width: 'auto' }}>
            <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                checkboxSelection
            />
        </div>
    );
}
