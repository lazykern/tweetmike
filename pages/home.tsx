import React from 'react';
import {Box, Button, Stack} from '@mui/material';
import {useAuth} from 'context/AuthContext';
import type {NextPage} from 'next';

const Home: NextPage = () => {
  const {logout} = useAuth();

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
      >
        <Stack>
          <Button onClick={logout}> Sign Out</Button>
        </Stack>
      </Box>
    </div>
  );
};

export default Home;
