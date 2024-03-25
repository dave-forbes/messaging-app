import ConversationList from "./components/ConversationList/ConversationList";
import MessageArea from "./components/MessageArea/MessageArea";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./contexts/AuthContext";
import "./styles/global.scss";
import { useState } from "react";
import Login from "./components/Login/Login";

export default function App() {
  const [conversationListOpen, setConversationListOpen] = useState(false);
  const { user } = useAuth();

  const toggleConversationList = () => {
    setConversationListOpen(!conversationListOpen);
  };
  if (user) {
    return (
      <div className="appContainer">
        <Navbar toggleConversationList={toggleConversationList} />
        {conversationListOpen && <ConversationList />}
        <MessageArea />
      </div>
    );
  } else {
    return <Login />;
  }
}
