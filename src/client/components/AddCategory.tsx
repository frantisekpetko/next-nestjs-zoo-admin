'use client';

import React, { RefObject } from 'react';
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Category {
  category: string;
}

const AddCategory = () => {
  const categoryRef = React.useRef<RefObject<HTMLInputElement>>(null);
  const [categories, setCategories] = React.useState<any>([
    { category: '' },
  ]);

  async function sendData() {
    /*
    await axios.post('/api/category', {
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
        {categories.map((item: Category, index: number) => {
          return (
            <Grid item xs={6} key={index}>
              <Grid
                container
                direction="row"
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={9}>
                  {index}{' '}
                  <TextField
                    id="filled-basic"
                    label="Filled"
                    variant="filled"
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >,
                    ) =>
                      setCategories([
                        ...(categories.with(index, { category: e.target.value })),
                      ])
                    }
                    value={item.category}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Fab
                    color="secondary"
                    aria-label="add"
                    onClick={() => {
                      setCategories([
                        ...categories.filter((item: Category, i: number) => i !== index),
                      ]);
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
              setCategories([...categories, { category: '' }]);
            }}
          >
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" color="secondary" onClick={sendData}>
            Add Category
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddCategory;
