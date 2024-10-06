import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
 
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
 
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  AttachMoney,
  Dashboard,
  Menu as MenuIcon,
  Home,
  Info,
  ContactSupport,
} from '@mui/icons-material';
  import { ListItemButton } from '@mui/material';
// Define theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
    },
    secondary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

// Define types for navigation items
type NavItem = {
  text: string;
  icon: JSX.Element;
  link: string;
};

const Homepage = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Correct toggleDrawer function
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Navigation items
  const navItems: NavItem[] = [
    { text: 'Home', icon: <Home />, link: '/' },
    { text: 'Dashboard', icon: <Dashboard />, link: '/userDashboard' },
    { text: 'Apply', icon: <AttachMoney />, link: '/apply' },
    { text: 'About', icon: <Info />, link: '/about' },
    { text: 'Contact', icon: <ContactSupport />, link: '/contact' },
  ];

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
       

// ...

<ListItemButton 
  key={item.text} 
  component={RouterLink} 
  to={item.link}
>
  <ListItemIcon>{item.icon}</ListItemIcon>
  <ListItemText primary={item.text} />
</ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default',
          width: '100%',
        }}
      >
        <AppBar position="static" elevation={0} sx={{ width: '100%' }}>
          <Toolbar>
            {isSmallScreen && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CreditSea
            </Typography>
            {!isSmallScreen &&
              navItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={RouterLink}
                  to={item.link}
                  startIcon={item.icon}
                >
                  {item.text}
                </Button>
              ))}
          </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawer}
        </Drawer>

        <Container
          component="main"
          maxWidth={false}
          sx={{
            mt: { xs: 4, sm: 8 },
            mb: 2,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: '0 24px',
          }}
        >
          {/* Content goes here */}
        </Container>

        <Box
          component="footer"
          sx={{ mt: 'auto', bgcolor: 'background.paper', py: 6, width: '100%' }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              © 2024 CreditSea. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Homepage;
