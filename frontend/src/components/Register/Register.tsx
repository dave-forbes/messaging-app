import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    bio: '',
    avatar: '',
  });
  const [error, setError] = useState('');
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const { username, password, confirmPassword, bio } = formData;

  const handleChange = (e: any) => {
    if (e.target.name === 'avatar') {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    if (formData.username) {
      formDataToSend.append('username', formData.username);
    }
    if (formData.password) {
      formDataToSend.append('password', formData.password);
    }
    if (formData.confirmPassword) {
      formDataToSend.append(
        'confirmPassword',
        formData.confirmPassword
      );
    }
    if (formData.bio) {
      formDataToSend.append('bio', formData.bio);
    }
    if (formData.avatar) {
      formDataToSend.append('avatar', formData.avatar);
    }
    const response = await register(formDataToSend);
    if (response.success) {
      const { username, password } = formData;
      const loginResponse = await login({ username, password });
      if (loginResponse.success) {
        setError('');
        navigate('/app');
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
          <div className="inputGroup">
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
          <div className="inputGroup">
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
          <div className="inputGroup">
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
          <div className="inputGroup">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="avatar">Avatar:</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
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
