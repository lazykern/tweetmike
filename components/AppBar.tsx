import {DarkMode, LightMode, Logout, Twitter} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

import {getToken} from 'next-auth/jwt';
import {signOut, useSession} from 'next-auth/react';
import {useTheme} from 'next-themes';
import React from 'react';

const pages = ['About'];

const ResponsiveAppBar = () => {
  const {data: session} = useSession();

  const displayName = session?.user?.name || 'Guest';
  const photoURL = session?.user?.image || '';

  const {systemTheme, theme, setTheme} = useTheme();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const userMenuOpen = Boolean(anchorElUser);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileButton = () => {
    if (session) {
      const twitterSession: any = session?.twitter;
      window.open('https://twitter.com/' + twitterSession.twitterHandle);
    }
  };

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
          {session ? (
            <Box sx={{flexGrow: 0}}>
              <IconButton id="profileButton" onClick={handleOpenUserMenu}>
                <Avatar alt={displayName} src={photoURL} />
              </IconButton>
              <Menu
                anchorEl={anchorElUser}
                id="user-menu"
                open={userMenuOpen}
                onClose={handleCloseUserMenu}
                onClick={handleCloseUserMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              >
                <MenuItem onClick={handleProfileButton}>
                  <ListItemIcon>
                    <Twitter fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="body2">{displayName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => signOut()}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="body2">sign out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
