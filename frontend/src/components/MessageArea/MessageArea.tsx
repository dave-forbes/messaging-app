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

export default function MessageArea() {
  const { currentConversation } = useConversation();
  const [messages, setMessages] = useState<MessageI[]>([]);
  const { user } = useAuth();
  const centralDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentConversation) {
      fetchMessages(currentConversation._id);
    }
  }, [currentConversation]);

  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await fetch(`${API_URL}/messages/${conversationId}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
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
    } else {
      console.log("Message container ref not found");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.messageAreaContainer}>
      <div className={styles.messageAreaInnerWrapper}>
        {!currentConversation ? (
          <div className={styles.noConversation}>
            <ArrowBackIcon />
            <h1>Please select a conversation</h1>
          </div>
        ) : (
          <>
            <div className={styles.topDiv}>
              <div className={styles.flex}>
                <Avatar />
                <div className={styles.flex}>
                  {currentConversation?.participants.map((participant) => (
                    <h1 key={participant._id}>
                      {participant.username !== user?.username &&
                        `${participant.username}, `}
                    </h1>
                  ))}
                </div>
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
                    sender={message.senderId.username}
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
