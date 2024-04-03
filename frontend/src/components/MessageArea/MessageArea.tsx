import Avatar from "../Avatar/Avatar";
import styles from "./MessageArea.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MessageSent from "../MessageSent/MessageSent";
import MessageRecieved from "../MessageRecieved/MessageRecieved";
import { useConversation } from "../../contexts/ConversationContext";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import CreateMessage from "../CreateMessage/CreateMessage";
import { MessageI } from "../../interfaces/interfaces";
import API_URL from "../../utils/apiConfig";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import apiFetch from "../../utils/apiFetch";

export default function MessageArea() {
  const { currentConversation } = useConversation();
  const [messages, setMessages] = useState<MessageI[]>([]);
  const { user } = useAuth();
  const centralDivRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentConversation) {
      fetchMessages(currentConversation._id);
    }
  }, [currentConversation]);

  const fetchMessages = async (conversationId: string) => {
    try {
      setLoading(true);
      const data = await apiFetch(
        `${API_URL}/messages/${conversationId}`,
        {},
        user?.token,
        "GET",
        true
      );
      setMessages(data);
      setLoading(false);
      setError("");
    } catch (error: any) {
      setError(error.toString());
      setLoading(false);
    }
  };

  const handleMessageSent = () => {
    if (currentConversation) {
      fetchMessages(currentConversation._id);
    }
  };

  const scrollToBottom = () => {
    const ref = centralDivRef.current;
    if (ref) {
      ref.scrollTop = ref.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.messageAreaContainer}>
      <div className={styles.messageAreaInnerWrapper}>
        {error && <p className={styles.error}>{error}</p>}
        {!currentConversation && !error && (
          <div className={styles.noConversation}>
            <ArrowBackIcon />
            <h1>Please select a conversation</h1>
          </div>
        )}
        {loading && currentConversation && !error && (
          <div className={styles.loadingSpinner}>
            <CircularProgress />
          </div>
        )}
        {currentConversation && !loading && !error && (
          <>
            <div className={styles.topDiv}>
              <div className={styles.flex}>
                {currentConversation?.participants.map((participant) => (
                  <div className={styles.flex} key={participant._id}>
                    <Avatar user={participant} size={40} />
                    <h1 key={participant._id}>{`${participant.username}, `}</h1>
                  </div>
                ))}
              </div>
              <MoreVertIcon />
            </div>
            <div className={styles.centralDiv} ref={centralDivRef}>
              {messages.map((message: any) =>
                message.senderId._id === user?._id ? (
                  <MessageSent key={message._id} content={message.content} />
                ) : (
                  <MessageRecieved
                    key={message._id}
                    content={message.content}
                    sender={message.senderId}
                  />
                )
              )}
            </div>
            <div className={styles.bottomDiv}>
              <CreateMessage onMessageSent={handleMessageSent} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
