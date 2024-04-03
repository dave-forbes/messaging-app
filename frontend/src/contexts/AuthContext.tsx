import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { UserI } from "../interfaces/interfaces";
import API_URL from "../utils/apiConfig";
import authFetch from "../utils/authFetch";

interface AuthContextType {
  user: UserI | null;
  login: (userData: UserI) => any;
  logout: () => void;
  register: (userData: UserI) => any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserI | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (userData: UserI) => {
    try {
      const data = await authFetch(`${API_URL}/users/create`, userData);
      return data;
    } catch (error) {
      return error;
    }
  };

  const login = async (userData: UserI) => {
    try {
      const data = await authFetch(`${API_URL}/users/login`, userData);
      const { token, user } = data;
      user.token = token;
      if (token) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      }
      return data;
    } catch (error: any) {
      return error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
