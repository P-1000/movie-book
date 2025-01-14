import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchAuthUser = async () => {
      const user = JSON.parse(localStorage.getItem("bankaiuser")) || JSON.parse(localStorage.getItem("adminuser"))  || null;
      const tok = localStorage.getItem("token") || null;
      setToken(tok);
      setAuthUser(user);
      setIsLoading(false);
    };

    fetchAuthUser();
  }, []);

  const isAuthenticated = !!authUser;

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isAuthenticated,
        isLoading,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
