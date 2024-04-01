import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { UserI } from "../interfaces/interfaces";
import API_URL from "../utils/apiConfig";

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
      const response = await fetch(`${API_URL}/users/create`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map(
            (error: { msg: string }) => error.msg
          );
          const formattedErrorMessage = errorMessages.join(", ");
          throw new Error(`${response.status}: ${formattedErrorMessage}`);
        } else {
          throw new Error(`${response.status}: ${data.message}`);
        }
      }
      return data;
    } catch (error) {
      return error;
    }
  };

  const login = async (userData: UserI) => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`${response.status}: ${data.message}`);
      }
      const token = data.token;
      const user = data.user;
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
