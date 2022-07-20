import Head from 'next/head';
import React, {Fragment} from 'react';
import CssBaseline from '@mui/material';
import ResponsiveAppBar from './AppBar';

import { useTheme } from 'next-themes';
import { ThemeProvider, createTheme } from '@mui/material';
import ScrollButton from './ScrollButton';

const Layout = ({children}: {children: React.ReactNode}) => {

  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const muiTheme = createTheme(
    {
      palette: {
        mode: currentTheme as 'light' | 'dark',
      },
      typography: {
        fontFamily: 'Ubuntu, sans-serif',
      },
    }
  );

  return (
    <>
      <Head>
        <title>tweetmike</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={muiTheme}>
          <Fragment>
                <ResponsiveAppBar />
                <main className="flex-grow container mx-auto  ">
                  {children}
                </main>
            <ScrollButton />
          </Fragment>
      </ThemeProvider>
    </>
  );
};

export default Layout;
