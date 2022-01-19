import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Box, ButtonBase, Card, CardContent, Grid, InputAdornment, OutlinedInput, Popper } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
import axios from 'axios';

// project imports
import Transitions from '../../../../ui-component/extended/Transitions';
import api from '../../../../utils/api';
import configData from '../../../../config';
import { store } from '../../../../store';
import { fetchAutoCompleteData } from '../../../../store/actions';
import { LOAD_AUTOCOMPLETE_DATA } from '../../../../store/actions';
import { settingLabels } from '../../../../store/actions';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';

// style constant
const useStyles = makeStyles((theme) => ({
    searchControl: {
        width: '434px',
        marginLeft: '16px',
        paddingRight: '16px',
        paddingLeft: '16px',
        '& input': {
            background: 'transparent !important',
            paddingLeft: '5px !important'
        },
        [theme.breakpoints.down('lg')]: {
            width: '250px'
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
            background: '#fff'
        }
    },
    startAdornment: {
        fontSize: '1rem',
        color: theme.palette.grey[500],
        backgroundColor: 'green',
        padding: '10px'
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        background: theme.palette.secondary.light,
        color: theme.palette.secondary.dark,
        '&:hover': {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.light
        }
    },
    closeAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        background: theme.palette.orange.light,
        color: theme.palette.orange.dark,
        '&:hover': {
            background: theme.palette.orange.dark,
            color: theme.palette.orange.light
        }
    },
    popperContainer: {
        zIndex: 1100,
        width: '99%',
        top: '-55px !important',
        padding: '0 12px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px'
        }
    },
    cardContent: {
        padding: '12px !important'
    },
    card: {
        background: '#fff',
        [theme.breakpoints.down('sm')]: {
            border: 0,
            boxShadow: 'none'
        }
    }
}));

//-----------------------|| SEARCH INPUT ||-----------------------//

const { dispatch } = store;

