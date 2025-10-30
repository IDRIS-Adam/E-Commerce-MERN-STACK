import { createContext, useContext } from "react";

interface AuthContextType {
  username: string | null;
  token: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  myOrders: any[];
  getMyOrders: () => void;
  login: (username: string, token: string) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  getMyOrders: () => {},
  myOrders: [],
  login: () => {},
  isAuthenticated: false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
