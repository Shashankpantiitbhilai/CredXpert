import axios, { AxiosResponse } from "axios";

// Define the base URL depending on the environment (development or production)
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

// Define an interface for loan application data
interface LoanApplicationData {
  loanAmount: number;
  loanTenure: number;
  employmentStatus: string;
  reasonForLoan: string;
  employmentAddress: string;
  fullName: string;
}

// Define an interface for the expected response from getAllLoans
interface Loan {
  _id: string;
  loanAmount: number;
  loanTenure: number;
  employmentStatus: string;
  reasonForLoan: string;
  employmentAddress: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

interface GetAllLoansResponse {
  loans: Loan[];
}

// Submit Loan Application
export const submitLoanApplication = async (
  loanData: LoanApplicationData
): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axiosInstance.post('/loan-application', loanData);
    return response.data;
  } catch (error) {
    console.error('Error submitting loan application:', error);
    throw error;
  }
};

// Get All Loans
export const getAllLoans = async (userId: string): Promise<GetAllLoansResponse | null> => {
  try {
    console.log(userId, "userId");
    const response: AxiosResponse<GetAllLoansResponse> = await axiosInstance.get(`/getAllLoans/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching loans:', error);
    throw error;
  }
};
