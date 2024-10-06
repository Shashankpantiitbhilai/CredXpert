import { Container, Typography, Box, Card, CardContent, CardActions, Button } from '@mui/material';
import { AttachMoney, Dashboard, Info } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import { AdminContext } from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Import the Navbar component

import { CssBaseline } from '@mui/material';  // Correct import for CssBaseline

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

// Define a type for the user context
interface User {
  role: 'user' | 'admin' | 'verifier';
}

const Homepage: React.FC = () => {
  const { user } = useContext(AdminContext) as { user: User };

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
            {user?.role === "user" && <Card elevation={3} sx={{ width: { xs: '100%', md: '30%' }, maxWidth: '350px' }}>
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
            }
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
                  to={user?.role === 'admin' ? '/admin-dashboard' : user?.role === 'verifier' ? '/verifier-dashboard' : '/userDashboard'}
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Go to Dashboard
                </Button>
              </CardActions>
            </Card>

           
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Homepage;
