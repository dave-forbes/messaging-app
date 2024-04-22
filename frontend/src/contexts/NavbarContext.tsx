// The purpose of this context is to manage the open and closed states of all the 'menu' items
// I have set it up so only one can be open at any one time

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

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
  isConversationOptionsOpen: boolean;
  setIsConversationOptionsOpen: Dispatch<SetStateAction<boolean>>;
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
  isConversationOptionsOpen: false,
  setIsConversationOptionsOpen: () => {},
};

const NavbarContext = createContext(defaultContextValue);

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isConversationListOpen, setIsConversationListOpen] =
    useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreateConversationOpen, setIsCreateConversationOpen] =
    useState(false);
  const [isAppInfoOpen, setIsAppInfoOpen] = useState(false);
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] =
    useState(false);
  const [isConversationOptionsOpen, setIsConversationOptionsOpen] =
    useState(false);

  const allSetStates = [
    setIsAppInfoOpen,
    setIsConversationListOpen,
    setIsCreateConversationOpen,
    setIsProfileOpen,
    setIsUpdateProfileOpen,
    setIsConversationOptionsOpen,
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

  useEffectNavElements(
    isConversationListOpen,
    setIsConversationListOpen
  );
  useEffectNavElements(isProfileOpen, setIsProfileOpen);
  useEffectNavElements(
    isCreateConversationOpen,
    setIsCreateConversationOpen
  );
  useEffectNavElements(isAppInfoOpen, setIsAppInfoOpen);
  useEffectNavElements(isUpdateProfileOpen, setIsUpdateProfileOpen);
  useEffectNavElements(
    isConversationOptionsOpen,
    setIsConversationOptionsOpen
  );

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
        isConversationOptionsOpen,
        setIsConversationOptionsOpen,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
