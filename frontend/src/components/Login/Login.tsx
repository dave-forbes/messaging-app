import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import styles from './Login.module.scss';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import HearingIcon from '@mui/icons-material/Hearing';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await login(formData);
    if (response.success) {
      setError('');
      navigate('/app');
    } else {
      setError(response.toString());
    }
  };

  return (
    <div className={styles.loginPageWrapper}>
      {loading && <CircularProgress />}
      {!loading && (
        <div className={styles.loginFormContainer}>
          <div className={styles.appDescription}>
            <HearingIcon />
            <h1>Welcome to Discussr</h1>
            <p>An app for sending messages.</p>
          </div>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className="inputGroup">
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
            <div className="inputGroup">
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
            <button className="button" type="submit">
              Login
            </button>
            <p>
              New user? <Link to="/register">Create an acccount</Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
