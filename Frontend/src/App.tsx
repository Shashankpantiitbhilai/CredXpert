import "./App.css";
import { useEffect, useState, createContext, Dispatch, SetStateAction } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./routes";
import { fetchCredentials, AuthResponse } from "./services/auth";
import { CircularProgress, Container } from "@mui/material";

interface AdminContextType {
  user: AuthResponse['user'] | null;
  setUser: Dispatch<SetStateAction<AuthResponse['user'] | null>>;
}

const AdminContext = createContext<AdminContextType>({
  user: null,
  setUser: () => null,
});

function App() {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
    fetchCredentials().then((response) => {
      if (response) {
        console.log(response)
        setUser(response);
      }
      setIsLoading(false);
    });

  
  }, []);

  return (
    <AdminContext.Provider value={{ user, setUser }}>
      {isLoading ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
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