import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface NavContextType {
  conversationListOpen: boolean;
  setConversationListOpen: Dispatch<SetStateAction<boolean>>;
  isProfileOpen: boolean;
  setIsProfileOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: NavContextType = {
  conversationListOpen: true,
  setConversationListOpen: () => {},
  isProfileOpen: false,
  setIsProfileOpen: () => {},
};

const NavbarContext = createContext(defaultContextValue);

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [conversationListOpen, setConversationListOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    // If conversationListOpen is open, close isProfileOpen
    if (conversationListOpen) {
      setIsProfileOpen(false);
    }
  }, [conversationListOpen]);

  useEffect(() => {
    // If isProfileOpen is open, close conversationListOpen
    if (isProfileOpen) {
      setConversationListOpen(false);
    }
  }, [isProfileOpen]);

  return (
    <NavbarContext.Provider
      value={{
        conversationListOpen,
        setConversationListOpen,
        isProfileOpen,
        setIsProfileOpen,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
