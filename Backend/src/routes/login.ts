// src/routes/userRoutes.ts
import { Router } from 'express';
import { registerUser, loginUser, logoutUser,fetchAuth } from '../controllers/userController.js';
import passport from 'passport';

const router = Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', loginUser);

// Route to log out a user
router.post('/logout', logoutUser);
router.get('/fetch-auth', fetchAuth);
export default router;
