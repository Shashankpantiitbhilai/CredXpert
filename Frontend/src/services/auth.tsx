import axios, { AxiosError, AxiosResponse } from "axios";

// Define a more specific type for your response data.
interface AuthResponse {
  message?: string; // Include other fields based on your actual response
  // Add more fields as needed
  status?: number;
}

// Set baseURL for axios instance
const baseURL =
  import.meta.env.NODE_ENV === "production"
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
export async function fetchCredentials(): Promise<AuthResponse | null> {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.get("/auth/fetch-auth");
    console.log(response, "response");
    return response.data;
  } catch (error) {
    console.error('Error fetching credentials:', error); // Log the error for debugging
    return null; // Return null if there's an error
  }
}

// Register User
export async function registerUser(email: string, password: string): Promise<AuthResponse | null> {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post("/auth/register", {
      email,
      password,
    });
    console.log(response, "response");
    return response.data; // Return the response data
  } catch (error) {
    if (error instanceof AxiosError) { // Check if error is an instance of AxiosError
      if (error.response && error.response.status === 400) {
        return { message: "User already exists" };
      }
    }
    console.error('Error during registration:', error); // Log the error for debugging
    return null;
  }
}

// Login User
export async function loginUser(email: string, password: string): Promise<AuthResponse | null> {
  try {
    email = email.toLowerCase(); // Normalize email to lowercase
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post("/auth/login", { email, password });
    console.log(response, "response");
    return response.data; // Return the response data
  } catch (error) {
    if (error instanceof AxiosError) { // Check if error is an instance of AxiosError
      console.error('Error during login:', error); // Log the error for debugging
    }
    return null;
  }
}
