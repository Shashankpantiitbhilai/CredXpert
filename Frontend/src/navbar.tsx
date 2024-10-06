import { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon, Home, Dashboard } from '@mui/icons-material';
import { logoutUser } from './services/auth';
import { AdminContext } from './App';
import { createTheme } from '@mui/material/styles';

// Define a type for the user context
interface User {
  role: 'user' | 'admin' | 'verifier';
}

const theme = createTheme();

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { user } = useContext(AdminContext) as { user: User };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift') {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Home', icon: <Home />, link: '/' },
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      link: user?.role === 'admin' ? '/admin-dashboard' :
            user?.role === 'verifier' ? '/verifier-dashboard' : 
            '/userDashboard',
    },
  ];

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      navigate('/login');
    }
  };

  const drawer = (
    <Box sx={{ width: "100%" }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} component={RouterLink} to={item.link} sx={{ cursor: 'pointer' }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'green' }}>
        <Toolbar>
          {isSmallScreen && (
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CreditSea
          </Typography>
          {!isSmallScreen && navItems.map((item) => (
            <Button
              key={item.text}
              color="inherit"
              component={RouterLink}
              to={item.link}
              startIcon={item.icon}
              sx={{
                '&:hover': {
                  bgcolor: 'white', // Change background to white on hover
                  color: 'green',   // Optional: change text color to green
                },
              }}
            >
              {item.text}
            </Button>
          ))}
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              '&:hover': {
                bgcolor: 'white', // Change background to white on hover
                color: 'green',   // Optional: change text color to green
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
