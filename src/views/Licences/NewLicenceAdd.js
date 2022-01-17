import React from 'react';

import MainCard from './../../ui-component/cards/MainCard';

import SaveIcon from '@mui/icons-material/Save';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@material-ui/lab';

const NewLicenceAdd = () => {

    return (
        <React.Fragment>
                <MainCard>
                    <Box component="form" noValidate autoComplete="on"sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& > :not(style)': { m: 1 },
                    }}>
                        <TextField label="Serial Number" />
                        <TextField label="Type" />
                        <LoadingButton
                            color="secondary"
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                        >
                            ADD
                        </LoadingButton>
                    </Box>
                </MainCard>
        </React.Fragment>
    );
};
export default NewLicenceAdd;
