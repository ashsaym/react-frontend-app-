import React, { useEffect, useState } from 'react';

// material-ui
import { Grid} from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import DataGridAPI from './DataGridAPI'
import { gridSpacing } from '../../store/constant';
import NewLicenceAdd from './NewLicenceAdd'


const Licences = () => {
    const [isLoading, setLoading] = useState(true);
    const [loadNewData,setLoadNewData] = useState('')
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <MainCard >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <NewLicenceAdd setLoadNewData={setLoadNewData}/>
                        </Grid>
                        <Grid item lg={12} md={12} sm={2} xs={12}>
                            <DataGridAPI loadNewData={loadNewData}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Licences;
