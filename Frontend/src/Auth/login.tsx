import { useContext } from "react";
import { AdminContext } from "../App";
import { Button, TextField, Container, Box, Typography } from "@mui/material";
import { loginUser } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/system";

// Styled components using MUI's styled utility
const LoginContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const LoginForm = styled(Box)({
  width: "100%",
  maxWidth: "400px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#fff",
  textAlign: "center",
});

// Interface for the login form data
interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const { register, handleSubmit, formState, setError, clearErrors } = useForm<LoginFormData>();
  const { errors } = formState;
  const { setUser } = useContext(AdminContext);
  const navigate = useNavigate();

  // Handling the form submission
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data.email, data.password);
      console.log(response);
      if (response?.user) {
        const user = response.user;
        if (user?.role==="user") {
          setUser(user);
          toast.success("Login successful", { autoClose: 2000 });
          navigate("/");
        }
           if (user?.role==="verifier") {
          setUser(user);
          toast.success("Login successful", { autoClose: 2000 });
          navigate("/verifier-dashboard");
        }
           if (user?.role==="admin") {
          setUser(user);
          toast.success("Login successful", { autoClose: 2000 });
          navigate("/admin-dashboard");
        }
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
      setTimeout(() => {
        clearErrors("email");
      }, 2000);
    }
  };

  return (
    <LoginContainer>
      <ToastContainer />
      <LoginForm>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography variant="h4" gutterBottom>
            Sign In
          </Typography>

          {/* Email field with validation */}
          <TextField
            fullWidth
            label="Email"
            margin="normal"
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

          {/* Password field with validation */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?
            <Link to="/register"> Register</Link>
          </Typography>
        </Box>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
