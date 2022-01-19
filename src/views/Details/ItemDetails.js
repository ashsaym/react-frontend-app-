import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import env from 'react-dotenv';
import '../../assets/scss/DetailsPage/style.scss';



export default function ItemDetails() {
  
    const { SerialNumber } = useParams();
    useEffect(() => {
        console.log(process.env);
    });
    return (
        <div className="detailsPage">
            <div className="detailsPage-title">Details Page</div>
            <div className="detailsPage-data">
                <Card sx={{ maxWidth: 500 }}>
                    <CardContent>
                        <Typography sx={{ marginBottom: 4 }} gutterBottom variant="h2" component="div" color="#212b36" >
                            Licence Details
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 500 }}>
                    <CardContent>
                        <Typography sx={{ marginBottom: 4 }} gutterBottom variant="h2" component="div" color="#212b36">
                            History
                        </Typography>
                        <Box>
                            <Typography gutterBottom variant="h4" component="div" color="#212b36">
                                Created On
                            </Typography>
                            <Typography variant="body2" color="#637381">
                                12 Feb 2021
                            </Typography>
                            <Typography variant="body2" color="#637381">
                                something@something.com
                            </Typography>
                        </Box>
                        <Box sx={{ marginTop: 3 }}>
                            <Typography gutterBottom variant="h4" component="div" color="#212b36">
                                Updated on
                            </Typography>
                            <Typography variant="body2" color="#637381">
                                12 Feb 2021
                            </Typography>
                            <Typography variant="body2" color="#637381">
                                something@something.com
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
