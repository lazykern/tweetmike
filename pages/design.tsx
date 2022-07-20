import React, {useState} from 'react';
import {NextPage, GetServerSideProps, GetServerSidePropsContext} from 'next';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
const ReactJson = dynamic(() => import('react-json-view'), {ssr: false});

import {Box, Button, Grid, Stack, TextField} from '@mui/material';
import {useTheme} from 'next-themes';

export default function Design() {
  const {theme, systemTheme} = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const [data, setData] = useState<object>({});
  const [endpoint, setEndpoint] = useState<string>('');

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint(e.target.value);
  }

  const handleSendButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const response = fetch('/api/twitter/'+ endpoint, {
      method: 'GET',
    }).then(res => res.json());

    response.then(res => {
      setData(res);
    });
  };

  return (
    <div>
      <Grid container columnSpacing={1} sx={{height: '90vh'}}>
        <Grid container xs={16} sm={6} maxWidth={{xs: '100%', sm: '60%'}}>
          <Stack spacing={1} flex="1 1 auto">
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Button> select </Button>
              </Grid>
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
              <ReactJson
                name="response"
                style={{
                  overflow: 'auto',
                  textOverflow: 'clip',
                  overflowWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  backgroundColor: 'transparent',
                }}
                theme={
                  currentTheme === 'dark'
                    ? 'summerfruit'
                    : 'summerfruit:inverted'
                }
                src={data}
              />
            </Box>
          </Stack>
        </Grid>

        <Grid
          container
          item
          sm={6}
          display={{
            xs: 'none',
            sm: 'flex',
          }}
        >
          <ReactJson
            name="response"
            style={{
              overflow: 'auto',
              textOverflow: 'clip',
              overflowWrap: 'break-word',
              whiteSpace: 'pre-wrap',
              maxHeight: '90vh',
              backgroundColor: 'transparent',
            }}
            theme={
              currentTheme === 'dark' ? 'summerfruit' : 'summerfruit:inverted'
            }
            src={data}
          />
        </Grid>
      </Grid>
    </div>
  );
}
