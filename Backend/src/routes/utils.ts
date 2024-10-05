import { Router } from 'express';
import { submitLoanApplication,getLoansByUserId } from '../controllers/loanApplications.js'; // Adjust the import path as needed

const router = Router();

// Route to apply for a new loan
router.post('/loan-application', submitLoanApplication);

// Route to get all loan applications (admin functionality)
router.get('/getAllLoans/:userId', getLoansByUserId);

export default router;
