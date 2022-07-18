import React from 'react';
import {NextPage} from 'next';

import {Card, CardContent, Grid,Stack, Typography} from '@mui/material';

const Design: NextPage = () => {
  return (
    <div>
      <Grid container columnSpacing={1} sx={{height: '90vh'}}>
        <Grid container xs={16} sm={7} lg={9}>
          <Stack spacing={1} flex="1 1 0">
            <Card className="h-[10%] card-dark" >
              <CardContent className='align-middle'>
              </CardContent>
            </Card>
            <Card className="flex-grow  card-dark">
              <CardContent>
              </CardContent>
            </Card>
              <Card className="flex-grow card-dark" sx={{
                display: {
                  xs: 'flex',
                  sm: 'none',
                }
              }}>
                <CardContent>
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
          <Card className="flex-grow card-dark">
            <CardContent>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Design;
