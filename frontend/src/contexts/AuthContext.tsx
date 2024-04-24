import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { UserI } from '../interfaces/interfaces';
import API_URL from '../utils/apiConfig';
import apiFetch from '../utils/apiFetch';

interface AuthContextType {
  user: UserI | null;
  setUser: Dispatch<SetStateAction<UserI | null>>;
  login: (userData: UserI) => any;
  logout: () => void;
  register: (userData: FormData) => any;
  checkTokenIsValid: any;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserI | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (userData: FormData) => {
    try {
      const data = await apiFetch(
        `${API_URL}/users/create`,
        userData,
        undefined,
        'POST',
        false
      );
      return data;
    } catch (error) {
      return error;
    }
  };

  const login = async (userData: UserI) => {
    try {
      const data = await apiFetch(
        `${API_URL}/users/login`,
        userData,
        undefined,
        'POST',
        true
      );
      const { token, user } = data;
      user.token = token;
      if (token) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      }
      return data;
    } catch (error: any) {
      return error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const checkTokenIsValid = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return false; // No user stored, token is invalid
      const { _id, token } = JSON.parse(storedUser);
      await apiFetch(
        `${API_URL}/users/${_id}`, // Assuming this endpoint checks token validity
        {},
        token,
        'GET',
        true
      );
      return true;
    } catch (error) {
      logout(); // Error occurred, log out the user
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        setUser,
        checkTokenIsValid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
