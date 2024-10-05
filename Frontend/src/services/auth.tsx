import axios from "axios";

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
export async function fetchCredentials() {
  try {
      const response = await axiosInstance.get("/auth/fetch-auth");
       console.log(response,"response")
    return response.data;
  } catch (error) {
    return null;
  }
}

// Register User
export async function registerUser(email, password) {
     
  try {
    const response = await axiosInstance.post("/auth/register", {
      email,
      password,
    });
     console.log(response,"response")
    return response;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return { message: "User already exists" };
    } else {
      return null;
    }
  }
}

// Login User
export async function loginUser(email, password) {
  
  try {
    email = email.toLowerCase();
      const response = await axiosInstance.post("/auth/login", { email, password });
      console.log(response,"response")
    return response;
  } catch (error) {
    return null;
  }
}
