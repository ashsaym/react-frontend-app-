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

export default function MyCCIDetail({ data }) {
    return (
        <Box>
            {data.map((elem) => (
                <Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Serial Number
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {elem.SerialNumber}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Updated On
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {elem.updated_on}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Device Name
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {elem.device_name}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Machine Serial Number
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {elem.machineSerialNo || 'null'}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Machine Name Series
                        </Typography>
                        <Typography variant="body2" color="#637381">
                            {elem.machineNameSeries || 'null'}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Machine Production Year
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {elem.machineProductionYear || 'null'}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Comments
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {elem.comments || 'null'}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Created On
                        </Typography>
                        <Typography variant="body2" color="#637381">
                            {elem.created_on || 'null'}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Scraped
                        </Typography>
                        <Typography variant="body2" color="#637381">
                            {elem.scrapped ? 'true' : 'false'}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
