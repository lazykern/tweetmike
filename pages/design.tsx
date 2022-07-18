import React from 'react';
import {NextPage} from 'next';

import {Box, Card, CardContent, Grid, Paper, Stack} from '@mui/material';

const Design: NextPage = () => {
  return (
    <div>
      <Grid container columnSpacing={1} sx={{height: '90vh'}}>
        <Grid container xs={12} sm={7} lg={9}>
          <Stack spacing={1} flex="1 1 0">
            <Card className="flex-grow" >
              <p> API </p>
            </Card>
            <Card className="flex-grow">
              <CardContent>
                <p>Parameter and Description</p>
              </CardContent>
            </Card>
            <Card className="flex-grow">
              <CardContent>
                <p> Response </p>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid container item sm={5} lg={3} display={
          {
            xs: 'none',
            sm: 'flex',
            lg: 'flex',
          }
        }>
          <Card className="flex-grow">
            <CardContent>
              <p> Response </p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Design;
