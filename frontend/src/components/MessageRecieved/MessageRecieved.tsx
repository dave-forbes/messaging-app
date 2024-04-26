import styles from './MessageRecieved.module.scss';
import Avatar from '../Avatar/Avatar';
import { MessageI } from '../../interfaces/interfaces';
import formatTimeTo24Hours from '../../utils/formatTimeTo24hr';

interface MessageRecievedProps {
  message: MessageI;
}

export default function MessageRecieved({
  message,
}: MessageRecievedProps) {
  return (
    <div className={styles.messageRecieved}>
      <Avatar
        userToDisplay={message.senderId}
        size={40}
        getURL={false}
      />
      <div className={styles.messageContent}>
        <div className={styles.flex}>
          <p className={styles.sender}>
            {message.senderId.username}:
          </p>
          <p> {message.content}</p>
          <p className={styles.createdAt}>
            {formatTimeTo24Hours(message.createdAt)}
          </p>
        </div>
        {message.image && <img src={message.image} />}
      </div>
    </div>
  );
}
