import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import styles from "./CreateMessage.module.scss";
import { useConversation } from "../../contexts/ConversationContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

interface CreateMessageProps {
  onMessageSent: () => void;
}

export default function CreateMessage({ onMessageSent }: CreateMessageProps) {
  const [content, setContent] = useState("");
  const { currentConversation, setCurrentConversation } = useConversation();
  const { user } = useAuth();

  const handleSendMessage = async () => {
    if (content.trim() !== "") {
      const formData = {
        content: content,
        conversationId: currentConversation?._id,
        senderId: user?._id,
      };
      try {
        const response = await fetch("http://localhost:3000/messages/create", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          referrerPolicy: "no-referrer",
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(`${response.status}: ${data.message}`);
        }

        const data = await response.json();
        console.log(data);
        setCurrentConversation(data.updatedConversation);
        onMessageSent();
      } catch (error: any) {
        console.log(error);
      }
      setContent("");
    }
  };

  return (
    <div className={styles.form}>
      <AttachFileIcon />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        required
        placeholder="write a message..."
      />
      <SendIcon onClick={handleSendMessage} style={{ cursor: "pointer" }} />
    </div>
  );
}
