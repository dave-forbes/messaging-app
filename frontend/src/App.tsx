import ConversationList from "./components/ConversationList/ConversationList";
import MessageArea from "./components/MessageArea/MessageArea";
import Navbar from "./components/Navbar/Navbar";
import "./styles/global.scss";
import { useState } from "react";

export default function App() {
  const [conversationListOpen, setConversationListOpen] = useState(false);

  // Function to toggle the conversation list visibility
  const toggleConversationList = () => {
    setConversationListOpen(!conversationListOpen);
  };
  return (
    <div className="appContainer">
      <Navbar toggleConversationList={toggleConversationList} />
      {conversationListOpen && <ConversationList />}
      <MessageArea />
    </div>
  );
}
