import { FormEvent, useState } from 'react';
import styles from './UpdateProfile.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import apiFetch from '../../utils/apiFetch';
import API_URL from '../../utils/apiConfig';
import { useNavbar } from '../../contexts/NavbarContext';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import EnableNotifications from '../EnableNotificationToggle/EnableNotificationToggle';

export default function UpdateProfile() {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username,
    bio: user?.bio,
    avatar: null,
    email: user?.email,
    notificationsEnabled: user?.notificationsEnabled,
  });
  const [error, setError] = useState('');
  const { setIsProfileOpen, setIsUpdateProfileOpen } = useNavbar();
  const [loading, setLoading] = useState(false);

  const { username, bio, email, notificationsEnabled } = formData;

  const handleChange = (e: any) => {
    if (e.target.name === 'avatar') {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      if (formData.username) {
        formDataToSend.append('username', formData.username);
      }
      if (formData.bio) {
        formDataToSend.append('bio', formData.bio);
      }
      if (formData.avatar) {
        formDataToSend.append('avatar', formData.avatar);
      }

      if (formData.email) {
        formDataToSend.append('email', formData.email);
      }
      formDataToSend.append(
        'notificationsEnabled',
        String(formData.notificationsEnabled)
      );

      const response = await apiFetch(
        `${API_URL}/users/update/${user?._id}`,
        formDataToSend,
        user?.token,
        'PUT',
        false
      );
      const newUser = response.user;
      newUser.token = user?.token;
      setLoading(false);
      setError('');
      setIsProfileOpen(true);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error: any) {
      setLoading(false);
      setError(error.toString());
    }
  };

  const toggleNotifications = () => {
    setFormData((prevData) => ({
      ...prevData,
      notificationsEnabled: !prevData.notificationsEnabled,
    }));
  };

  return (
    <>
      {loading && <CircularProgress />}
      <div className={styles.updateProfileContainer}>
        <CloseIcon
          className={styles.closeIcon}
          onClick={() => setIsUpdateProfileOpen(false)}
        />
        <h1>Update Profile</h1>
        <form
          onSubmit={handleSubmit}
          className={styles.updateForm}
          encType="multipart/form-data"
        >
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
          {/* <div className={styles.inputGroup}>
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
        </div> */}
          <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <EnableNotifications
            toggleNotifications={toggleNotifications}
            notificationsEnabled={notificationsEnabled}
          />
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
          <div className={styles.updateProfileControls}>
            <button className="button" type="submit">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
