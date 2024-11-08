'use client';

import React, { RefObject } from 'react';
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Record {
  item: string;
}

interface Props {
  btnText: string;
  apiUrl: string;
}

const AddRecord = (props: Props) => {
  const [records, setRecords] = React.useState<any>([{ item: '' }]);

  async function sendData() {
    /*
        await axios.post(`/api/${props.apiUrl}`, {
          category: categoryRef?.current?.value,
        });
        */
  }

  React.useEffect(() => {
    //
  }, []);
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {records.map((record: Record, index: number) => {
          return (
            <Grid item xs={6} key={index}>
              <Grid
                container
                direction="row"
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={9}>
                  <TextField
                    id="filled-basic"
                    label={`New ${props.apiUrl}`}
                    variant="filled"
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >,
                    ) =>
                      setRecords([
                        ...records.with(index, { item: e.target.value }),
                      ])
                    }
                    value={record.item}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Fab
                    color="secondary"
                    aria-label="add"
                    onClick={() => {
                      setRecords([...records.filter((item: Record, i: number) => i !== index)]);
                    }}
                  >
                    <RemoveIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          );
        })}

        <Grid item xs={6}>
          <Fab
            color="secondary"
            aria-label="add"
            onClick={() => {
              setRecords([...records, { item: '' }]);
            }}
          >
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" color="secondary" onClick={sendData}>
            {props.btnText}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddRecord;
