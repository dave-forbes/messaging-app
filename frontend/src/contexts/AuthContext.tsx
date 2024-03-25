import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
  // Define your user properties here
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (userData: User) => {
    try {
      const response = await fetch(`http://localhost:3000/users/login`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(`${response.status}: ${data.message}`);
      }

      const data = await response.json();
      const token = data.token;

      // log in successful, check token and store data

      if (token) {
        setUser(userData);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const logout = () => {
    // Logic to log out user
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
