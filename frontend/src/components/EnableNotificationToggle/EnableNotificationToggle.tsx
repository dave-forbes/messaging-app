import styles from './EnableNotificationToggle.module.scss';

interface EnableNotificationsProps {
  toggleNotifications: () => void;
  notificationsEnabled: boolean | undefined;
}

export default function EnableNotifications({
  toggleNotifications,
  notificationsEnabled,
}: EnableNotificationsProps) {
  console.log(notificationsEnabled);
  return (
    <div className={styles.toggleContainer}>
      <p>Enable email notifications?</p>
      <div
        className={`${styles.toggle} ${
          notificationsEnabled ? styles.active : ''
        }`}
        onClick={toggleNotifications}
      >
        <div
          className={`${styles.toggleInner} ${
            notificationsEnabled ? styles.moveToggle : ''
          }`}
        ></div>
      </div>
    </div>
  );
}
