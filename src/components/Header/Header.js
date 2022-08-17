import * as React from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';

import { useAuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const pages = [
  {'key':'home', 'value':"Начало"},
  {'key':'rivers','value':"Водоеми"},
  {'key':'stories','value': "Рибарски истории"}
];
const settings = [
  {'key':'profile', 'value':"Профил"},
  {'key':'my-stories','value':"Моите истории"},
  {'key':'logout','value': "Изход"}
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user } = useAuthContext()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            {/*Logo DESKTOP*/}
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="span"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
            >
              Fishing-adventures
            </Typography>
            {/* END Logo DESKTOP*/}

            {/*MENU MOBILE*/}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                    display: { xs: 'block', md: 'none' },
                  }}
              >
                {pages.map((page) => (
                    <MenuItem key={page.key}
                              onClick={handleCloseUserMenu}
                              component={Link}
                              to={`/${page.key}`}
                    >
                      <Typography textAlign="center">{page.value}</Typography>
                    </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* END MENU MOBILE*/}

            {/*LOGO MOBILE*/}
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
            >
              Fishing-adventures
            </Typography>
            {/* END LOGO MOBILE*/}

            {/*MENU DESKTOP*/}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                  <Button
                      key={page.key}
                      component={Link}
                      onClick={handleCloseNavMenu}
                      to={`/${page.key}`}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.value}
                  </Button>
              ))}
            </Box>
            {/* END MENU DESKTOP*/}

            {/*USER SETTINGS*/}
            {
              user.email
                ?
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Профил">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp"
                              src="/static/images/avatar/2.jpg"/>
                    </IconButton>
                  </Tooltip>
                  <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                        <MenuItem key={setting.key}
                                  onClick={handleCloseUserMenu}
                                  to={`/${setting.key}`}
                                  component={Link}>
                          <Typography textAlign="center">{setting.value}</Typography>
                        </MenuItem>
                    ))}
                  </Menu>
                </Box>
                  :
                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex', justifyContent:"flex-end"} }}>
                        <Button
                            key={'login'}
                            component={Link}
                            to='/login'
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                        Вход
                        </Button>
                  </Box>
            }
            {/* END USER SETTINGS*/}
          </Toolbar>
        </Container>
      </AppBar>
  );
};
export default Header;
