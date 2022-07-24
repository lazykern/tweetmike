import CssBaseline from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material';

import {useTheme} from 'next-themes';
import Head from 'next/head';
import React, {Fragment} from 'react';

import ResponsiveAppBar from './AppBar';
import ScrollButton from './ScrollButton';

const Layout = ({children}: {children: React.ReactNode}) => {
  const {theme, systemTheme} = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#000000',
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    background: {
      default: '#ffffff',
    },

    },
  });

  const muiTheme = currentTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <>
      <Head>
        <title>tweetmike</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={muiTheme}>
        <Fragment>
          <ResponsiveAppBar />
          <main className="container flex-grow mx-auto">{children}</main>
          <ScrollButton />
        </Fragment>
      </ThemeProvider>
    </>
  );
};

export default Layout;
