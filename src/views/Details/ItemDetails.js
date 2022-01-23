import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import MyCCIDetail from './MyCCIDetiail';
import LicenceDetail from './LicenceDetails';
import MCCIAPIData from './MyCCIAPIData';
import HistoryItemDetail from './HistoryItemDetail';
import api from '../../utils/api';
import configData from '../../config';

import '../../assets/scss/DetailsPage/style.scss';

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
        <div className="detailsPage">
            <div className="detailsPage-data">
                <div className="detailsPage-data-row">
                    <Card sx={{ minWidth: 670 }}>
                        <CardContent>
                            <Typography sx={{ marginBottom: 3 }} gutterBottom variant="h2" component="div" color="#5e35b1">
                                My CCI Details
                            </Typography>
                            <MyCCIDetail data={pageData.MyCCIs} />
                        </CardContent>
                    </Card>
                    
                    <Card sx={{ minWidth: 510 }}>
                        <CardContent>
                            <Typography sx={{ marginBottom: 3 }} gutterBottom variant="h2" component="div" color="#5e35b1">
                                Licence Details
                            </Typography>
                            <LicenceDetail data={pageData.Licenses} />
                        </CardContent>
                    </Card>
                </div>
                <div className="detailsPage-data-row">
                    <Card sx={{ minWidth: 670 }}>
                        <CardContent>
                            <Typography sx={{ marginBottom: 3 }} gutterBottom variant="h2" component="div" color="#5e35b1">
                                My CCI API Data
                            </Typography>
                            <MCCIAPIData data={pageData.MyCCIsAPI} />
                        </CardContent>
                    </Card>
                    <div>
                        <Card sx={{ minWidth: 510 }}>
                            <CardContent>
                                <Typography sx={{ marginBottom: 1 }} gutterBottom variant="h2" component="div" color="#5e35b1">
                                    History
                                </Typography>
                                <HistoryItemDetail data={pageData.Licenses} dataType="Licenses" />
                                <HistoryItemDetail data={pageData.MyCCIs} dataType="My CCIs" />
                                <HistoryItemDetail data={pageData.Communication} dataType="Communication" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
