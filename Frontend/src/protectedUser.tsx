import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "./App";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { IsUserLoggedIn } = useContext(AdminContext);
  console.log(IsUserLoggedIn, "isuserloggedin for user");

  if (!IsUserLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
