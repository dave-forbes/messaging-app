import { useAuth } from "../../contexts/AuthContext";
import { useConversation } from "../../contexts/ConversationContext";
import { useNavbar } from "../../contexts/NavbarContext";

export default function Profile() {
  const { setCurrentConversation } = useConversation();
  const { setIsConversationListOpen, setIsProfileOpen } = useNavbar();
  const { logout } = useAuth();

  const handleClick = () => {
    logout();
    setCurrentConversation(null);
    setIsConversationListOpen(true);
    setIsProfileOpen(false);
  };

  return <button onClick={handleClick}>logout</button>;
}
