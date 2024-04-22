import styles from './MessageSent.module.scss';

interface MessageSentProps {
  content: string;
  image: string;
}

export default function MessageSent({
  content,
  image,
}: MessageSentProps) {
  return (
    <>
      <div className={styles.messageSent}>
        <div className={styles.messageContent}>
          <p>{content}</p>
          {image && <img src={image} />}
        </div>
      </div>
    </>
  );
}
