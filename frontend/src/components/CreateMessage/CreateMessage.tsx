import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import styles from "./CreateMessage.module.scss";
import { useConversation } from "../../contexts/ConversationContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import API_URL from "../../utils/apiConfig";
import apiFetch from "../../utils/apiFetch";

interface CreateMessageProps {
  onMessageSent: () => void;
}

export default function CreateMessage({ onMessageSent }: CreateMessageProps) {
  const [content, setContent] = useState("");
  const { currentConversation, setCurrentConversation } = useConversation();
  const { user } = useAuth();
  const [error, setError] = useState("");

  const handleSendMessage = async () => {
    if (content.trim() !== "") {
      const formData = {
        content: content,
        conversationId: currentConversation?._id,
        senderId: user?._id,
      };
      try {
        const data = await apiFetch(
          `${API_URL}/messages/create`,
          formData,
          user?.token,
          "POST",
          true
        );
        setCurrentConversation(data.updatedConversation);
        onMessageSent();
        setError("");
      } catch (error: any) {
        setError(error.toString());
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
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.error}>{error}</p>
        </div>
      )}
    </div>
  );
}
