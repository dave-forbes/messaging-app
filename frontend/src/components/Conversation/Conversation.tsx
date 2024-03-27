import Avatar from "../Avatar/Avatar";
import styles from "./Conversation.module.scss";

interface ConversationProps {
  title: string;
  lastReceived: string;
  text: string;
  onClick: React.MouseEventHandler<HTMLLIElement>;
}

export default function Conversation({
  title,
  lastReceived,
  text,
  onClick,
}: ConversationProps) {
  return (
    <li className={styles.conversation} onClick={onClick}>
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
