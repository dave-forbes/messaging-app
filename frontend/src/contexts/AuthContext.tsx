import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

export interface UserI {
  username: string;
  password: string;
  token?: string;
  _id: string;
}

interface AuthContextType {
  user: UserI | null;
  login: (userData: UserI) => void;
  logout: () => void;
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

  const login = async (userData: UserI) => {
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
      const user = data.user;
      user.token = token;
      console.log(user);

      // log in successful, check token and store data

      if (token) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const logout = () => {
    // Logic to log out user
    localStorage.removeItem("user");
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
