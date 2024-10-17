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
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
  useTheme,
  styled,
} from "@mui/material";
import { 
  Lock as LockIcon,
  Email as EmailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CreditCard as CreditCardIcon,
  Security as SecurityIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';
import { loginUser } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
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
  opacity: 0.1,
  zIndex: 0,
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw))',
}));

interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

function Login() {
  const { register, handleSubmit, formState, setError, clearErrors } = useForm<LoginFormData>();
  const { errors } = formState;
  const { setUser } = useContext(AdminContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data.email, data.password);
      if (response?.user) {
        const user = response.user;
        setUser(user);
        toast.success("Login successful", { autoClose: 2000 });
        navigate(user.role === "user" ? "/" : `/${user.role}-dashboard`);
      } else if (response?.status === 401) {
        setError("email", { type: "manual", message: "Invalid credentials" });
        toast.error("Invalid credentials", { autoClose: 2000 });
      } else {
        toast.error("An unknown error occurred", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login", { autoClose: 2000 });
    } finally {
      setTimeout(() => clearErrors("email"), 2000);
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
              <Typography variant="h3" component="h1" color="primary.main" fontWeight="bold">
                CreditSea
              </Typography>
            </Box>

            {/* Features */}
            <FeatureBox>
              <AnalyticsIcon />
              <Box>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Smart Credit Management
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Navigate your financial journey with confidence
                </Typography>
              </Box>
            </FeatureBox>

            <FeatureBox>
              <SecurityIcon />
              <Box>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Enterprise Security
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Your data is protected with bank-level encryption
                </Typography>
              </Box>
            </FeatureBox>
          </Box>
        </Grid>

        {/* Right side - Login Form */}
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
              <LockIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography component="h1" variant="h4" gutterBottom>
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Please sign in to your account
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
                  helperText={errors.email?.message as string | undefined}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handlePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
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
                  helperText={errors.password?.message as string | undefined}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <FormControlLabel
                    control={<Checkbox color="primary" {...register("rememberMe")} />}
                    label="Remember me"
                  />
                 
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                >
                  Sign In
                </Button>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2">
                    Don't have an account?{' '}
                    <MuiLink component={Link} to="/register" variant="body2" color="primary">
                      Sign up now
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

export default Login;