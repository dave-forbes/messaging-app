import { useEffect, useState } from "react";
import Conversation from "../Conversation/Conversation";
import styles from "./ConversationList.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useConversation } from "../../contexts/ConversationContext";
import { useNavbar } from "../../contexts/NavbarContext";
import API_URL from "../../utils/apiConfig";
import CircularProgress from "@mui/material/CircularProgress";

export default function ConversationList() {
  const { user } = useAuth();
  const { setIsConversationListOpen, setIsCreateConversationOpen } =
    useNavbar();
  const { currentConversation, setCurrentConversation } = useConversation();
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch conversations when component mounts and when current conversation changes
    fetchConversations();
  }, [currentConversation]);

  const fetchConversations = async () => {
    try {
      if (user) {
        const response = await fetch(
          `${API_URL}/conversations/user/${user._id}`,
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

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Network Error: Failed to connect to server.");
          } else {
            const data = await response.json();
            throw new Error(`${response.status}: ${data.message}`);
          }
        }
        const data = await response.json();
        setConversations(data);
        setError("");
        setLoading(false);
      }
    } catch (error: any) {
      setError(error.toString());
    }
  };

  return (
    <div className={styles.conversationListContainer}>
      <div className={styles.listWrapper}>
        <h1 className={styles.title}>Conversations</h1>
        <ul className={styles.conversationList}>
          {loading && <CircularProgress />}
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
          {error}
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
