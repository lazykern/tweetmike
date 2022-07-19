import {Box, Button, Grid, Stack, TextField} from '@mui/material';

import {NextPage} from 'next';
import {useTheme} from 'next-themes';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import React, {useState} from 'react';

const {publicRuntimeConfig} = getConfig();

const ReactJson = dynamic(() => import('react-json-view'), {ssr: false});

const Design: NextPage = () => {
  const {theme, systemTheme} = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div>
      <Grid container columnSpacing={1} sx={{height: '90vh'}}>
        <Grid item xs={16} sm={6} maxWidth={{xs: '100%', sm: '60%'}}>
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
                ></TextField>{' '}
              </Grid>
            </Grid>
            <Button> SEND </Button>
            <Box color={'white'}></Box>
            <Box display={{xs: 'flex', sm: 'none'}}>
              <ReactJson
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
                src={publicRuntimeConfig.demoJson}
              />
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
          <ReactJson
            iconStyle="circle"
            style={{
              overflow: 'auto',
              textOverflow: 'clip',
              overflowWrap: 'break-word',
              whiteSpace: 'pre-wrap',
              maxHeight: '90vh',
              backgroundColor: 'transparent',
              fontFamily: 'JetBrains Mono',
              fontSize: '14px',
            }}
            theme={
              currentTheme === 'dark' ? 'summerfruit' : 'summerfruit:inverted'
            }
            src={publicRuntimeConfig.demoJson}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Design;
