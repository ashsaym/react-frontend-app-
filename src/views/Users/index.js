import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

import { gridSpacing } from '../../store/constant';

import DataGridAPI from './DataGridAPI';
import NewUserForm from './NewUserForm';


const Licences = () => {

    const [loadNewData,setLoadNewData]= useState("a");

    
  
    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <NewUserForm setLoadNewData={setLoadNewData}/>
                        </Grid>
                        <Grid item lg={12} md={12} sm={2} xs={12} >
                          <DataGridAPI loadNewData={loadNewData}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Licences;
