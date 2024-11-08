import React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const AddProductRecord = () => {
  return (
    <>
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <Button variant="outlined" color="success">
        Add Product Record
      </Button>
    </>
  );
};

export default AddProductRecord;
