import Avatar from "../Avatar/Avatar";
import styles from "./MessageArea.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export default function MessageArea() {
  const largeIcon = { fontSize: 40 };
  return (
    <div className={styles.messageAreaContainer}>
      <div className={styles.topDiv}>
        <div className={styles.flex}>
          <Avatar />
          <div>
            <h1>Ryan James</h1>
            <p>...typing</p>
          </div>
        </div>
        <MoreVertIcon />
      </div>
      <div className={styles.centralDiv}>
        <p className={styles.date}>Today 12 April </p>
        <div className={styles.messageSent}>
          <div className={styles.messageContent}>
            <p>
              Hey! I am going to start a book club channel, how that sounds?
            </p>
            <div className={styles.messageInfo}>
              <p>13:52</p>
              <DoneAllIcon />
            </div>
          </div>
        </div>
        <div className={styles.messageRecieved}>
          <Avatar />
          <div className={styles.messageContent}>
            <p> Hello! great, I love the idea!</p>
          </div>
        </div>
        <div className={styles.messageRecieved}>
          <Avatar />
          <div className={styles.messageContent}>
            <p> I'm in!</p>
          </div>
        </div>
        <div className={styles.messageSent}>
          <div className={styles.messageContent}>
            <p>Super, i'll add you shortly</p>
            <div className={styles.messageInfo}>
              <p>13:52</p>
              <DoneAllIcon />
            </div>
          </div>
        </div>
        <div className={styles.messageRecieved}>
          <Avatar />
          <div className={styles.messageContent}>
            <p> Thanks! How that meeting went?</p>
          </div>
        </div>
      </div>
      <div className={styles.bottomDiv}>
        <div className={styles.flex}>
          <AttachFileIcon sx={largeIcon} />
          <p>Write a message...</p>
        </div>
        <SendIcon sx={largeIcon} />
      </div>
    </div>
  );
}
