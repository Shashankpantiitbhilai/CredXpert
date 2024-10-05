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

export const submitLoanApplication = async (loanData) => {
  try {
    const response = await axiosInstance.post('/loan-application', loanData);
    return response.data;
  } catch (error) {
    console.error('Error submitting loan application:', error);
    throw error;
  }
};
export const getAllLoans = async (userId) => {
    try {
      console.log(userId,"userId")
    const response = await axiosInstance.get(`/getAllLoans/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching loans:', error);
    throw error;
  }
};