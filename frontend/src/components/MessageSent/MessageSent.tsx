import styles from './MessageSent.module.scss';
// import DoneAllIcon from "@mui/icons-material/DoneAll";

interface MessageSentProps {
  content: string;
}

export default function MessageSent({ content }: MessageSentProps) {
  return (
    <>
      <div className={styles.messageSent}>
        <div className={styles.messageContent}>
          <p>{content}</p>
          {/* <div className={styles.messageInfo}>
            <p>{createdAt}</p>
            <DoneAllIcon />
          </div> */}
        </div>
      </div>
    </>
  );
}
