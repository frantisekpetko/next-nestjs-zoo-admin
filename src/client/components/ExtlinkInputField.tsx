'use client';

import { TextField } from "@mui/material";
import PropTypes from 'prop-types';

const ExtlinkTextField = (props: unknown) => {
    return (
        <TextField
            {...props}
            sx={{
                marginRight: '2rem',
                width: '15rem',
                marginLeft: '1.5em',
                marginBottom: '1rem',
            }}
            className="mr-8 w-60 ml-6 mb-4"
        />
    );
};

ExtlinkTextField.propTypes = {
    // Define prop types for the component
    // Example: value: PropTypes.string.isRequired
};

ExtlinkTextField.displayName = 'ExtlinkTextField';

export default ExtlinkTextField;