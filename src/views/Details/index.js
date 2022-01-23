import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetails from './ItemDetails';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

import { gridSpacing } from '../../store/constant';

const Details = () => {
    let { SerialNumber } = useParams();

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    return <ItemDetails />;
};

export default Details;
