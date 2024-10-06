import axios from "axios";

// Define the type for loan application data
interface LoanData {
  loanAmount: number;
  fullName: string;
  loanTenure: number;
  employmentStatus: string;
  reasonForLoan: string;
  employmentAddress: string;
}

// Define the type for loans response
interface Loan {
  _id: string;
  loanAmount: number;
  fullName: string;
  loanTenure: number;
  employmentStatus: string;
  reasonForLoan: string;
  employmentAddress: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface GetAllLoansResponse {
  loans: Loan[];
}

// Type for the loan application response, modify based on your API response
interface LoanApplicationResponse {
  message: string;
  loanId: string;
}

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

// Function to submit a loan application
export const submitLoanApplication = async (loanData: LoanData): Promise<LoanApplicationResponse> => {
  try {
    const response = await axiosInstance.post('/loan-application', loanData);
    return response.data as LoanApplicationResponse; // Specify the return type
  } catch (error) {
    console.error('Error submitting loan application:', error);
    throw error;
  }
};

// Function to get all loans
export const getAllLoans = async (userId: string): Promise<GetAllLoansResponse> => {
  try {
    const response = await axiosInstance.get(`/getAllLoans/${userId}`);
    return response.data as GetAllLoansResponse; // Ensure the response type matches
  } catch (error) {
    console.error('Error fetching loans:', error);
    throw error;
  }
};
