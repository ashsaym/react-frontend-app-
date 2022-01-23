import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DescriptionIcon from '@mui/icons-material/Description';
import '../../assets/scss/DetailsPage/style.scss';

export default function LicenceDetails({ data }) {
    return (
        <Box>
            {data.map((elem) => (
                <Box sx={{ marginBottom: 4 }}>
                    <Typography gutterBottom variant="h4" component="div" color="#212b36">
                        License Type: {elem.license_type}
                    </Typography>

                    {elem.expired ? (
                        <Typography gutterBottom variant="h4" component="div" color="#d32f2f">
                            Expired
                        </Typography>
                    ) : (
                        <Typography gutterBottom variant="h4" component="div" color="#2e7d32">
                            Not Expired
                        </Typography>
                    )}

                    <Box sx={{ marginBottom: 1 }}>
                        <Typography gutterBottom variant="h4" component="div" color="#212b36">
                            Expire Date
                        </Typography>
                        <Typography variant="body2" color="#637381">
                            {elem.expired_on}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
