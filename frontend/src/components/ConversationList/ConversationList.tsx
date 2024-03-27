import { useEffect, useState } from "react";
import Conversation from "../Conversation/Conversation";
import styles from "./ConversationList.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useConversation } from "../../contexts/ConversationContext";

export default function ConversationList() {
  const { user } = useAuth();
  const { setCurrentConversation } = useConversation();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Fetch messages belonging to the current conversation
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      if (user) {
        const response = await fetch(
          `http://localhost:3000/conversations/user/${user._id}`,
          {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            referrerPolicy: "no-referrer",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`, // Include JWT token in the Authorization header
            },
          }
        );
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div className={styles.conversationListContainer}>
      <div className={styles.listWrapper}>
        <h1 className={styles.title}>Conversations</h1>
        <ul className={styles.conversationList}>
          {conversations.map((conversation: any): any => (
            <Conversation
              key={conversation._id}
              title={conversation.title}
              lastReceived={conversation.updatedAt.toLocaleString("en-gb")}
              text="text"
              onClick={() => setCurrentConversation(conversation)}
            />
          ))}
          {/* <Conversation
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
          /> */}
        </ul>
        <button className={styles.button}>Create</button>
      </div>
    </div>
  );
}
