import HearingIcon from '@mui/icons-material/Hearing';
import styles from './AppInfo.module.scss';

export default function AppInfo() {
  return (
    <div className={styles.appInfoContainer}>
      <HearingIcon />
      <h1>Welcome to Discussr</h1>
      <div className={styles.appInfoText}>
        <p>
          This was created for the Odin Project Messaging app
          assignment, made using React/Vite for the frontend and a
          NodeJs/Express Rest API backend.
        </p>
        <p>
          As the backend is a RESTful API, realtime updates are not
          possible, so notifications can't be sent to other users when
          sending messages.
        </p>
        <p>
          Head over to the github{' '}
          <a href="https://github.com/dave-forbes/messaging-app">
            repo
          </a>{' '}
          for more information on how this app works.
        </p>
      </div>
    </div>
  );
}
