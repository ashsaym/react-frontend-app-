import React from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import TableData from'./table'

//==============================|| SAMPLE PAGE ||==============================//

const MyCCIs = () => {
    return (
        <MainCard>
            <Typography variant="body2">
                <TableData />
            </Typography>
        </MainCard>
    );
};

export default MyCCIs;
