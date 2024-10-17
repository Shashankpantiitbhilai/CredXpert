import { useContext } from "react";
import { AdminContext } from "../App";
import { 
  Button, 
  TextField, 
  Container, 
  Box, 
  Typography, 
  Paper,
  Grid,
  InputAdornment,
  Link as MuiLink,
  useTheme,
  styled,
} from "@mui/material";
import { 
  PersonAdd as PersonAddIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CreditCard as CreditCardIcon,
  Security as SecurityIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';
import { useNavigate, Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "../services/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

// Custom styled components
const FeatureBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  '& .MuiSvgIcon-root': {
    fontSize: 40,
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  '& .MuiTypography-h6': {
    color: theme.palette.primary.dark,
  },
  '& .MuiTypography-body1': {
    color: theme.palette.text.primary,
  }
}));

const WaveBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.05,
  zIndex: 0,
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw))',
}));

interface RegistrationFormData {
  email: string;
  password: string;
}

function Registration() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<RegistrationFormData>();
  const { setUser } = useContext(AdminContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    try {
      const response = await registerUser(data.email, data.password);
      if (response?.user) {
        setUser(response.user);
        toast.success("Registration successful", { autoClose: 2000 });
        navigate("/");
      } else if (response?.status === 400) {
        setError("email", { type: "manual", message: response.message });
        toast.error(response?.message, { autoClose: 2000 });
      } else {
        toast.error("An unknown error occurred", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration", { autoClose: 2000 });
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
      <ToastContainer />
      <Grid container sx={{ height: '100%' }}>
        {/* Left side - Branding and Features */}
        <Grid item xs={false} sm={false} md={6} 
          sx={{ 
            position: 'relative',
            bgcolor: 'background.paper',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            px: 8,
          }}
        >
          <WaveBackground />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Logo and Brand */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
              <CreditCardIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography 
                variant="h3" 
                component="h1" 
                color="primary.main" 
                fontWeight="bold"
              >
                CreditSea
              </Typography>
            </Box>

            {/* Features */}
            <FeatureBox>
              <AnalyticsIcon />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Smart Credit Management
                </Typography>
                <Typography variant="body1">
                  Navigate your financial journey with confidence
                </Typography>
              </Box>
            </FeatureBox>

            <FeatureBox>
              <SecurityIcon />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Enterprise Security
                </Typography>
                <Typography variant="body1">
                  Your data is protected with bank-level encryption
                </Typography>
              </Box>
            </FeatureBox>
          </Box>
        </Grid>

        {/* Right side - Registration Form */}
        <Grid item xs={12} md={6} component={Paper} square>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 'sm',
                width: '100%',
              }}
            >
              <PersonAddIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography component="h1" variant="h4" gutterBottom>
                Create Account
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Join CreditSea today
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box 
                          component="button"
                          type="button"
                          onClick={handlePasswordVisibility}
                          sx={{ 
                            border: 'none',
                            background: 'none',
                            padding: 0,
                            cursor: 'pointer'
                          }}
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 16,
                      message: "Password must not exceed 16 characters",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                >
                  Create Account
                </Button>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2">
                    Already have an account?{' '}
                    <MuiLink component={Link} to="/login" variant="body2" color="primary">
                      Sign in
                    </MuiLink>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Registration;