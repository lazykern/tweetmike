import { EndpointInterface, EndpointParamInterface } from 'interfaces';

import StyledMenu from '@components/StyledMenu';
import StyledReactJson from '@components/StyledReactJson';
import {
    defaultTwitterApiVersion,
    requestMethods,
    server,
    twitterApiBaseUrl,
    twitterApiVersions,
} from 'config';

import {
    Alert,
    Autocomplete,
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    Grid,
    ListItemText,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import React, { useRef, useState } from 'react';
import { clearObjectFaulty } from 'utils';

export default function Home({
  endpoints,
}: {
  endpoints: { '1.1': []; '2': EndpointInterface[] };
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<object>({});

  const responseRef = useRef<any>(null);

  const [currentEndpoint, setCurrentEndpoint] =
    useState<EndpointInterface | null>(null);
  const [endpointInput, setEndpointInput] = useState<string>('');

  const [apiVersion, setApiVersion] = useState<'2' | '1.1'>(
    defaultTwitterApiVersion
  );

  const [anchorElApiVersion, setAnchorElApiVersion] =
    useState<null | HTMLElement>(null);

  const [requestURL, setRequestURL] = useState<URL>(new URL(twitterApiBaseUrl));
  const [requestPathParams, setRequestPathParams] = useState<object>({});
  const [requestQuery, setRequestQuery] = useState<object>({});
  const [requestBody, setRequestBody] = useState<object>({});

  const clearRequestObjects = () => {
    setRequestPathParams({});
    setRequestQuery({});
    setRequestBody({});
  };

  const [requestMethod, setRequestMethod] = useState<string>('GET');
  const [anchorElRequestMethod, setAnchorElRequestMethod] =
    useState<null | HTMLElement>(null);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'error' | 'warning' | 'info' | 'success'
  >('error');
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const openSnackbarWithMessage = (
    severity: 'error' | 'warning' | 'info' | 'success',
    message: string
  ) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

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

  const handleOpenRequestMethodMenu = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorElRequestMethod(event.currentTarget);
  };

  const handleCloseRequestMethodMenu = () => {
    setAnchorElRequestMethod(null);
  };

  const handleCurrentEndpointChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | object | null,
    reason: AutocompleteChangeReason
  ) => {
    setCurrentEndpoint(value as EndpointInterface | null);
    clearRequestObjects();
    updateRequestUrl({
      newEndpoint: value as EndpointInterface,
    });
  };

  const handleSendButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    const path =
      apiVersion === '2'
        ? requestURL.pathname + requestURL.search
        : '/1.1/' + endpointInput;

    try {
      fetch('/api' + path, {
        method: requestMethod,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent': '*',
        },
        body:
          requestMethod === 'POST' || requestMethod === 'PUT'
            ? JSON.stringify(requestBody, null)
            : undefined,
      }).then(res => {
        res
          .json()
          .then(data => {
            setLoading(false);
            setData(data);

            responseRef.current.scrollIntoView({
              behavior: 'smooth',
            });
          })
          .catch(err => {
            setLoading(false);
            setData(err);
            openSnackbarWithMessage('error', 'Error parsing response');
          });
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      openSnackbarWithMessage(
        'error',
        'There was an error sending the request.'
      );
    }
  };

  const updateRequestPathParams = (pathParam: string, value: string) => {
    const newRequestPathParams = { ...requestPathParams, [pathParam]: value };
    setRequestPathParams(newRequestPathParams);
    updateRequestUrl({
      newRequestPathParams: newRequestPathParams,
    });
  };

  const updateRequestQuery = (queryParam: string, value: any) => {
    let newRequestQuery = { ...requestQuery, [queryParam]: value };
    newRequestQuery = clearObjectFaulty(newRequestQuery);
    setRequestQuery(newRequestQuery);
    updateRequestUrl({ newRequestQuery: newRequestQuery });
  };

  const updateRequestBody = (property: string, value: any) => {
    let newRequestBody: { [key: string]: any } = {};

    if (property.includes('.')) {
      const [parent, child] = property.split('.');
      newRequestBody = { ...requestBody };
      newRequestBody[parent] = { ...newRequestBody[parent] };
      newRequestBody[parent][child] = value;
    } else {
      newRequestBody = { ...requestBody, [property]: value };
    }
    newRequestBody = clearObjectFaulty(newRequestBody);

    setRequestBody(newRequestBody);
  };

  const updateRequestUrl = ({
    newEndpoint,
    newRequestPathParams,
    newRequestQuery,
  }: {
    newEndpoint?: EndpointInterface;
    newRequestPathParams?: object;
    newRequestQuery?: object;
  }) => {
    let path = (newEndpoint || currentEndpoint!).url;
    for (const [key, value] of Object.entries(
      newRequestPathParams || requestPathParams
    )) {
      path = path.replace(`:${key}`, value ? value : `:${key}`);
    }

    const url = new URL(twitterApiBaseUrl + path);
    for (const [key, value] of Object.entries(
      newRequestQuery || requestQuery
    )) {
      if (typeof value === 'object' && value.length > 0) {
        url.searchParams.append(key, value);
      } else if (value) {
        url.searchParams.append(key, value);
      }
    }

    setRequestURL(url);
  };

  const renderCodeBlock = (code: string) => (
    <Box className="code-block" borderRadius={2}>
      <Typography
        padding={2}
        fontSize={12}
        fontFamily={'monospace'}
        sx={{
          display: 'flex',
          maxWidth: { sm: '45vw' },
          overflowWrap: 'break-word',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        {code}
      </Typography>
    </Box>
  );

  const renderParam = (
    param: EndpointParamInterface,
    endpoint: EndpointInterface
  ) => {
    let component: JSX.Element | null = null;
    const endpointId = endpoint.id;
    const isProperty = param.role === 'body' && param.name.includes('.');
    if (param.type === 'string') {
      if (param.allowedValues) {
        component = (
          <Select
            key={`select-${endpointId}-${param.name}`}
            className="param-select"
            defaultValue=""
            fullWidth
            onChange={(event: any) => {
              if (param.role === 'query') {
                updateRequestQuery(param.name, event.target.value);
              } else {
                updateRequestBody(param.name, event.target.value);
              }
            }}
          >
            <MenuItem key={`select-${endpointId}-${param.name}-none`} value="">
              none
            </MenuItem>
            {param.allowedValues!.map(value => (
              <MenuItem
                key={`select-${endpointId}-${param.name}-${value}`}
                value={value}
              >
                {value}
              </MenuItem>
            ))}
          </Select>
        );
      } else {
        component = (
          <TextField
            key={`textfield-${endpointId}-${param.name}`}
            size="small"
            fullWidth
            multiline={param.name === 'text'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              event.preventDefault();
              if (param.role === 'path') {
                updateRequestPathParams(param.name, event.target.value);
              } else if (param.role === 'query') {
                updateRequestQuery(param.name, event.target.value);
              } else {
                updateRequestBody(param.name, event.target.value);
              }
            }}
          />
        );
      }
    } else if (param.type === 'integer') {
      component = (
        <TextField
          key={`textfield-${endpointId}-${param.name}`}
          size="small"
          fullWidth
          type={'number'}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(event.target.value, 10);
            if (param.role === 'query') {
              updateRequestQuery(param.name, value);
            } else {
              updateRequestBody(param.name, value);
            }
          }}
        />
      );
    } else if (param.type === 'array') {
      if (param.allowedValues) {
        component = (
          <Autocomplete
            key={`autocomplete-${endpointId}-${param.name}`}
            options={param.allowedValues}
            multiple
            autoHighlight
            fullWidth
            renderOption={(props, option: any) => {
              return (
                <li {...props} key={`li-${endpointId}-${param.name}-${option}`}>
                  {option}
                </li>
              );
            }}
            renderInput={params => (
              <TextField
                {...params}
                key={`textfield-${endpointId}-${param.name}`}
                size="small"
                fullWidth
              />
            )}
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              value: string | string[],
              reason: AutocompleteChangeReason,
              details?: AutocompleteChangeDetails<string> | undefined
            ) => {
              if (param.role === 'query') {
                updateRequestQuery(param.name, value);
              } else {
                updateRequestBody(param.name, value);
              }
            }
            }
          />
        );
      } else {
        component = (
          <Autocomplete
            key={`autocomplete-${endpointId}-${param.name}`}
            options={[]}
            freeSolo
            multiple
            autoHighlight
            autoSelect
            autoComplete
            fullWidth
            renderInput={params => (
              <TextField
                key={`textfield-${endpointId}-${param.name}`}
                {...params}
                size="small"
                autoCorrect=""
                fullWidth
              />
            )}
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              value: string | string[],
              reason: AutocompleteChangeReason,
              details?: AutocompleteChangeDetails<string> | undefined
            ) => {
              if (param.role === 'query') {
                updateRequestQuery(param.name, value);
              } else {
                updateRequestBody(param.name, value);
              }
            }}
          />
        );
      }
    } else if (param.type === 'boolean') {
      component = (
        <Checkbox
          disableRipple
          key={`checkbox-${endpointId}-${param.name}`}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (param.role === 'query') {
              updateRequestQuery(param.name, event.target.checked);
            } else {
              updateRequestBody(param.name, event.target.checked);
            }
          }}
        />
      );
    } else if (param.type === 'object') {
      const rendered = param.properties!.map(
        (property: EndpointParamInterface) => renderParam(property, endpoint)
      );
      component = (
        <Box key={`object-${endpointId}-${param.name}`}>{rendered}</Box>
      );
    }
    return (
      <>
        <Box
          key={`box-${endpointId}-${param.name}`}
          marginY={1}
          marginLeft={isProperty ? 2 : 0}
        >
          <Grid container key={`grid-container-${endpointId}-${param.name}`}>
            <Grid item key={`grid-item-1-${endpointId}-${param.name}`}>
              <Typography
                key={`typography-name-${endpointId}-${param.name}`}
                marginX={1}
                variant={'body2'}
                sx={{
                  textDecoration: param.required ? 'underline' : 'none',
                  textDecorationColor: 'gray',
                }}
              >
                {isProperty ? param.name.split('.')[1] : param.name}
              </Typography>
            </Grid>
            <Divider
              key={`divider-${endpointId}-${param.name}`}
              orientation="vertical"
              flexItem
            />
            <Grid item key={`grid-item-2-${endpointId}-${param.name}`}>
              <Typography
                key={`typography-type-${endpointId}-${param.name}`}
                marginX={1}
                color={'inherit'}
                variant="caption"
              >
                {param.type}
              </Typography>
            </Grid>
            <Grid item key={`grid-item-3-${endpointId}-${param.name}`}>
              <Typography
                key={`typography-role-${endpointId}-${param.name}`}
                marginX={1}
                color={'violet'}
                variant="caption"
              >
                {param.role}
              </Typography>
            </Grid>
          </Grid>
          <Typography
            key={`typography-description-${endpointId}-${param.name}`}
            variant="caption"
            color={'gray'}
          >
            {param.description}
          </Typography>
          <FormControl
            key={`form-control-${endpointId}-${param.name}`}
            size="small"
            fullWidth
          >
            {component}
          </FormControl>
        </Box>
      </>
    );
  };

  const renderParams = () => {
    if (!currentEndpoint) {
      return null;
    }

    return (
      <>
        {currentEndpoint.params.map((param: EndpointParamInterface) =>
          renderParam(param, currentEndpoint)
        )}
      </>
    );
  };

  return (
    <div>
      <Grid container columnSpacing={1} sx={{ height: '90vh' }}>
        <Grid item xs={16} sm={6} maxWidth={{ xs: '100%', sm: '60%' }}>
          <Stack rowGap={1} flex="1 1 0">
            <Grid container columnSpacing={1} alignItems="center">
              <Grid item>
                <Button
                  onClick={handleOpenApiVersionMenu}
                  style={{ borderRadius: 35 }}
                >
                  /{apiVersion}/
                </Button>
                <StyledMenu
                  anchorEL={anchorElApiVersion}
                  onClose={handleCloseApiVersionMenu}
                >
                  {twitterApiVersions.map(option => (
                    <MenuItem
                      key={'menu-select-api-version-' + option}
                      onClick={() => {
                        if (option !== apiVersion) {
                          setCurrentEndpoint(null);
                          clearRequestObjects();
                        }
                        setApiVersion(option as '2' | '1.1');
                      }}
                    >
                      <ListItemText
                        key={'li-select-api-version-' + option}
                        primary={`/${option}/`}
                      />
                    </MenuItem>
                  ))}
                </StyledMenu>
              </Grid>
              <Grid item flex={1}>
                <Autocomplete
                  value={currentEndpoint}
                  freeSolo={apiVersion !== '2'}
                  autoHighlight
                  onChange={handleCurrentEndpointChange}
                  inputValue={endpointInput}
                  onInputChange={(event, newInputValue) => {
                    if (newInputValue.startsWith('/')) {
                      return;
                    }
                    setEndpointInput(newInputValue);
                  }}
                  id="endpoint-autocomplete"
                  options={(apiVersion === '2'
                    ? endpoints['2']
                    : endpoints['1.1']
                  ).filter(endpoint => endpoint.method === requestMethod)}
                  getOptionLabel={(option: any) => {
                    return option.url.replace(`/${apiVersion}/`, '');
                  }}
                  renderOption={(props, option: EndpointInterface) => {
                    return (
                      <li {...props} key={`endpoint-${option.id}`}>
                        <Stack>
                          {option.url.replace(`/${apiVersion}/`, '')}
                          <Typography variant="caption" color={'gray'}>
                            {option.name}
                          </Typography>
                        </Stack>
                      </li>
                    );
                  }}
                  renderInput={params => (
                    <TextField {...params} label="Endpoint" />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container columnSpacing={1} alignItems="center">
              <Grid item>
                <Box>
                  <Button onClick={handleOpenRequestMethodMenu}>
                    {requestMethod}
                  </Button>
                  <StyledMenu
                    anchorEL={anchorElRequestMethod}
                    onClose={handleCloseRequestMethodMenu}
                  >
                    {requestMethods.map(option => (
                      <MenuItem
                        key={
                          'menu-select-request-method-' + option.toLowerCase()
                        }
                        onClick={(e: any) => {
                          if (e.target.innerText !== requestMethod) {
                            setCurrentEndpoint(null);
                            setEndpointInput('');
                            setRequestMethod(option);
                            clearRequestObjects();
                          }
                        }}
                      >
                        <ListItemText
                          key={
                            'li-select-request-method-' + option.toLowerCase()
                          }
                          primary={option}
                        />
                      </MenuItem>
                    ))}
                  </StyledMenu>
                </Box>
              </Grid>
              <Grid item flex={1}>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={
                    loading ||
                    (apiVersion === '2' && !currentEndpoint) ||
                    (apiVersion === '1.1' && !endpointInput)
                  }
                  onClick={handleSendButton}
                >
                  {loading ? 'Sending...' : 'Send'}
                </Button>
              </Grid>
            </Grid>

            {currentEndpoint && (
              <Box marginTop={1}>
                <Typography padding={1}>request url</Typography>
                {renderCodeBlock(requestURL.href)}
              </Box>
            )}

            {currentEndpoint && ['POST', 'PUT'].includes(requestMethod) && (
              <Box>
                <Typography padding={1}>request body</Typography>
                {renderCodeBlock(JSON.stringify(requestBody, null, 2))}
              </Box>
            )}
            {apiVersion == '2' && renderParams()}

            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

            <Box
              ref={responseRef}
              marginTop={3}
              display={{ xs: 'flex', sm: 'none' }}
            >
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
          <Box>
            <StyledReactJson src={data} />
          </Box>
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

export async function getStaticProps(context: any) {
  const apiV2Endpoints = await fetch(`${process.env.URL}/api/2/endpoints`).then(res =>
    res.json()
  );
  console.log(apiV2Endpoints);
  return {
    props: {
      endpoints: {
        '1.1': [],
        '2': apiV2Endpoints,
      },
    },
  };
}
