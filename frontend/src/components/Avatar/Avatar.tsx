import { UserI } from "../../interfaces/interfaces";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  user: UserI | null;
  size: number;
}

export default function Avatar({ user, size }: AvatarProps) {
  return (
    <div className={styles.avatar} style={{ width: size, height: size }}>
      <img
        src={user?.avatar ? user.avatar : "https://via.placeholder.com/150"}
        alt={`A picture of ${user?.username}`}
      />
    </div>
  );
}
