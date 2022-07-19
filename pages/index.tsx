import React from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import {Box, Button, Stack, Typography} from '@mui/material';

const Index: NextPage = () => {
  const router = useRouter();
  

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      signIn('twitter');
      router.push('/home');
    } catch (error) {
      console.log(error);
    }
  };

  const {data: session} = useSession();

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
          {session ? (
            <Button onClick={() => router.push('home')}>go to home page</Button>
          ) : (
            <Button onClick={handleLogin}> sign in with twitter </Button>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default Index;
