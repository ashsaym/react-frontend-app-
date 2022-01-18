import React from 'react';

import MainCard from './../../ui-component/cards/MainCard';
import Autocomplete from '@mui/material/Autocomplete';

import SaveIcon from '@mui/icons-material/Save';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@material-ui/lab';

const NewLicenceAdd = () => {
    return (
        <React.Fragment>
            <MainCard>
                <Box
                    component="form"
                    noValidate
                    autoComplete="on"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& > :not(style)': { m: 1 }
                    }}
                >
                    <Autocomplete
                        sx={{ width: 300 }}
                        options={countries}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option.label}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Serial Number"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password' // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                   
                    <Autocomplete
                        sx={{ width: 300 }}
                        options={countries}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        onChange={(event, value) => console.log(value)}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option.label}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Type"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password' // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                  
                    <LoadingButton color="secondary" loadingPosition="start" startIcon={<SaveIcon />} variant="contained">
                        ADD
                    </LoadingButton>
                </Box>
            </MainCard>
        </React.Fragment>
    );
};
export default NewLicenceAdd;

const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
        code: 'AE',
        label: 'United Arab Emirates',
        phone: '971'
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    {
        code: 'AG',
        label: 'Antigua and Barbuda',
        phone: '1-268'
    }
];
