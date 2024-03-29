import { useEffect, useState } from "react";
import Conversation from "../Conversation/Conversation";
import styles from "./ConversationList.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useConversation } from "../../contexts/ConversationContext";
import { useNavbar } from "../../contexts/NavbarContext";

export default function ConversationList() {
  const { user } = useAuth();
  const { setIsConversationListOpen, setIsCreateConversationOpen } =
    useNavbar();
  const { currentConversation, setCurrentConversation } = useConversation();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Fetch messages belonging to the current conversation
    fetchConversations();
  }, [currentConversation]);

  const fetchConversations = async () => {
    try {
      if (user) {
        const response = await fetch(
          `http://localhost:3000/conversations/user/${user._id}`,
          {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            referrerPolicy: "no-referrer",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`, // Include JWT token in the Authorization header
            },
          }
        );
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div className={styles.conversationListContainer}>
      <div className={styles.listWrapper}>
        <h1 className={styles.title}>Conversations</h1>
        <ul className={styles.conversationList}>
          {conversations.map((conversation: any): any => (
            <Conversation
              key={conversation._id}
              title={conversation.title}
              lastUpdated={conversation.updatedAt}
              onClick={() => {
                setCurrentConversation(conversation);
                setIsConversationListOpen(false);
              }}
            />
          ))}
        </ul>
        <button
          className={styles.button}
          onClick={() => setIsCreateConversationOpen(true)}
        >
          Create
        </button>
      </div>
    </div>
  );
}
