import React, { useEffect, useState } from 'react';
import cookieCutter from 'cookie-cutter';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Grid } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import MyCCIDetail from './MyCCIDetiail';
import LicenceDetail from './LicenceDetails';
import MCCIAPIData from './MyCCIAPIData';
import HistoryItemDetail from './HistoryItemDetail';
import api from '../../utils/api';
import configData from '../../config';

import '../../assets/scss/DetailsPage/style.scss';
import { gridSpacing } from '../../store/constant';
import MainCard from '../../ui-component/cards/MainCard';

const is_admin = cookieCutter.get('is_admin');

export default function ItemDetails() {
    const { SerialNumber } = useParams();

    const [pageData, setPageData] = useState({
        Licenses: [],
        MyCCIs: [],
        Communication: [],
        MyCCIsAPI: { simcardStatistics: [], simcardStatisticsToday: [] }
    });
    useEffect(() => {
        api.get(configData.API_SERVER + '/Details/' + SerialNumber)
            .then((res) => {
                setPageData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={3} md={3} sm={6} xs={12}>
                            <CardContent sx={{ marginBottom: 2 }}>
                                <Typography sx={{ marginBottom: 3 }} gutterBottom variant="h2" component="div" color="#5e35b1">
                                    My CCI Details
                                </Typography>
                                <MyCCIDetail data={pageData.MyCCIs} />
                            </CardContent>
                        </Grid>
                        <Grid item sm={6} xs={12} md={3} lg={3}>
                            <CardContent sx={{ marginBottom: 2 }}>
                                <Typography sx={{ marginBottom: 3 }} gutterBottom variant="h2" component="div" color="#5e35b1">
                                    Licence Details
                                </Typography>
                                <LicenceDetail data={pageData.Licenses} />
                            </CardContent>
                        </Grid>
                        <Grid item sm={6} xs={12} md={6} lg={6}>
                            <CardContent sx={{ marginBottom: 2 }}>
                                <Typography sx={{ marginBottom: 1 }} gutterBottom variant="h2" component="div" color="#5e35b1">
                                    History
                                </Typography>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item lg={6} md={6} sm={6} xs={12}>
                                        <HistoryItemDetail data={pageData.Licenses} dataType="Licenses" />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={12}>
                                        <HistoryItemDetail data={pageData.MyCCIs} dataType="MyCCIs" />
                                        <HistoryItemDetail data={pageData.Communication} dataType="Communication Units" />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                        {is_admin && (
                            <Grid item sm={6} xs={12} md={12} lg={12}>
                                <CardContent sx={{ marginBottom: 2 }}>
                                    <Typography sx={{ marginBottom: 3 }} gutterBottom variant="h2" component="div" color="#5e35b1">
                                        MyCCI API Data
                                    </Typography>
                                    <MCCIAPIData data={pageData.MyCCIsAPI} />
                                </CardContent>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}
