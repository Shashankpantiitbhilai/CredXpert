
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Auth/login";
import Register from "./Auth/register";
import ProtectedUser from "./protectedUser"
import LoanApplicationForm from "./Form/form";
import UserDashboard from "./userDashboard/userDashBoard.tsx"
const Main = () => {
    

    return (
        <>
         
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                  <Route path="/loan-application" element={<ProtectedUser><LoanApplicationForm/></ProtectedUser> } />
                <Route path="*" element={<Navigate to="/" replace />} />
                  <Route path="/userDashboard" element={<ProtectedUser><UserDashboard/></ProtectedUser> } />
            </Routes>
        </>
    );
};

export default Main;
