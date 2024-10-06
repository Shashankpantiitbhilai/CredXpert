import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Card,
  CardContent,
  CardActions,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
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

const Homepage = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
  if (event instanceof KeyboardEvent && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }
  setDrawerOpen(open);
};

  const navItems = [
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
          <ListItem 
            key={item.text} 
            component={RouterLink} 
            to={item.link} 
            sx={{ cursor: 'pointer' }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        bgcolor: 'background.default',
        width: '100%',
      }}>
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
            {!isSmallScreen && navItems.map((item) => (
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

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {drawer}
        </Drawer>

        <Container component="main" maxWidth={false} sx={{ 
          mt: { xs: 4, sm: 8 }, 
          mb: 2, 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: '0 24px',
        }}>
          <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            Welcome to CreditSea
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            Your trusted platform for seamless personal loans.
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 4, 
            width: '100%', 
            justifyContent: 'center',
            mb: 6,
          }}>
            <Card elevation={3} sx={{ width: { xs: '100%', md: '30%' }, maxWidth: '350px' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" align="center">
                  Apply for a Loan
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Get started with your loan application today. Quick and easy process.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  size="large"
                  startIcon={<AttachMoney />}
                  component={RouterLink}
                  to="/loan-application"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Start Application
                </Button>
              </CardActions>
            </Card>

            <Card elevation={3} sx={{ width: { xs: '100%', md: '30%' }, maxWidth: '350px' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" align="center">
                  Check Your Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  View your loan status and account information in one place.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  size="large"
                  startIcon={<Dashboard />}
                  component={RouterLink}
                  to="/dashboard"
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Go to Dashboard
                </Button>
              </CardActions>
            </Card>

            <Card elevation={3} sx={{ width: { xs: '100%', md: '30%' }, maxWidth: '350px' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" align="center">
                  Learn More
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Discover how CreditSea can help you achieve your financial goals.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  size="large"
                  startIcon={<Info />}
                  component={RouterLink}
                  to="/about"
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  About Us
                </Button>
              </CardActions>
            </Card>
          </Box>

          <Box sx={{ width: '100%', maxWidth: '800px', mb: 6 }}>
            <Typography variant="h4" gutterBottom align="center">
              Why Choose CreditSea?
            </Typography>
            <Typography variant="body1" paragraph align="center">
              CreditSea offers competitive rates, flexible terms, and a seamless online application process. Our dedicated team is committed to helping you find the right loan solution to meet your financial needs.
            </Typography>
            <Typography variant="body1" paragraph align="center">
              Experience hassle-free borrowing with personalized support at every step.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Homepage;
