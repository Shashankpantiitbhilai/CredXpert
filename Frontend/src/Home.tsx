import { Container, Typography, Box, Card, CardContent, CardActions, Button, Grid, Paper, Chip, Stack } from '@mui/material';
import { AttachMoney, Dashboard, Speed, Security, TrendingUp, Assignment, CheckCircle, EmojiEvents } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import { AdminContext } from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
      light: '#42A5F5',
      dark: '#1565C0',
    },
    secondary: {
      main: '#0288D1',
      light: '#03A9F4',
      dark: '#01579B',
    },
    background: {
      default: '#F0F7FF',
      paper: '#FFFFFF',
    },
  },
  typography: {
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      background: 'linear-gradient(45deg, #1976D2 30%, #03A9F4 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: 0.5,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(25, 118, 210, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '12px 24px',
          fontWeight: 600,
        },
      },
    },
  },
});

interface User {
  role: 'user' | 'admin' | 'verifier';
}

const Homepage: React.FC = () => {
  const { user } = useContext(AdminContext) as { user: User };

  const features = [
    { icon: <Speed sx={{ fontSize: 40 }}/>, title: 'Quick Process', description: 'Fast and efficient loan approval process' },
    { icon: <Security sx={{ fontSize: 40 }}/>, title: 'Secure & Safe', description: 'Bank-level security for your data protection' },
    { icon: <TrendingUp sx={{ fontSize: 40 }}/>, title: 'Competitive Rates', description: 'Market-leading interest rates and terms' },
    { icon: <Assignment sx={{ fontSize: 40 }}/>, title: 'Easy Application', description: 'Streamlined online application process' },
  ];

  const highlights = [
    { icon: <CheckCircle />, label: 'Digital-First Platform' },
    { icon: <EmojiEvents />, label: 'Excellence in Service' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            pt: { xs: 8, md: 12 },
            pb: { xs: 6, md: 8 },
            background: 'linear-gradient(180deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.1) 100%)',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '3rem' },
                  }}
                >
                  Welcome to CreditSea
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{
                    color: 'text.secondary',
                    mb: 4,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                  }}
                >
                  Your trusted platform for seamless personal loans.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                  {highlights.map((highlight, index) => (
                    <Chip
                      key={index}
                      icon={highlight.icon}
                      label={highlight.label}
                      sx={{ bgcolor: 'white', fontWeight: 600 }}
                    />
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 2 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                      Experience the Future of Lending
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Our digital platform combines cutting-edge technology with personalized service to provide you with the best lending experience possible.
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Main Actions Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              justifyContent: 'center',
              alignItems: 'stretch',
              mb: 8,
            }}
          >
            {user?.role === "user" && (
              <Card
                sx={{
                  width: { xs: '100%', md: '45%' },
                  maxWidth: 400,
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
                  position: 'relative',
                  overflow: 'visible',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: 'linear-gradient(45deg, #1976D2 30%, #42A5F5 90%)',
                    borderRadius: '16px 16px 0 0',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 2,
                    }}
                  >
                    Apply for a Loan
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{
                      color: 'text.secondary',
                      mb: 3,
                      lineHeight: 1.6,
                    }}
                  >
                    Get started with your loan application today. Quick and easy process.
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                    <Chip label="Quick Approval" size="small" />
                    <Chip label="Low Interest" size="small" />
                    <Chip label="Flexible Terms" size="small" />
                  </Stack>
                </CardContent>
                <CardActions sx={{ p: 4, pt: 0 }}>
                  <Button
                    size="large"
                    startIcon={<AttachMoney />}
                    component={RouterLink}
                    to="/loan-application"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      background: 'linear-gradient(45deg, #1976D2 30%, #42A5F5 90%)',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                    }}
                  >
                    Start Application
                  </Button>
                </CardActions>
              </Card>
            )}

            <Card
              sx={{
                width: { xs: '100%', md: '45%' },
                maxWidth: 400,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
                position: 'relative',
                overflow: 'visible',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: 'linear-gradient(45deg, #0288D1 30%, #03A9F4 90%)',
                  borderRadius: '16px 16px 0 0',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{
                    fontWeight: 700,
                    color: 'secondary.main',
                    mb: 2,
                  }}
                >
                  Check Your Dashboard
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{
                    color: 'text.secondary',
                    mb: 3,
                    lineHeight: 1.6,
                  }}
                >
                  View your loan status and account information in one place.
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  <Chip label="Real-time Updates" size="small" />
                  <Chip label="Easy Track" size="small" />
                  <Chip label="24/7 Access" size="small" />
                </Stack>
              </CardContent>
              <CardActions sx={{ p: 4, pt: 0 }}>
                <Button
                  size="large"
                  startIcon={<Dashboard />}
                  component={RouterLink}
                  to={user?.role === 'admin' ? '/admin-dashboard' : user?.role === 'verifier' ? '/verifier-dashboard' : '/userDashboard'}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{
                    background: 'linear-gradient(45deg, #0288D1 30%, #03A9F4 90%)',
                    boxShadow: '0 4px 12px rgba(2, 136, 209, 0.2)',
                  }}
                >
                  Go to Dashboard
                </Button>
              </CardActions>
            </Card>
          </Box>

          {/* Features Section */}
          <Box sx={{ py: 8 }}>
            <Typography
              variant="h3"
              align="center"
              sx={{
                mb: 6,
                fontWeight: 700,
                background: 'linear-gradient(45deg, #1976D2 30%, #03A9F4 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Why Choose CreditSea?
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      textAlign: 'center',
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: 2,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Homepage;