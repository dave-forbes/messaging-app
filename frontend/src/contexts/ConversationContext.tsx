import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { ConversationI } from "../interfaces/interfaces";

interface ConversationContextType {
  currentConversation: ConversationI | null;
  setCurrentConversation: Dispatch<SetStateAction<ConversationI | null>>;
}

const defaultContextValue: ConversationContextType = {
  currentConversation: null,
  setCurrentConversation: () => {},
};

const ConversationContext = createContext(defaultContextValue);

export const useConversation = () => useContext(ConversationContext);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentConversation, setCurrentConversation] =
    useState<ConversationI | null>(null);

  return (
    <ConversationContext.Provider
      value={{ currentConversation, setCurrentConversation }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
