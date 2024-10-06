import "./App.css";
import { useEffect, useState, createContext, Dispatch, SetStateAction } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./routes";
import { fetchCredentials } from "./services/auth";
import { CircularProgress, Container } from "@mui/material";

// Define the shape of the user object (adjust based on what your user data looks like)
interface User {
  _id: string;
  name: string;
 
  // Add other user details here
}

// Define the shape of the context
interface AdminContextType {
  IsUserLoggedIn: User | null; // Change to User | null
  setIsUserLoggedIn: Dispatch<SetStateAction<User | null>>; // Update setter type accordingly
}

// Create contexts with proper typing
const AdminContext = createContext<AdminContextType>({
  IsUserLoggedIn: null, // Start with null for no user logged in
  setIsUserLoggedIn: () => null, // Provide a default no-op function for setIsUserLoggedIn
});

function App() {
  const [IsUserLoggedIn, setIsUserLoggedIn] = useState<User | null>(null); // Update type for the user object
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchCredentials().then((User) => {
      if (User) {
        setIsUserLoggedIn(User); // Set the user object
      } else {
        setIsUserLoggedIn(null); // If no user, set null
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <AdminContext.Provider value={{ IsUserLoggedIn, setIsUserLoggedIn }}>
      {isLoading ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Full height for centering
          }}
        >
          <CircularProgress /> {/* Show the loader */}
        </Container>
      ) : (
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      )}
    </AdminContext.Provider>
  );
}

export { AdminContext };
export default App;
