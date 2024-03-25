import Avatar from "../Avatar/Avatar";
import styles from "./Conversation.module.scss";

interface ConversationProps {
  title: string;
  lastReceived: string;
  text: string;
}

export default function Conversation({
  title,
  lastReceived,
  text,
}: ConversationProps) {
  return (
    <li className={styles.conversation}>
      <Avatar />
      <div className={styles.conversationContent}>
        <div className={styles.flex}>
          <p>{title}</p>
          <p className={styles.lastReceived}>{lastReceived}</p>
        </div>
        <p className={styles.conversationText}>{text}</p>
      </div>
    </li>
  );
}
