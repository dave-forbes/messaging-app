import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });
  const [error, setError] = useState("");
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const { username, password, confirmPassword, bio } = formData;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await register(formData);
    if (response.success) {
      const { username, password } = formData;
      const loginResponse = await login({ username, password });
      if (loginResponse.success) {
        setError("");
        navigate("/app");
      } else {
        setError(loginResponse.toString());
      }
    } else {
      setError(response.toString());
    }
  };

  return (
    <div className={styles.registerPageWrapper}>
      <div className={styles.registerFormContainer}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username:</label>
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
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <p>{error}</p>
          <button className="button" type="submit">
            Register
          </button>
          <p>
            Already have an account? <Link to="/">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
