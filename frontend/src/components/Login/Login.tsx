import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./Login.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import HearingIcon from "@mui/icons-material/Hearing";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await login(formData);
    if (response.success) {
      setError("");
      navigate("/app");
    } else {
      setError(response.toString());
    }
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
              name="username"
              value={username}
              onChange={handleChange}
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
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <p>{error}</p>
          <button type="submit">Login</button>
          <p>
            New user? <Link to="/register">Create an acccount</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
