import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useState } from 'react';
import LoginModal from '../login-modal/login.modal.component';
import AuthService from '../../services/auth.service';


interface MainNavbarProps {
  authService: AuthService;
}

function MainNavbar({ authService }: MainNavbarProps) {

  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
    <LoginModal 
      open={openLogin}
      onClose={() => setOpenLogin(false)}
      authService={authService}  
    />
      
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="info">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='left'>
            Weather Report
          </Typography>
          <Button 
            color="inherit"
            onClick={() => setOpenLogin(true)}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}

export default MainNavbar;