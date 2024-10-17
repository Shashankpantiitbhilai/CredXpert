import { Request, Response } from 'express'; // Import the types for Request and Response
import User from '../models/user.js'; // Import the User model
import { z } from 'zod';


const UserSchema = z.object({
  email: z.string().email(),
  role: z.enum(['user', 'admin', 'verifier']),
});


export const getInfo = async (req: Request, res: Response): Promise<void> => {
  try {
   
    const users = await User.find();
console.log(users)
   
   
 
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
console.log(userId,"deleting users")
  try {
    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    // If the user does not exist, return a 404 response
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Send a success response
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const editUser = async (req:Request, res:Response) :  Promise<void>=>{
  const userId = req.params.id; // Get the user ID from the URL
  const { role } = req.body; // Get the new role from the request body

  // Validate the incoming role (optional)
  console.log(req.body,userId)

  try {
    // Find the user by ID and update the role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role }, // Update the role
      { new: true, runValidators: true } // Return the updated document
    );
console.log(updatedUser,"updatedUser")
    // Check if user was found and updated
    if (!updatedUser) {
       res.status(404).json({ message: 'User not found' });
    }

    // Respond with the updated user
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    // Handle errors (e.g., invalid ObjectId format)
    if (error) {
      res.status(400).json({ message: 'Invalid user ID' });
    }

    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
