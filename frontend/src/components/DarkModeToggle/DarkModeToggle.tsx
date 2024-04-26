import { useDarkMode } from '../../contexts/DarkModeContext';
import styles from './DarkModeToggle.module.scss';

export default function DarkModeToggle() {
  const { darkMode, setDarkMode } = useDarkMode();
  const handleClick = () => {
    setDarkMode(
      darkMode === '' || darkMode === 'light' ? 'dark' : 'light'
    );
  };

  return (
    <div className={styles.toggleContainer}>
      <p>Toggle dark mode:</p>
      <div
        className={`${styles.toggle} ${
          darkMode === 'dark' ? styles.active : ''
        }`}
        onClick={handleClick}
      >
        <div
          className={`${styles.toggleInner} ${
            darkMode === 'dark' ? styles.moveToggle : ''
          }`}
        ></div>
      </div>
    </div>
  );
}
