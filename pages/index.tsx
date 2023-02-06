import { Box, Button, Link, Stack, Typography } from '@mui/material';

import { useAuth } from '@contexts/AuthContext';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Index: NextPage = () => {
  const router = useRouter();
  const { login, user } = useAuth();

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await login();
      router.push('/playground');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
      >
        <Stack spacing={4}>
          <Typography variant="h2" align="center" fontFamily={'Ubuntu'}>
            tweetmike
          </Typography>
          {/* {user ? ( */}
          {/*   <Button onClick={() => router.push('playground')}> */}
          {/*     go to playground */}
          {/*   </Button> */}
          {/* ) : ( */}
          {/*   <Button onClick={handleLogin}> sign in with twitter </Button> */}
          {/* )} */}
          <Typography>
            Due to recent Twitter{' '}
            <Link href="https://twitter.com/TwitterDev/status/1621026986784337922?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1621026986784337922%7Ctwgr%5E3f4e2bd2f5838bced19cd94f412f2f871b27e8dc%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fd-2356875000413832458.ampproject.net%2F2301181928000%2Fframe.html">
              API changes
            </Link>
            , this app is no longer functional.
          </Typography>
        </Stack>
      </Box>
    </div>
  );
};

export default Index;
