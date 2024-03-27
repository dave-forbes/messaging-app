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
  isCreateConversationOpen: boolean;
  setIsCreateConversationOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: NavContextType = {
  isConversationListOpen: true,
  setIsConversationListOpen: () => {},
  isProfileOpen: false,
  setIsProfileOpen: () => {},
  isCreateConversationOpen: false,
  setIsCreateConversationOpen: () => {},
};

const NavbarContext = createContext(defaultContextValue);

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isConversationListOpen, setIsConversationListOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreateConversationOpen, setIsCreateConversationOpen] =
    useState(false);

  useEffect(() => {
    // If conversationListOpen is open, close isProfileOpen and isCreateConversationOpen
    if (isConversationListOpen) {
      setIsProfileOpen(false);
      setIsCreateConversationOpen(false);
    }
  }, [isConversationListOpen]);

  useEffect(() => {
    // If isProfileOpen is open, close conversationListOpen and isCreateConversationOpen
    if (isProfileOpen) {
      setIsConversationListOpen(false);
      setIsCreateConversationOpen(false);
    }
  }, [isProfileOpen]);

  useEffect(() => {
    // If isCreateConversationOpen is open, close conversationListOpen and isProfileOpen
    if (isCreateConversationOpen) {
      setIsConversationListOpen(false);
      setIsProfileOpen(false);
    }
  }, [isCreateConversationOpen]);

  return (
    <NavbarContext.Provider
      value={{
        isConversationListOpen,
        setIsConversationListOpen,
        isProfileOpen,
        setIsProfileOpen,
        isCreateConversationOpen,
        setIsCreateConversationOpen,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
