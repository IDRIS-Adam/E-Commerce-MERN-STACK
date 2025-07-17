import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";



const USERNAME_KEY = "username";
const TOKEN_KEY = "token";
const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem(USERNAME_KEY)
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );

  // Use useEffect when i want to set the data from localStorage or use it above in useState
  // useEffect(() => {
  //     const localUsername = localStorage.getItem('username')
  //     const LocalToken = localStorage.getItem('token')
  //     setUsername(localUsername)
  //     setToken(LocalToken)
  // },[])

  
  // chaeck isAuthenticated
  const isAuthenticated = !!token;
  
  /// Login fun
  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
  };

  /// Logout fun
  const logout = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUsername(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ username, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
