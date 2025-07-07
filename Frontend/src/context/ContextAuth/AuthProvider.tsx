import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // Use useEffect when i want to set the data from localStorage or use it above in useState
  // useEffect(() => {
  //     const localUsername = localStorage.getItem('username')
  //     const LocalToken = localStorage.getItem('token')
  //     setUsername(localUsername)
  //     setToken(LocalToken)
  // },[])

  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };
  // chaeck isAuthenticated
  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider value={{ username, token, login, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
