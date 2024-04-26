import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface DarkModeContextType {
  darkMode: string;
  setDarkMode: Dispatch<SetStateAction<string>>;
}

const defaultContextValue: DarkModeContextType = {
  darkMode: '',
  setDarkMode: () => {},
};

const DarkModeContext = createContext(defaultContextValue);

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Retrieve theme preference from local storage or use default
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? savedTheme : '';
  });

  // Effect to store theme preference in local storage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDarkMode('dark');
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
