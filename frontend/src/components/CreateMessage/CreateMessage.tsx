import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import styles from "./CreateMessage.module.scss";
import { useConversation } from "../../contexts/ConversationContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import API_URL from "../../utils/apiConfig";
import apiErrorHandling from "../../utils/apiErrorHandling";

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
        const response = await fetch(`${API_URL}/messages/create`, {
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

        const data = await response.json();

        if (!response.ok) {
          if (data.errors && Array.isArray(data.errors)) {
            const errorMessages = data.errors.map(
              (error: { msg: string }) => error.msg
            );
            const formattedErrorMessage = errorMessages.join(", ");
            throw new Error(`${response.status}: ${formattedErrorMessage}`);
          } else {
            throw new Error(`${response.status}: ${data.message}`);
          }
        }
        setCurrentConversation(data.updatedConversation);
        onMessageSent();
        setError("");
      } catch (error: any) {
        setError(apiErrorHandling(error).toString());
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
      <p className={styles.error}>{error}</p>
    </div>
  );
}
