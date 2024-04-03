import { UserI } from "../../interfaces/interfaces";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  user: UserI | null;
}

export default function Avatar({ user }: AvatarProps) {
  return (
    <div className={styles.defaultAvatar}>
      <img src={user?.avatar} alt={`A picture of ${user?.username}`} />
    </div>
  );
}
