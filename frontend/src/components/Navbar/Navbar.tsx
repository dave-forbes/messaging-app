import styles from "./Navbar.module.scss";
import HearingIcon from "@mui/icons-material/Hearing";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavbar } from "../../contexts/NavbarContext";

export default function Navbar() {
  const {
    isConversationListOpen,
    setIsConversationListOpen,
    isProfileOpen,
    setIsProfileOpen,
  } = useNavbar();
  return (
    <div className={styles.navbarContainer}>
      <HearingIcon />
      <GroupsIcon
        onClick={() => setIsConversationListOpen(!isConversationListOpen)}
      />
      <AccountCircleIcon onClick={() => setIsProfileOpen(!isProfileOpen)} />
    </div>
  );
}
