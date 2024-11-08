import { Button, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const AddBill = () => {
  return (
    <>
      <TextField
        id="filled-select-currency"
        select
        label="Select"
        defaultValue="EUR"
        helperText="Please select your currency"
        variant="filled"
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="outlined" color="success">
        Store bill
      </Button>
    </>
  );
};

export default AddBill;
