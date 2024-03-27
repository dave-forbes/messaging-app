import ConversationList from "./components/ConversationList/ConversationList";
import MessageArea from "./components/MessageArea/MessageArea";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./contexts/AuthContext";
import "./styles/global.scss";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { useNavbar } from "./contexts/NavbarContext";

export default function App() {
  const { isConversationListOpen, isProfileOpen } = useNavbar();
  const { user } = useAuth();

  if (user) {
    return (
      <div className="appContainer">
        <Navbar />
        {isConversationListOpen && <ConversationList />}
        {isProfileOpen && <Profile />}
        {}
        <MessageArea />
      </div>
    );
  } else {
    return <Login />;
  }
}
