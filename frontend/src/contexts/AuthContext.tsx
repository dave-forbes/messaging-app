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
  checkTokenIsValid: (user: UserI) => Promise<boolean>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserI | null>(null);
  const [loading, setLoading] = useState(true);

  const checkTokenIsValid = async (user: UserI) => {
    try {
      const { _id, token } = user;
      const response = await fetch(`${API_URL}/users/${_id}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        referrerPolicy: 'no-referrer',
      });
      if (!response.ok) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const userExists = async () => {
    setLoading(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const tokenValid = await checkTokenIsValid(parsedUser);
      if (tokenValid) {
        setLoading(false);
        return setUser(parsedUser);
      }
    }
    setLoading(false);
    setUser(null);
  };

  useEffect(() => {
    userExists();
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
        delete user.password;
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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        setUser,
        checkTokenIsValid,
        loading,
        setLoading,
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
