import { useAuth } from "../../contexts/AuthContext";
import { useConversation } from "../../contexts/ConversationContext";
import { useNavbar } from "../../contexts/NavBarContext";

export default function Profile() {
  const { setCurrentConversation } = useConversation();
  const { setConversationListOpen, setIsProfileOpen } = useNavbar();
  const { logout } = useAuth();

  const handleClick = () => {
    logout();
    setCurrentConversation(null);
    setConversationListOpen(true);
    setIsProfileOpen(false);
  };

  return <button onClick={handleClick}>logout</button>;
}
