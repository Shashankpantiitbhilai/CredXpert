import { Request, Response, NextFunction } from 'express';
import User from '../models/user.js';
import { MongoError } from 'mongodb';
import passportConfig from "../config/passportConfig.js"


// Updated function signature for registerUser
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;
console.log(req.body,"req.body")
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required.' });
    return;
  }

  try {
    const newUser = await User.register(new User({ email }), password);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error: unknown) {
    if (error instanceof MongoError && error.code === 11000) {
      res.status(400).json({ message: 'Email is already in use.' });
    } else if (error instanceof Error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// Update other function signatures similarly
export const loginUser = (req: Request, res: Response, next: NextFunction): void => {
  console.log("Request body:", req.body); // Log the incoming request body

  passportConfig.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return res.status(500).json({ message: 'Authentication error', error: err });
    }

    if (!user) {
      console.log("Authentication failed:", info.message);
      return res.status(401).json({ message: info.message }); // Send error message if user not found
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed', error: err });
      }
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next); // Call the function with req, res, next
};
export const logoutUser = (req: Request, res: Response, next: NextFunction): void => {
  req.logout((err: any) => {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Error logging out', error: err.message });
    } else {
      res.status(200).json({ message: 'Logout successful' });
    }
  });
};
export const fetchAuth = (req: Request, res: Response): void => {
  console.log(req.user)
  if (req.isAuthenticated()) {
    res.json(req.user); // If authenticated, return user object
  } else {
    res.json(null); // If not authenticated, return null
  }
};