import Avatar from "../Avatar/Avatar";
import styles from "./MessageArea.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import MessageSent from "../MessageSent/MessageSent";
import MessageRecieved from "../MessageRecieved/MessageRecieved";

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
        <MessageSent
          content="Hey! I am going to start a book club channel, how that sounds?"
          createdAt={"13:52"}
        />
        <MessageRecieved content="Hello! great, I love the idea!" />
        <MessageRecieved content="I'm in!" />
        <MessageSent
          content="Super, i'll add you shortly"
          createdAt={"13:52"}
        />
        <MessageRecieved content="Thanks! How that meeting went?" />
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
