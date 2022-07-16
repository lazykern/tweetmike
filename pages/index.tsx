import type, { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "context/AuthContext";
import { Box, Button, Stack, Typography } from "@mui/material";
import Head from "next/head";

const Index: NextPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await login();
      router.push("/home");
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
        minHeight="100vh"
      >
        <Stack spacing={4}>
          <Typography variant="h2" align="center" fontFamily={"Ubuntu"}> tweetmike </Typography>
          <Button onClick={handleLogin}> sign in with twitter </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default Index;