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

export default function MyCCIAPIData({ data }) {
    return (
        <Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    ID
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data._id || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Company Id
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.companyId || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Hardware Id
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.hardwareId || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Hardware Version Id
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.hardwareVersionId || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    HW Supplier
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.hwSupplier || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Serial Number
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.serialNumber || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    IMEI
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.imei || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    ICC ID
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.iccID || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Scrapped
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.scrapped ? 'true' : 'false'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Manufacturer Article No
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.manufacturerArticleNo || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Production Date
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.productionDate || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Latitude
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.latitude || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Longitude
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.longitude || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Geoposition Country
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.geoPositionCountry || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Geoposition Country
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.geoPositionCountryName || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Geoposition Admin Code
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.geoPositionAdminCode || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Geoposition FixMode
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.geoPositionFixMode || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    GeoPosition Satellite Count
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.geoPositionSatelliteCount || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Geoposition Height
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.geoPositionHeight || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Geoposition Heading
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.geoPositionHeading || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Geoposition Admin Code ASCII
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.geoPositionAdminCodeAscii || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Geoposition Update Date
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.geoPositionUpdateDate || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Machine Serial No
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.machineSerialNo || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Machine Name Series
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.machineNameSeries || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Machine Prooduction Year
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.machineProductionYear || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Machine Update Date
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.machineUpdateDate || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Software Configuration
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.softwareConfiguration || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Last Time Online
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.lastTimeOnline || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Bridge Custom Topics
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.bridgeCustomTopics || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Last Software Update Date
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.lastSoftwareUpdateDate || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Last Software Changed Date
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.lastSoftwareUpdaterChangedDate || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Assigned Pending Bundle
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.assignedPendingBundle || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Approved Bundle Download
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.approvedBundleDownload || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Approved Bundle
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.approvedBundle || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Approved Bundle Installation
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.approvedBundleInstallation || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Installed Bundle
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.installedBundle || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Canlogger Status Can IF0
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.canloggerStatusCanIf0 || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Canlogger Status Can IF1
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.canloggerStatusCanIf1 || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Last Signal Strength
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.lastSignalStrength || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Last Connection Technology
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.lastConnectionTechnology || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Last Operator Name
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.lastOperatorName || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Last Connection Update Time
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.lastConnectionUpdateTime || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Last Modified
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.lastModified || 'null'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" component="div" color="#212b36">
                    Creation Time
                </Typography>

                <Typography variant="body2" color="#637381">
                    {data.creationTime || 'null'}
                </Typography>
            </Box>
            {data.simcardStatistics.map((elem) => (
                <Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            SIM Card Statistics ( Sum Usage )
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {elem.sumUsage || 'null'}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            SIM Card Statistics ( Month )
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {elem.month || 'null'}
                        </Typography>
                    </Box>
                </Box>
            ))}
            {data.simcardStatisticsToday.map((elem) => (
                <Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            SIM Card Statistics  ( Today Sum Usage )
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {elem.todayDataUsage || 'null'}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            SIM Card Statistics ( Today )
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {elem.today || 'null'}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
