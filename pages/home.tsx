import StyledReactJson from '@components/StyledReactJson';

import {Box, Button, Grid, Stack, TextField} from '@mui/material';

import React, {useState} from 'react';

export default function Home() {
  const [data, setData] = useState<object>({});
  const [endpoint, setEndpoint] = useState<string>('');

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint(e.target.value);
  };

  const handleSendButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!endpoint) {
      return;
    }

    const response = fetch('/api/twitter/' + endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }).then(res => res.json());

    response.then(res => {
      setData(res);
    });
  };

  return (
    <div>
      <Grid container columnSpacing={1} sx={{height: '90vh'}}>
        <Grid item xs={16} sm={6} maxWidth={{xs: '100%', sm: '60%'}}>
          <Stack spacing={1} flex="1 1 auto">
            <Grid container spacing={1} alignItems="center">
              {/* <Grid item>
                <Button> select </Button>
              </Grid> */}
              <Grid item flexGrow={1}>
                {' '}
                <TextField
                  fullWidth={true}
                  label="API endpoint"
                  onChange={handleEndpointChange}
                  value={endpoint}
                ></TextField>{' '}
              </Grid>
            </Grid>
            <Button onClick={handleSendButton}> SEND </Button>
            <Box color={'white'}></Box>
            <Box display={{xs: 'flex', sm: 'none'}}>
              <StyledReactJson src={data} />
            </Box>
          </Stack>
        </Grid>

        <Grid
          item
          sm={6}
          display={{
            xs: 'none',
            sm: 'flex',
          }}
        >
          <StyledReactJson src={data} />
        </Grid>
      </Grid>
    </div>
  );
}
