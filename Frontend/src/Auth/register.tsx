import { Button, TextField, Container, Box, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "../services/auth"; // Ensure this function is correctly typed
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// Define an interface for form data
interface RegistrationFormData {
  email: string;
  password: string;
}

const RegistrationContainer = styled(Container)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}));

const RegistrationForm = styled(Box)(() => ({
  width: "100%",
  maxWidth: "400px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#fff",
  textAlign: "center",
}));

function Registration() {
  const form = useForm<RegistrationFormData>(); // Specify the form data type
  const { register, handleSubmit, formState, setError } = form;
  const { errors } = formState;
  const navigate = useNavigate();

  // Define the onSubmit function with proper typing
  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    try {
      const response = await registerUser(data.email, data.password);
      console.log(response);
      // Handle based on backend response status
      if (response?.status === 201) {
        toast.success("Registration successful", { autoClose: 2000 });
        navigate("/"); // Redirect to login after successful registration
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
    <RegistrationContainer>
      <ToastContainer />
      <RegistrationForm component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="h4" gutterBottom>
          Register
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </RegistrationForm>
    </RegistrationContainer>
  );
}

export default Registration;
