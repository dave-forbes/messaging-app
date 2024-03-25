import styles from "./Navbar.module.scss";
import ChatIcon from "@mui/icons-material/Chat";
import HearingIcon from "@mui/icons-material/Hearing";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  const smallIcon = { fontSize: 40 };
  const largeIcon = { fontSize: 50 };
  return (
    <div className={styles.navbarContainer}>
      <HearingIcon sx={largeIcon} />
      <div className={styles.centralIcons}>
        <ChatIcon sx={smallIcon} />
      </div>
      <AccountCircleIcon sx={largeIcon} />
    </div>
  );
}
