import express from 'express';
import session from 'express-session';
import passport from './config/passportConfig.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/login.js';
import Routes from './routes/utils.js';
import dotenv from 'dotenv';
import { connectToDatabase } from './db/db.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up CORS based on environment
const mode = process.env.NODE_ENV || 'development';
const origin = mode === 'production'
  ? process.env.FRONTEND_PROD // Production frontend URL
  : process.env.FRONTEND_DEV; // Development frontend URL

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Set up CORS middleware
app.use(cors({
  origin, 
  credentials: true,
}));

// Session handling
const sessionConfig: session.SessionOptions = {
  secret: process.env.SESSION_SECRET || "keyboard cat",
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: mode === 'production', // Set secure cookie only in production
    httpOnly: true,
    sameSite: 'none', // Allow cross-site cookies
  },
};

// Use session middleware
app.use(session(sessionConfig));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection with error handling
connectToDatabase();

// Use the user routes
app.use('/auth', userRoutes);
app.use('/', Routes);

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
