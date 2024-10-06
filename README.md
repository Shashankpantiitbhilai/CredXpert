# Loan Manager Application

This project is a **Loan Manager Application** built for CreditSea's Full Stack Intern assignment. The primary goal of this application is to integrate the user application form with a dashboard that displays statistics, using **TypeScript** and **Node.js** for backend development, and **MongoDB** for managing user data.

## 🚀 Live Demo

Check out the live application here: [https://creditsea2.onrender.com/](https://creditsea2.onrender.com/)



## 📂 Project Structure

The project is divided into two main parts:
1. **Frontend** (React with Vite) – A simple yet functional frontend to submit loan application forms.
2. **Backend** (Node.js with TypeScript) – A backend that processes form data, stores it in MongoDB, and updates the dashboard with real-time statistics.

---

## 🛠️ Features

- **Form Submission**: Users can fill out a loan application form and submit their details.
- **Dashboard**: Displays statistics based on submitted loan applications.
- **Backend Logic**: Handles multiple user inputs, connects to MongoDB, and updates the dashboard.
- **Responsive Design**: Works across different device sizes (adjusted based on the Figma design).
  
---

## 🖥️ Tech Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, TypeScript
- **Database**: MongoDB
- **Design**: Figma

---

## 📁 How to Run the Project Locally

1. **Clone the Repository**
   ```bash
   git clone [GitHub Repository Link]
   cd loan-manager-app
2. **Install Dependencies**
   - For Frontend:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```
   - For Backend:
     ```bash
     cd backend
     npm install
     npm run dev
     ```

3. **Environment Variables**
   - Set up a `.env` file in the backend folder with your MongoDB connection string and necessary environment variables:
     ```env
     MONGO_URI=your-mongodb-connection-string
     PORT=5000
     ```

4. **Run the Application**
   - Start both the frontend and backend servers:
     ```bash
     # Frontend
     npm run dev

     # Backend
     npm start
     ```

---

## 📊 Dashboard Statistics

The dashboard provides real-time statistics about the loan applications submitted by users, including:
- Total number of applications.
- Breakdown of applications by loan amount and status (approved, rejected, pending).
- Dynamic data updates for each new form submission.



---




