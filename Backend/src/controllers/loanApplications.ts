import { Request, Response } from 'express';
 // Adjust the import path as needed
import LoanModel from '../models/loan.js'; // Import the Loan model
import { z } from 'zod';

export const submitLoanApplication = async (req: Request, res: Response) => {
  try {
    // Validate the request body against the LoanSchema
      const loanData = req.body;
     // Set initial status to 'pending'
      

    // Save the loan application to the database
    const savedLoan = await LoanModel.create(loanData);

    res.status(201).json({
      message: 'Loan application submitted successfully',
      applicationId: savedLoan._id, // Use the actual ID from the saved document
      status: savedLoan.status
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod validation error
      res.status(400).json({
        message: 'Invalid loan application data',
        errors: error.errors
      });
    } else {
      console.error('Error processing loan application:', error);
      res.status(500).json({
        message: 'An error occurred while processing your application'
      });
    }
  }
};




export const getLoansByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId;
        console.log(userId);

        const loans = await LoanModel.find({ userId });
        console.log(loans);

        if (loans.length === 0) {
            res.status(404).json({
                message: 'No loan applications found for this user.',
            });
            return;
        }
        else {
            res.status(200).json({
                message: 'Loan applications retrieved successfully.',
                loans,
            });
        }
    } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({
      message: 'An error occurred while fetching loan applications.',
    });
  }
};




export const getAllLoans = async (req: Request, res: Response): Promise<void> => {
    try {
       
        const loans = await LoanModel.find();
        console.log(loans);

        if (loans.length === 0) {
            res.status(404).json({
                message: 'No loan applications found for this user.',
            });
            return;
        }
        else {
            res.status(200).json({
                message: 'Loan applications retrieved successfully.',
                loans,
            });
        }
    } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({
      message: 'An error occurred while fetching loan applications.',
    });
  }
};



export const reviewLoan = async (req: Request, res: Response): Promise<void> => {
  const { loanId, status } = req.body; // Extract loanId and status from request body


  try {
    // Find the loan application by ID and update its status
    const updatedLoan = await LoanModel.findByIdAndUpdate(
      loanId,
      { status },
      { new: true, runValidators: true } // Return the updated document
    );

  

    // Check if the loan was found and updated
    if (!updatedLoan) {
      // Simply call the response without returning it
      res.status(404).json({ message: 'Loan application not found.' });
      return; // Exit the function after sending the response
    }

    // If loan is found and updated
    res.status(200).json({
      message: 'Loan application reviewed successfully.',
      loan: updatedLoan, // Return the updated loan
    });
  } catch (error) {
    console.error('Error reviewing loan:', error);
    res.status(500).json({ message: 'An error occurred while reviewing the loan.' });
  }
};
