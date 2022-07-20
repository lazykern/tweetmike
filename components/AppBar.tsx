import React from 'react';
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
import {useAuth} from '@contexts/AuthContext';
import {useTheme} from 'next-themes';
import { StyledMenu } from './StyledMenu';
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuList,
  Stack,
} from '@mui/material';

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
          color="inherit"
          disableRipple={true}
          onClick={() => setTheme('light')}
        >
          <LightMode className="w-15 h-15 text-white " role="button" />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          size="large"
          color="inherit"
          disableRipple={true}
          onClick={() => setTheme('dark')}
        >
          <DarkMode className="w-15 h-15 text-gray-900 " role="button" />
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
    <AppBar color="inherit" elevation={0} position="static">
      <Container>
        <Toolbar disableGutters>
          <Stack direction="row" flexGrow={1} flex={1}>
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
                color: 'inherit',
                textDecoration: 'none',
                alignmentBaseline: 'central',
              }}
            >
              tweetmike
            </Typography>
          </Stack>

          {renderThemeChanger()}
          {user ? (
            <Box sx={{flexGrow: 0}}>
              <IconButton id="profileButton" onClick={handleOpenUserMenu}>
                <Avatar alt={displayName} src={photoURL} />
              </IconButton>
              <StyledMenu
                anchorEL={anchorElUser}
                open={userMenuOpen}
                onClose={handleCloseUserMenu}
                onClick={handleCloseUserMenu}
              >
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
