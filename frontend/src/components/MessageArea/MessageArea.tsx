import Avatar from "../Avatar/Avatar";
import styles from "./MessageArea.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MessageSent from "../MessageSent/MessageSent";
import MessageRecieved from "../MessageRecieved/MessageRecieved";
import { useConversation } from "../../contexts/ConversationContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import CreateMessage from "../CreateMessage/CreateMessage";

export default function MessageArea() {
  const { currentConversation } = useConversation();
  const [messages, setMessages] = useState<[] | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    // Fetch messages belonging to the current conversation
    if (currentConversation) {
      fetchMessages(currentConversation._id);
    }
  }, [currentConversation]);

  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/messages/${conversationId}`
      );
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleMessageSent = () => {
    // After a message is sent, refetch messages to update the list
    if (currentConversation) {
      fetchMessages(currentConversation._id);
    }
  };

  return (
    <div className={styles.messageAreaContainer}>
      <div className={styles.messageAreaInnerWrapper}>
        {!messages ? (
          <h1>Please select a conversation</h1>
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
            <div className={styles.centralDiv}>
              {messages.map((message: any) =>
                message.sender._id === user?._id ? (
                  <MessageSent key={message._id} content={message.content} />
                ) : (
                  <MessageRecieved
                    key={message._id}
                    content={message.content}
                    sender={message.sender.username}
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
