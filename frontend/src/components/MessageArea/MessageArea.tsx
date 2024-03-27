import Avatar from "../Avatar/Avatar";
import styles from "./MessageArea.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import MessageSent from "../MessageSent/MessageSent";
import MessageRecieved from "../MessageRecieved/MessageRecieved";
import { useConversation } from "../../contexts/ConversationContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

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
                <div>
                  {currentConversation?.participants.map((participant) => (
                    <h1 key={participant._id}>
                      {participant.username !== user?.username &&
                        participant.username}
                    </h1>
                  ))}
                  <p>...typing</p>
                </div>
              </div>
              <MoreVertIcon />
            </div>
            <div className={styles.centralDiv}>
              {messages.map((message: any) =>
                message.sender === user?._id ? (
                  <MessageSent
                    key={message._id}
                    content={message.content}
                    createdAt="0"
                  />
                ) : (
                  <MessageRecieved
                    key={message._id}
                    content={message.content}
                  />
                )
              )}

              {/* <p className={styles.date}>Today 12 April </p>
          <MessageSent
            content="Hey! I am going to start a book club channel, how that sounds?"
            createdAt={"13:52"}
          />
          <MessageRecieved content="Hello! great, I love the idea!" />
          <MessageRecieved content="I'm in!" />
          <MessageSent
            content="Super, i'll add you shortly"
            createdAt={"13:52"}
          />
          <MessageRecieved content="Thanks! How that meeting went?" /> */}
            </div>
            <div className={styles.bottomDiv}>
              <div className={styles.flex}>
                <AttachFileIcon />
                <p>Write a message...</p>
              </div>
              <SendIcon />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
