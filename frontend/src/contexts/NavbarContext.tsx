import {
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
  isUpdateProfileOpen: boolean;
  setIsUpdateProfileOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: NavContextType = {
  isConversationListOpen: false,
  setIsConversationListOpen: () => {},
  isProfileOpen: false,
  setIsProfileOpen: () => {},
  isCreateConversationOpen: false,
  setIsCreateConversationOpen: () => {},
  isAppInfoOpen: false,
  setIsAppInfoOpen: () => {},
  isUpdateProfileOpen: false,
  setIsUpdateProfileOpen: () => {},
};

const NavbarContext = createContext(defaultContextValue);

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isConversationListOpen, setIsConversationListOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreateConversationOpen, setIsCreateConversationOpen] =
    useState(false);
  const [isAppInfoOpen, setIsAppInfoOpen] = useState(false);
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);

  const allSetStates = [
    setIsAppInfoOpen,
    setIsConversationListOpen,
    setIsCreateConversationOpen,
    setIsProfileOpen,
    setIsUpdateProfileOpen,
  ];

  const useEffectNavElements = (
    state: Boolean,
    setState: Dispatch<SetStateAction<boolean>>
  ) => {
    useEffect(() => {
      if (state) {
        const excludedSetStates = allSetStates.filter(
          (item) => setState !== item
        );
        excludedSetStates.forEach((setState) => setState(false));
      }
    }, [state]);
  };

  useEffectNavElements(isConversationListOpen, setIsConversationListOpen);
  useEffectNavElements(isProfileOpen, setIsProfileOpen);
  useEffectNavElements(isCreateConversationOpen, setIsCreateConversationOpen);
  useEffectNavElements(isAppInfoOpen, setIsAppInfoOpen);
  useEffectNavElements(isUpdateProfileOpen, setIsUpdateProfileOpen);

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
        isUpdateProfileOpen,
        setIsUpdateProfileOpen,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
