import React from 'react';
import {Logout, DarkMode, LightMode} from '@mui/icons-material';
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
import {useAuth} from 'context/AuthContext';
import {useTheme} from 'next-themes';

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
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
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
    <AppBar color='transparent' position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'Ubuntu',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            tweetmike
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: 'block', md: 'none'},
              }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: {xs: 'block', md: 'none'},
              fontFamily: 'Ubuntu',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              lineHeight: '2',
            }}
          >
            tweetmike
          </Typography>
          </Box>

          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages.map(page => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{my: 2, color: 'white', display: 'block'}}
              >
                {page}
              </Button>
            ))}
          </Box>
          {renderThemeChanger()}
          {user ? (
            <Box sx={{flexGrow: 0}}>
              <Tooltip title="Open profile">
                <IconButton id="profileButton" onClick={handleOpenUserMenu} sx={{p: 0}}>
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
