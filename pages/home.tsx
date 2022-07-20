import {Box, Button, Stack} from '@mui/material';

import {useAuth} from '@contexts/AuthContext';
import type {NextPage} from 'next';
import React from 'react';

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
