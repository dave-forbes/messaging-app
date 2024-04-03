import styles from "./MessageRecieved.module.scss";
import Avatar from "../Avatar/Avatar";
import { UserI } from "../../interfaces/interfaces";

interface MessageRecievedProps {
  content: string;
  sender: UserI;
}

export default function MessageRecieved({
  content,
  sender,
}: MessageRecievedProps) {
  return (
    <div className={styles.messageRecieved}>
      <Avatar user={sender} size={40} />
      <div className={styles.messageContent}>
        <p className={styles.sender}>{sender.username}:</p>
        <p> {content}</p>
      </div>
    </div>
  );
}
