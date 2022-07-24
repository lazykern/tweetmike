import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  DarkMode,
  LightMode,
  Logout,
  Twitter,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuList,
  Stack,
} from '@mui/material';

import {useAuth} from '@contexts/AuthContext';
import {useTheme} from 'next-themes';
import React from 'react';

import StyledMenu from './StyledMenu';

const pages = ['About'];

const ResponsiveAppBar = () => {
  const {user, logout} = useAuth();

  const displayName = user?.displayName ?? 'Guest';
  const photoURL = user?.photoURL ?? '';

  const {systemTheme, theme, setTheme} = useTheme();

  const renderThemeChanger = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <IconButton
          size="large"
          disableRipple={true}
          onClick={() => setTheme('light')}
        >
          <LightMode role="button" sx={{
            color: 'text.primary',
          }}/>
        </IconButton>
      );
    } else {
      return (
        <IconButton
          size="large"
          disableRipple={true}
          onClick={() => setTheme('dark')}
        >
          <DarkMode role="button" sx={{
            color: 'text.primary',
          }}/>
        </IconButton>
      );
    }
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const userMenuOpen = Boolean(anchorElUser);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenProfileButton = () => {
    if (user) {
      window.open('https://twitter.com/' + user?.displayName);
    } else {
      window.open('https://twitter.com');
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar color='transparent' elevation={0} position="static">
      <Container >
        <Toolbar disableGutters>
          <Stack direction="row" flexGrow={1} flex={1}>
            <Box flexGrow={0}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  fontFamily: 'Ubuntu',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  textDecoration: 'none',
                  alignmentBaseline: 'central',
                }}
              >
                tweetmike
              </Typography>
            </Box>
          </Stack>

          {renderThemeChanger()}
          {user ? (
            <Box flexGrow={0}>
              <IconButton id="profileButton" onClick={handleOpenUserMenu}>
                <Avatar alt={displayName} src={photoURL} />
              </IconButton>
              <StyledMenu anchorEL={anchorElUser} onClose={handleCloseUserMenu}>
                <MenuItem onClick={handleOpenProfileButton}>
                  <ListItemIcon>
                    <Twitter fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>profile</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>sign out</ListItemText>
                </MenuItem>
              </StyledMenu>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
