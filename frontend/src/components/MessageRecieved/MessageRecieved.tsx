import styles from "./MessageRecieved.module.scss";
import Avatar from "../Avatar/Avatar";

interface MessageRecievedProps {
  content: string;
}

export default function MessageRecieved({ content }: MessageRecievedProps) {
  return (
    <div className={styles.messageRecieved}>
      <Avatar />
      <div className={styles.messageContent}>
        <p> {content}</p>
      </div>
    </div>
  );
}
