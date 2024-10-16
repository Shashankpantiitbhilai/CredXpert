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
