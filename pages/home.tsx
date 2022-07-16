import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useAuth } from "context/AuthContext";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { user, credential, logout } = useAuth();

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
      >
        <Button onClick={logout}> Sign Out</Button>
      </Box>
    </div>
  );
};

export default Home;
