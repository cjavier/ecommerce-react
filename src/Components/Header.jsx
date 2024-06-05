import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthContext } from '@/Hook/useAuthContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function Header({ mode, toggleColorMode }) {
  const { logout, isAuth, userPayload } = useAuthContext();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: 'transparent', mt: 2 }}>
      <Container maxWidth="lg">
        <Toolbar
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: theme.palette.mode === 'light'
              ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
              : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
          })}
        >
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
           
            {isAuth && userPayload && (
              <Typography variant="body1" color="text.primary" sx={{ ml: 2 }}>
                Bienvenido {userPayload.first_name} {userPayload.last_name}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {isAuth ? (
              <>
                <Button component={NavLink} to='/' sx={{ color: 'text.primary' }}>
                  Home
                </Button>
                <Button component={NavLink} to='/dashboard' sx={{ color: 'text.primary' }}>
                  Dashboard
                </Button>
                <Button component={NavLink} to='/secret' sx={{ color: 'text.primary' }}>
                  Secret
                </Button>
                {userPayload && userPayload.role === 'ADMIN' && (
                  <Button component={NavLink} to='/create-item' sx={{ color: 'text.primary' }}>
                    Subir Producto
                  </Button>
                )}
                <Button onClick={logout} sx={{ color: 'text.primary' }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={NavLink} to='/login' sx={{ color: 'text.primary' }}>
                  Login
                </Button>
                <Button component={NavLink} to='/signup' sx={{ color: 'text.primary' }}>
                  Signup
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.paper', flexGrow: 1 }}>
                {isAuth ? (
                  <>
                    <MenuItem component={NavLink} to='/' onClick={toggleDrawer(false)}>
                      Home
                    </MenuItem>
                    <MenuItem component={NavLink} to='/dashboard' onClick={toggleDrawer(false)}>
                      Dashboard
                    </MenuItem>
                    <MenuItem component={NavLink} to='/secret' onClick={toggleDrawer(false)}>
                      Secret
                    </MenuItem>
                    {userPayload && userPayload.role === 'ADMIN' && (
                      <MenuItem component={NavLink} to='/create-item' onClick={toggleDrawer(false)}>
                        Subir Producto
                      </MenuItem>
                    )}
                    <Divider />
                    <MenuItem onClick={logout}>
                      Logout
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem component={NavLink} to='/login' onClick={toggleDrawer(false)}>
                      Login
                    </MenuItem>
                    <MenuItem component={NavLink} to='/signup' onClick={toggleDrawer(false)}>
                      Signup
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Header.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Header;