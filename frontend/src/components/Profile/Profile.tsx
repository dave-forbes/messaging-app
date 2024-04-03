import { useAuth } from "../../contexts/AuthContext";
import { useConversation } from "../../contexts/ConversationContext";
import { useNavbar } from "../../contexts/NavbarContext";
import Avatar from "../Avatar/Avatar";
import styles from "./Profile.module.scss";

export default function Profile() {
  const { setCurrentConversation } = useConversation();
  const { logout, user } = useAuth();
  const { setIsProfileOpen, setIsUpdateProfileOpen } = useNavbar();

  const handleLogoutClick = () => {
    logout();
    setCurrentConversation(null);
    setIsProfileOpen(false);
  };

  return (
    <div className={styles.profileContainer}>
      <Avatar />
      <h1>{user?.username}</h1>
      <p>{user?.bio}</p>
      <button className="button" onClick={handleLogoutClick}>
        logout
      </button>
      <button className="button" onClick={() => setIsUpdateProfileOpen(true)}>
        edit profile
      </button>
    </div>
  );
}
