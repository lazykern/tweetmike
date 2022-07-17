import React from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useAuth} from 'context/AuthContext';
import {Box, Button, Stack, Typography} from '@mui/material';

const Index: NextPage = () => {
  const router = useRouter();
  const {login, user} = useAuth();

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await login();
      router.push('/home');
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
          {user ? (
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
