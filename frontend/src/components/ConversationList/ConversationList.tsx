import Conversation from "../Conversation/Conversation";
import styles from "./ConversationList.module.scss";

export default function ConversationList() {
  return (
    <div className={styles.conversationListContainer}>
      <div className={styles.listWrapper}>
        <h1 className={styles.title}>Conversations</h1>
        <ul className={styles.conversationList}>
          <Conversation
            title="Meghan Ridge"
            lastReceived="2m"
            text="Sent a file"
          />
          <Conversation
            title="Ryan James"
            lastReceived="1h"
            text="Thanks! How the meeting went?"
          />
          <Conversation
            title="Jared Wesley"
            lastReceived="4h"
            text="You: Got it, I'll let you know, no worries"
          />
          <Conversation
            title="Sam Norton"
            lastReceived="1d"
            text="Haha, Yeah, sounds good! Thanks so much"
          />
          <Conversation
            title="Alicia Wu"
            lastReceived="1d"
            text="Sure, that's completely fine. Don't forget to sign up"
          />
        </ul>
        <button className={styles.button}>Create</button>
      </div>
    </div>
  );
}
