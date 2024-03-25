import { useState, FormEvent } from "react";
import styles from "./Login.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import HearingIcon from "@mui/icons-material/Hearing";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      username: username,
      password: password,
    };

    login(formData);
  };

  return (
    <div className={styles.loginPageWrapper}>
      <div className={styles.loginFormContainer}>
        <div className={styles.appDescription}>
          <HearingIcon />
          <h1>Welcome to Discussr</h1>
          <p>An app for sending messages.</p>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">
              <PersonIcon />
              username
            </label>

            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">
              <LockIcon />
              password
            </label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
