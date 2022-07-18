import React from 'react';
import {DarkMode, LightMode} from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useAuth} from '@contexts/AuthContext';
import {useTheme} from 'next-themes';
import {Stack} from '@mui/material';

const pages = ['About'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const {user} = useAuth();

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

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleUserButton = () => {
    if (user) {
      window.open(
        'https://twitter.com/intent/user?user_id=' + user?.providerData[0].uid
      );
    } else {
      window.open('https://twitter.com');
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar color="transparent" elevation={0} position="static">
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
              <Tooltip title="Open profile">
                <IconButton
                  id="profileButton"
                  onClick={handleUserButton}
                >
                  <Avatar alt={displayName} src={photoURL} />
                </IconButton>
              </Tooltip>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
