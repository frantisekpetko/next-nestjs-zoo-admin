'use client';

import { FC } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const BackButton: FC = () => {
    const router = useRouter();

    return (
        <div className="fixed top-[80px] ml-2 z-[1000]">
            <Button
                className="relative flex justify-start items-center"
                variant="contained"
                color="success"
                onClick={() => router.back()}
            >
                Back
            </Button>
        </div>
    );
};

BackButton.propTypes = {};

BackButton.displayName = 'BackButton';

export default BackButton;