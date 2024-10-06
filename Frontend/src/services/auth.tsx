import axios, { AxiosError, AxiosResponse } from "axios";

interface User {
  _id: string;
  email: string;
  // Add other user fields as needed
}

export interface AuthResponse {
  message: string;
  user?: User;
  status?: number;
}

// Set baseURL for axios instance
const baseURL =
  import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_PROD
    : import.meta.env.VITE_BACKEND_DEV;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch Credentials
export async function fetchCredentials() {
  try {
    const response = await axiosInstance.get("/auth/fetch-auth");
    console.log(response.data, "response");
    return response.data;
  } catch (error) {
    console.error('Error fetching credentials:', error);
    return { message: 'Failed to fetch credentials' };
  }
}

// Register User
export async function registerUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post("/auth/register", {
      email,
      password,
    });
    console.log(response, "response");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return { 
        message: error.response.data?.message || 'Registration failed',
        status: error.response.status
      };
    }
    console.error('Error during registration:', error);
    return { message: 'An unexpected error occurred during registration' };
  }
}

// Login User
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    email = email.toLowerCase();
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post("/auth/login", { email, password });
    console.log(response, "response");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return { 
        message: error.response.data?.message || 'Login failed',
        status: error.response.status
      };
    }
    console.error('Error during login:', error);
    return { message: 'An unexpected error occurred during login' };
  }
}