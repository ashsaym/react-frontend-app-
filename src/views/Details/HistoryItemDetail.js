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

export default function HistoryItemDetail({ data, dataType }) {
    return (
        <Box>
            <div className="detailsPage-history-subdata">
                <DescriptionIcon />
                <h2 className="detailsPage-history-subdata-title">{dataType}</h2>
            </div>
            {data.map((elem) => (
                <Box sx={{ marginBottom: 4 }}>
                    {dataType === 'Licenses' && (
                        <Typography gutterBottom variant="h4" component="div" color="#212b36">
                            License Type: {elem.license_type}
                        </Typography>
                    )}

                    <Box sx={{ marginBottom: 1 }}>
                        <Typography gutterBottom variant="h4" component="div" color="#212b36">
                            Created On
                        </Typography>
                        <Typography variant="body2" color="#637381">
                            {elem.created_on}
                        </Typography>
                        <Typography variant="body2" color="#637381">
                            {elem.added_by}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography gutterBottom variant="h4" component="div" color="#212b36">
                            Updated On
                        </Typography>
                        <Typography variant="body2" color="#637381">
                            {elem.updated_on}
                        </Typography>
                        <Typography variant="body2" color="#637381">
                            {elem.modified_by}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
