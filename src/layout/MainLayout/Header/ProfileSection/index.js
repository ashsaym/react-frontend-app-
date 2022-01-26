import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import configData from '../../../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core';
import ListItemButton from '@material-ui/core/ListItemButton';

// third-party
import axios from 'axios';
import cookieCutter from 'cookie-cutter';

// project imports
import { LOGOUT } from './../../../../store/actions';

// assets
import { IconLogout } from '@tabler/icons';

// style const
const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        maxWidth: '350px',
        minWidth: '300px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            minWidth: '100%'
        }
    },
    headerAvatar: {
        cursor: 'pointer',
        ...theme.typography.mediumAvatar,
        margin: '8px 0 8px 8px !important'
    },
    profileChip: {
        height: '48px',
        alignItems: 'center',
        borderRadius: '27px',
        transition: 'all .2s ease-in-out',
        borderColor: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.light,
        '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: theme.palette.primary.main + '!important',
            color: theme.palette.primary.light,
            '& svg': {
                stroke: theme.palette.primary.light
            }
        }
    },
    profileLabel: {
        lineHeight: 0,
        padding: '12px'
    },
    listItem: {
        marginTop: '5px'
    },
    cardContent: {
        padding: '16px !important'
    },
    card: {
        backgroundColor: theme.palette.primary.light,
        marginBottom: '16px',
        marginTop: '16px'
    },
    searchControl: {
        width: '100%',
        paddingRight: '8px',
        paddingLeft: '16px',
        marginBottom: '16px',
        marginTop: '16px'
    },
    startAdornment: {
        fontSize: '1rem',
        color: theme.palette.grey[500]
    },
    flex: {
        display: 'flex'
    },
    name: {
        marginLeft: '2px',
        fontWeight: 400
    },
    ScrollHeight: {
        height: '100%',
        maxHeight: 'calc(100vh - 250px)',
        overflowX: 'hidden'
    },
    badgeWarning: {
        backgroundColor: theme.palette.warning.dark,
        color: '#fff'
    }
}));

//-----------------------|| PROFILE MENU ||-----------------------//

const ProfileSection = () => {
    const classes = useStyles();

    const customization = useSelector((state) => state.customization);
    const account = useSelector((state) => state.account);
    const dispatcher = useDispatch();

    const [selectedIndex] = React.useState(1);

    const [open] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleLogout = () => {
        console.log(account.token);
        axios
            .post( configData.API_SERVER + 'accounts/logout/', {token: `${account.token}`}, { headers: { Authorization: `${account.token}` } })
            .then(function (response) {

                // Force the LOGOUT
                //if (response.data.success) {
                    cookieCutter.set('is_admin', '', { expires: new Date(0) })
                    dispatcher({ type: LOGOUT });
                //} else {
                //    console.log('response - ', response.data.msg);
                //}
            })
            .catch(function (error) {
                console.log('error - ', error);
            });
    };
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    return (
        <React.Fragment>
            <Typography>
                <ListItemButton
                    className={classes.listItem}
                    sx={{ borderRadius: customization.borderRadius + 'px' }}
                    selected={selectedIndex === 4}
                    onClick={handleLogout}
                >
                    <ListItemIcon>
                        <IconLogout stroke={1.5} size="1.5rem" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                </ListItemButton>
            </Typography>

        </React.Fragment>
    );
};

export default ProfileSection;
