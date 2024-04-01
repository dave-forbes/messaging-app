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
  isAppInfoOpen: boolean;
  setIsAppInfoOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: NavContextType = {
  isConversationListOpen: true,
  setIsConversationListOpen: () => {},
  isProfileOpen: false,
  setIsProfileOpen: () => {},
  isCreateConversationOpen: false,
  setIsCreateConversationOpen: () => {},
  isAppInfoOpen: false,
  setIsAppInfoOpen: () => {},
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
  const [isAppInfoOpen, setIsAppInfoOpen] = useState(false);

  useEffect(() => {
    if (isConversationListOpen) {
      setIsProfileOpen(false);
      setIsCreateConversationOpen(false);
      setIsAppInfoOpen(false);
    }
  }, [isConversationListOpen]);

  useEffect(() => {
    if (isProfileOpen) {
      setIsConversationListOpen(false);
      setIsCreateConversationOpen(false);
      setIsAppInfoOpen(false);
    }
  }, [isProfileOpen]);

  useEffect(() => {
    if (isCreateConversationOpen) {
      setIsConversationListOpen(false);
      setIsProfileOpen(false);
      setIsAppInfoOpen(false);
    }
  }, [isCreateConversationOpen]);

  useEffect(() => {
    if (isAppInfoOpen) {
      setIsConversationListOpen(false);
      setIsProfileOpen(false);
      setIsCreateConversationOpen(false);
    }
  }, [isAppInfoOpen]);

  return (
    <NavbarContext.Provider
      value={{
        isConversationListOpen,
        setIsConversationListOpen,
        isProfileOpen,
        setIsProfileOpen,
        isCreateConversationOpen,
        setIsCreateConversationOpen,
        isAppInfoOpen,
        setIsAppInfoOpen,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
