import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingOverlay = ({ isLoading }) => {
    return (
        <Backdrop open={isLoading} style={{ zIndex: 9999 }}>
            <CircularProgress color="primary" />
        </Backdrop>
    );
};

export default LoadingOverlay;