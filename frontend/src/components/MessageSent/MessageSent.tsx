import { UserI } from '../../interfaces/interfaces';
import Avatar from '../Avatar/Avatar';
import styles from './MessageSent.module.scss';

interface MessageSentProps {
  content: string;
  sender: UserI;
  image: string;
}

export default function MessageSent({
  content,
  sender,
  image,
}: MessageSentProps) {
  return (
    <>
      <div className={styles.messageSent}>
        <div className={styles.messageContent}>
          <p>{content}</p>
          {image && <img src={image} className={styles.messageImg} />}
        </div>
        <Avatar user={sender} size={40} />
      </div>
    </>
  );
}
