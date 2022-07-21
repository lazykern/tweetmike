import StyledMenu from '@components/StyledMenu';
import StyledReactJson from '@components/StyledReactJson';

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Grid,
  ListItemText,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import React, {useState} from 'react';

const apiVersionOptions = ['/2/', '/1.1/'];

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<object>({});

  const [endpointInput, setEndpointInput] = useState<string>('');

  const [apiVersion, setApiVersion] = useState<string>(apiVersionOptions[0]);
  const [
    anchorElApiVersion,
    setAnchorElApiVersion,
  ] = useState<null | HTMLElement>(null);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState< 'error' | 'warning' | 'info' | 'success' >('error');
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const openSnackbarWithMessage = (severity: 'error' | 'warning' | 'info' | 'success', message:string) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  }

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleOpenApiVersionMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElApiVersion(event.currentTarget);
  };

  const handleCloseApiVersionMenu = () => {
    setAnchorElApiVersion(null);
  };

  const handleEndpointInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value;
    if (value.startsWith('/')) {
      value = value.substring(1);
    }
    setEndpointInput(value);
  };

  const handleSendButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    let endpoint = endpointInput;

    if (!endpoint) {
      setLoading(false);
      return;
    }

    try {
      fetch('/api' + apiVersion + endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent': '*',
        },
      }).then(res => {
        res.json().then(data => {
          setLoading(false);
          setData(data);
        });
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      openSnackbarWithMessage('error', 'There was an error sending the request.'); 
    }
  };

  return (
    <div>
      <Grid container columnSpacing={1} sx={{height: '90vh'}}>
        <Grid item xs={16} sm={6} maxWidth={{xs: '100%', sm: '60%'}}>
          <Stack spacing={1} flex="1 1 auto">
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Button onClick={handleOpenApiVersionMenu}>{apiVersion}</Button>
                <StyledMenu
                  anchorEL={anchorElApiVersion}
                  onClose={handleCloseApiVersionMenu}
                >
                  {apiVersionOptions.map(option => (
                    <MenuItem
                      key={option}
                      onClick={() => {
                        setApiVersion(option);
                      }}
                    >
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </StyledMenu>
              </Grid>
              <Grid item flexGrow={1}>
                {' '}
                <TextField
                  fullWidth={true}
                  label="API endpoint"
                  onChange={handleEndpointInputChange}
                  value={endpointInput}
                ></TextField>{' '}
              </Grid>
            </Grid>
            {!loading ? (
              <Button onClick={handleSendButton}> SEND </Button>
            ) : (
              <Button disableRipple={true}> SENDING... </Button>
            )}
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert elevation={6} variant="filled" severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
