import { useContext } from "react";
import { AdminContext } from "../App";
import { Button, TextField, Container, Box, Typography } from "@mui/material";
import { loginUser } from "../services/auth"; // Assuming this service function is implemented
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/system";

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

function Login() {
  const form = useForm();
  const { register, handleSubmit, formState, setError, clearErrors } = form;
  const { errors } = formState;
  const { setIsUserLoggedIn } = useContext(AdminContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data.email, data.password); // Service that makes backend call
        console.log(response);
      // Handle based on backend response status
      if (response?.status === 200) {
        const user = response.data.user;

        // Check if the user is blocked
       

        setIsUserLoggedIn(user);
        toast.success("Login successful", { autoClose: 2000 });

        // Redirect based on user role
        if (user.role === "admin") {
          navigate("/admin_home");
        } else {
          navigate("/");
        }
      } else if (response?.status === 401) {
        setError("login", { type: "manual", message: "Invalid credentials" });
        toast.error("Invalid credentials", { autoClose: 2000 });
      } else {
        toast.error("An unknown error occurred", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login", { autoClose: 2000 });
    } finally {
      setTimeout(() => {
        clearErrors("login");
      }, 2000);
    }
  };

  return (
    <LoginContainer>
      <ToastContainer />
      <LoginForm component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>

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
          helperText={errors.email?.message}
        />

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
          helperText={errors.password?.message}
        />

        {errors.login && (
          <Typography color="error">{errors.login.message}</Typography>
        )}

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
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
