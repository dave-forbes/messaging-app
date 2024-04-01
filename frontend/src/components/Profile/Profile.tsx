import { useAuth } from "../../contexts/AuthContext";
import { useConversation } from "../../contexts/ConversationContext";
import { useNavbar } from "../../contexts/NavbarContext";
import Avatar from "../Avatar/Avatar";
import styles from "./Profile.module.scss";

export default function Profile() {
  const { setCurrentConversation } = useConversation();
  const { setIsConversationListOpen, setIsProfileOpen } = useNavbar();
  const { logout, user } = useAuth();

  const handleClick = () => {
    logout();
    setCurrentConversation(null);
    setIsConversationListOpen(true);
    setIsProfileOpen(false);
  };

  return (
    <div className={styles.profileContainer}>
      <Avatar />
      <h1>{user?.username}</h1>
      <p>{user?.bio}</p>
      <button onClick={handleClick}>logout</button>
      <button>edit profile</button>
    </div>
  );
}