const SearchSection = () => {
    const history = useHistory()
    const classes = useStyles();
    const autoCompleteData = useSelector((state) => state.autoComplete);
    const [searchValue, setSearchValue] = useState('');
    const [autoCompleteShow, setAutoCompleteShow] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [responseData, setResponseData] = useState([]);
    // const [autoCompleteData, setAutoCompleteData] = useState([]);
    const dispatch = useDispatch();
    const checkingUniqueData = (label, data) => {
        data.forEach((elem) => {
            if (elem.label == label) {
                return false;
            }
        });
        return true;
    };

    // const settingLabels = (data) => {
    //     data.forEach((elem) => {
    //         if (elem.SerialNumber) {
    //             var temp = { label: elem.SerialNumber, SerialNumber: elem.SerialNumber };
    //             if (checkingUniqueData(elem.SerialNumber, autoCompleteData)) {
    //                 setAutoCompleteData((prevData) => [...prevData, temp]);
    //             }
    //         }
    //         if (elem.device_name) {
    //             var temp = { label: elem.device_name, SerialNumber: elem.SerialNumber };
    //             if (checkingUniqueData(elem.SerialNumber, autoCompleteData)) {
    //                 setAutoCompleteData((prevData) => [...prevData, temp]);
    //             }
    //         }
    //         if (elem.machineSerialNo) {
    //             var temp = { label: elem.machineSerialNo, SerialNumber: elem.SerialNumber };
    //             if (checkingUniqueData(elem.SerialNumber, autoCompleteData)) {
    //                 setAutoCompleteData((prevData) => [...prevData, temp]);
    //             }
    //         }
    //     });
    // };
    useEffect(() => {
        // api.get(configData.API_SERVER + 'MyCCIs/').then((response) => {
        //     setResponseData(response.data);
        //     var usuableData = response.data;
        //     settingLabels(usuableData, dispatch);
        // });
        // const state = store.getState();
        // setAutoCompleteData(state.autoComplete);
    }, []);

    return (
        <React.Fragment>
            <Autocomplete
                open={autoCompleteShow}
                className={classes.searchControl}
                inputValue={inputValue}
                onInputChange={(event, value) => {
                    //   console.log(value);
                    setInputValue(value);
                    if (value.length > 2) {
                        setAutoCompleteShow(true);
                    }
                }}
                onClose={() => setAutoCompleteShow(false)}
                id="country-select-demo"
                sx={{ width: 300 }}
                options={autoCompleteData}
                autoHighlight
                onChange={(event, value) => {
                    setSearchValue(value);
               
                    history.push('/details/' + value.SerialNumber)
                }}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password' // disable autocomplete and autofill
                        }}
                    />
                )}
            />

            <IconButton edge="start" size="large" color="primary" aria-label="search serial number" component="span">
                <SearchIcon fontSize="large" />
            </IconButton>
            {/* <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <React.Fragment>
                            <Box
                                sx={{
                                    ml: 2
                                }}
                            >
                                <ButtonBase sx={{ borderRadius: '12px' }}>
                                    <Avatar variant="rounded" className={classes.headerAvatar} {...bindToggle(popupState)}>
                                        <IconSearch stroke={1.5} size="1.2rem" />
                                    </Avatar>
                                </ButtonBase>
                            </Box>
                            <Popper {...bindPopper(popupState)} transition className={classes.popperContainer}>
                                {({ TransitionProps }) => (
                                    <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                                        <Card className={classes.card}>
                                            <CardContent className={classes.cardContent}>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item xs>
                                                        <OutlinedInput
                                                            className={classes.searchControl}
                                                            id="input-search-header"
                                                            value={value}
                                                            onChange={(e) => setValue(e.target.value)}
                                                            // placeholder="Search"
                                                            startAdornment={
                                                                <InputAdornment position="start">
                                                                    <IconSearch
                                                                        stroke={1.5}
                                                                        size="1rem"
                                                                        className={classes.startAdornment}
                                                                    />
                                                                </InputAdornment>
                                                            }
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <ButtonBase sx={{ borderRadius: '12px' }}>
                                                                        <Avatar variant="rounded" className={classes.headerAvatar}>
                                                                            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                                                                        </Avatar>
                                                                    </ButtonBase>
                                                                    <Box
                                                                        sx={{
                                                                            ml: 2
                                                                        }}
                                                                    >
                                                                        <ButtonBase sx={{ borderRadius: '12px' }}>
                                                                            <Avatar
                                                                                variant="rounded"
                                                                                className={classes.closeAvatar}
                                                                                {...bindToggle(popupState)}
                                                                            >
                                                                                <IconX stroke={1.5} size="1.3rem" />
                                                                            </Avatar>
                                                                        </ButtonBase>
                                                                    </Box>
                                                                </InputAdornment>
                                                            }
                                                            aria-describedby="search-helper-text"
                                                            inputProps={{
                                                                'aria-label': 'weight'
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Transitions>
                                )}
                            </Popper>
                        </React.Fragment>
                    )}
                </PopupState>
            </Box> */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                {/* <Autocomplete sx={{ width: 300 }}
                
                /> */}
                {/* <OutlinedInput
                    className={classes.searchControl}
                    id="input-search-header"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch stroke={1.5} size="1rem" className={classes.startAdornment} />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <ButtonBase sx={{ borderRadius: '12px' }}>
                                <Avatar variant="rounded" className={classes.headerAvatar}>
                                    <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                                </Avatar>
                            </ButtonBase>
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{
                        'aria-label': 'weight'
                    }}
                /> */}
            </Box>
        </React.Fragment>
    );
};

export default SearchSection;

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

