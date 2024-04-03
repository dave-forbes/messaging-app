import styles from "./MessageRecieved.module.scss";
import Avatar from "../Avatar/Avatar";

interface MessageRecievedProps {
  content: string;
  sender: string;
}

export default function MessageRecieved({
  content,
  sender,
}: MessageRecievedProps) {
  return (
    <div className={styles.messageRecieved}>
      <Avatar user={null} />
      <div className={styles.messageContent}>
        <p className={styles.sender}>{sender}:</p>
        <p> {content}</p>
      </div>
    </div>
  );
}
