import {Box, Button, Stack} from '@mui/material';

import type {NextPage} from 'next';
import {signOut} from 'next-auth/react';
import React from 'react';

const Home: NextPage = () => {
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
      >
        <Stack>
          <Button onClick={() => signOut()}> Sign Out</Button>
        </Stack>
      </Box>
    </div>
  );
};

export default Home;
