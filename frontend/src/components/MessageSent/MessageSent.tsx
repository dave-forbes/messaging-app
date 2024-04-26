import { MessageI } from '../../interfaces/interfaces';
import Avatar from '../Avatar/Avatar';
import styles from './MessageSent.module.scss';
import formatTimeTo24Hours from '../../utils/formatTimeTo24hr';

interface MessageSentProps {
  message: MessageI;
}

export default function MessageSent({ message }: MessageSentProps) {
  return (
    <>
      <div className={styles.messageSent}>
        <div className={styles.messageContent}>
          <p>{message.content}</p>
          {message.image && (
            <img src={message.image} className={styles.messageImg} />
          )}
          <p className={styles.createdAt}>
            {formatTimeTo24Hours(message.createdAt)}
          </p>
        </div>
        <Avatar
          userToDisplay={message.senderId}
          size={40}
          getURL={false}
        />
      </div>
    </>
  );
}
