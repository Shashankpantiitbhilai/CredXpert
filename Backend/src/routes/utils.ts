import { Router } from 'express';
import { submitLoanApplication,getLoansByUserId,getAllLoans,reviewLoan } from '../controllers/loanApplications.js'; // Adjust the import path as needed
import { getInfo,deleteUser,editUser } from '../controllers/adminControllers.js';
const router = Router();

// Route to apply for a new loan
router.post('/loan-application', submitLoanApplication);

// Route to get all loan applications (admin functionality)
router.get('/getAllLoans/:userId', getLoansByUserId);
router.get('/getAllLoans', getAllLoans);
router.patch('/review-loan', reviewLoan);
router.get('/getAllUsers', getInfo);
router.delete('/delete/:id', deleteUser);
router.patch('/editUser/:id', editUser);
export default router;
