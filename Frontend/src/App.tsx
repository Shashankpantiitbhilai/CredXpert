import "./App.css";
import { useEffect, useState, createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./routes";
import { fetchCredentials } from "./services/auth";
import { CircularProgress, Container } from "@mui/material"; // Import CircularProgress

// Create contexts
const AdminContext = createContext("");

function App() {
    const [IsUserLoggedIn, setIsUserLoggedIn] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchCredentials().then((User) => {
            if (User) {
                setIsUserLoggedIn(User);
            }
            setIsLoading(false);
        });

        // Load the theme preference from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    return (
        <AdminContext.Provider value={{ IsUserLoggedIn, setIsUserLoggedIn }}>
            {isLoading ? ( // Check if loading
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
