import styles from "./Navbar.module.scss";
import ChatIcon from "@mui/icons-material/Chat";
import HearingIcon from "@mui/icons-material/Hearing";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";

interface NavbarProps {
  toggleConversationList: () => void;
}

export default function Navbar({ toggleConversationList }: NavbarProps) {
  return (
    <div className={styles.navbarContainer}>
      <HearingIcon />
      <GroupsIcon onClick={toggleConversationList} />
      <ChatIcon />
      <AccountCircleIcon />
    </div>
  );
}
