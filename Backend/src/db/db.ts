import mongoose from "mongoose";
import dotenv from 'dotenv';
export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process?.env?.MONGO_URI || "mongouri");
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit process with failure
    }
};


