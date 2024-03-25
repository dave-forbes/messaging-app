import Avatar from "../Avatar/Avatar";
import styles from "./ConversationList.module.scss";

export default function ConversationList() {
  return (
    <div className={styles.conversationListContainer}>
      <div className={styles.listWrapper}>
        <h1 className={styles.title}>Conversations</h1>
        <ul className={styles.conversationList}>
          <li className={styles.conversation}>
            <Avatar />
            <div className={styles.conversationContent}>
              <p>Meghan Ridge</p>
              <p className={styles.conversationText}>A new Message</p>
            </div>
          </li>
          <li className={styles.conversation}>
            <Avatar />
            <div className={styles.conversationContent}>
              <p>Ryan James</p>
              <p className={styles.conversationText}>A new Message</p>
            </div>
          </li>
          <li className={styles.conversation}>
            <Avatar />
            <div className={styles.conversationContent}>
              <p>Jared Wesley</p>
              <p className={styles.conversationText}>A new Message</p>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.listWrapper}>
        <h1 className={styles.title}>Contacts</h1>
        <ul className={styles.conversationList}>
          <li className={styles.conversation}>
            <Avatar />
            <div className={styles.conversationContent}>
              <p>Sam Norton</p>
              <p className={styles.conversationText}>A new Message</p>
            </div>
          </li>
          <li className={styles.conversation}>
            <Avatar />
            <div className={styles.conversationContent}>
              <p>Alicia Wu</p>
              <p className={styles.conversationText}>A new Message</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
