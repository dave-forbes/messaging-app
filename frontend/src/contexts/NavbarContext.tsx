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
  isConversationListOpen: boolean;
  setIsConversationListOpen: Dispatch<SetStateAction<boolean>>;
  isProfileOpen: boolean;
  setIsProfileOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: NavContextType = {
  isConversationListOpen: true,
  setIsConversationListOpen: () => {},
  isProfileOpen: false,
  setIsProfileOpen: () => {},
};

const NavbarContext = createContext(defaultContextValue);

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isConversationListOpen, setIsConversationListOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    // If conversationListOpen is open, close isProfileOpen
    if (isConversationListOpen) {
      setIsProfileOpen(false);
    }
  }, [isConversationListOpen]);

  useEffect(() => {
    // If isProfileOpen is open, close conversationListOpen
    if (isProfileOpen) {
      setIsConversationListOpen(false);
    }
  }, [isProfileOpen]);

  return (
    <NavbarContext.Provider
      value={{
        isConversationListOpen,
        setIsConversationListOpen,
        isProfileOpen,
        setIsProfileOpen,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
