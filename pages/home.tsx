import React from 'react';
import {Box, Button, Stack} from '@mui/material';
import { signOut } from 'next-auth/react';
import type {NextPage} from 'next';

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
          <Button onClick={()=>signOut()}> Sign Out</Button>
        </Stack>
      </Box>
    </div>
  );
};

export default Home;