const machineData = [
    {
        SerialNumber: '23710594159633',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_23710594159633',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '23710594159636',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_23710594159636',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '23710594159741',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_23710594159741',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '23710597319432',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_23710597319432',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '23710597319448',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_23710597319448',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '23710597319450',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_23710597319450',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '23710597319473',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_23710597319473',
        machineSerialNo: '1',
        machineNameSeries: 'Test CU Henning',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24084505155562',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24084505155562',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24084505155566',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24084505155566',
        machineSerialNo: '486371',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24084505238039',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24084505238039',
        machineSerialNo: '486354',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24084505238040',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24084505238040',
        machineSerialNo: '486363',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24084505238051',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24084505238051',
        machineSerialNo: '486354 oder 486373',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24084505238091',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24084505238091',
        machineSerialNo: '486354 oder 486373',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24084505238110',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24084505238110',
        machineSerialNo: '487620',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24084505238124',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24084505238124',
        machineSerialNo: '486356',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24084505238126',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24084505238126',
        machineSerialNo: '486355',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24084505238128',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24084505238128',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24084505238178',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24084505238178',
        machineSerialNo: '486374',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24084505238180',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24084505238180',
        machineSerialNo: '486364',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24084505238244',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24084505238244',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24084505238302',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24084505238302',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812460',
        updated_on: '14 January 2022 (11:33)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812460',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:33)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812466',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812466',
        machineSerialNo: '489359',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812485',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812485',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812494',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812494',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812506',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812506',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812509',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812509',
        machineSerialNo: 'A121 038108',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812510',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812510',
        machineSerialNo: '123456',
        machineNameSeries: 'TEST ECU neusta',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812513',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812513',
        machineSerialNo: '492777',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812519',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812519',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812523',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812523',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812530',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812530',
        machineSerialNo: '490914',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812532',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812532',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812533',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812533',
        machineSerialNo: '491019',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812535',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812535',
        machineSerialNo: '489709',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812538',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812538',
        machineSerialNo: '489709',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812546',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812546',
        machineSerialNo: '486357',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812554',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812554',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812555',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812555',
        machineSerialNo: '123456',
        machineNameSeries: 'TEST CU Grimm',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812556',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812556',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812560',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812560',
        machineSerialNo: '490545',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812573',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812573',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812575',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812575',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812584',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812584',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812587',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812587',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812589',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812589',
        machineSerialNo: '490544',
        machineNameSeries: 'iQblue connect',
        machineProductionYear: '2021',
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812597',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812597',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812613',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812613',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410514812615',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410514812615',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410515446456',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515446456',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410515446522',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515446522',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410515487069',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515487069',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410515487084',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515487084',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410515487087',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515487087',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410515487248',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515487248',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410515487320',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515487320',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410515533813',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515533813',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410515533826',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515533826',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410515533829',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515533829',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410515533834',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515533834',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410515533890',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515533890',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410515533911',
        updated_on: '14 January 2022 (11:34)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515533911',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:34)',
        scrapped: false
    },
    {
        SerialNumber: '24410515533929',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515533929',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    },
    {
        SerialNumber: '24410515533941',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515533941',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    },
    {
        SerialNumber: '24410515533988',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515533988',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    },
    {
        SerialNumber: '24410515534017',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515534017',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    },
    {
        SerialNumber: '24410515534076',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515534076',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    },
    {
        SerialNumber: '24410515534100',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515534100',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    },
    {
        SerialNumber: '24410515534127',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515534127',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    },
    {
        SerialNumber: '24410515534134',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515534134',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    },
    {
        SerialNumber: '24410515534141',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515534141',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    },
    {
        SerialNumber: '24410515534159',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515534159',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    },
    {
        SerialNumber: '24410515534165',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515534165',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    },
    {
        SerialNumber: '24410515534168',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515534168',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    },
    {
        SerialNumber: '24410515534169',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515534169',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    },
    {
        SerialNumber: '24410515534193',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515534193',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    },
    {
        SerialNumber: '24410515534195',
        updated_on: '14 January 2022 (11:35)',
        device_name: 'lemken_actia_tgu-r-4g-eu_24410515534195',
        machineSerialNo: null,
        machineNameSeries: null,
        machineProductionYear: null,
        comments: null,
        created_on: '14 January 2022 (11:35)',
        scrapped: false
    }
];
