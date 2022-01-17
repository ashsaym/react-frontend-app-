import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';
import logo from '../assets/images/logo.svg';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from './../../assets/images/logo-dark.svg';
 * import logo from './../../assets/images/logo.svg';
 *
 */

//-----------------------|| LOGO SVG ||-----------------------//

const Logo = () => {
    useTheme();
    return (<img src={logo} alt="Berry" width="180" />);
};

export default Logo;
