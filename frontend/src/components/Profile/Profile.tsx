import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useConversation } from '../../contexts/ConversationContext';
import { useNavbar } from '../../contexts/NavbarContext';
import Avatar from '../Avatar/Avatar';
import styles from './Profile.module.scss';
import apiFetch from '../../utils/apiFetch';
import API_URL from '../../utils/apiConfig';
import { UserI } from '../../interfaces/interfaces';
import CircularProgress from '@mui/material/CircularProgress';

export default function Profile() {
  const { setCurrentConversation } = useConversation();
  const { logout, user } = useAuth();
  const { setIsProfileOpen, setIsUpdateProfileOpen } = useNavbar();
  const [error, setError] = useState('');
  const [userData, setUserData] = useState<UserI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const data = await apiFetch(
        `${API_URL}/users/${user?._id}`,
        {},
        user?.token,
        'GET',
        true
      );
      setUserData(data);
      setError('');
      setLoading(false);
    } catch (error: any) {
      setError(error.toString());
      setLoading(false);
    }
  };

  const handleLogoutClick = () => {
    logout();
    setCurrentConversation(null);
    setIsProfileOpen(false);
  };

  return (
    <div className={styles.profileContainer}>
      {loading && <CircularProgress />}
      <Avatar user={user} size={150} />
      <h1>{userData?.username}</h1>
      <p>{userData?.bio}</p>
      <div className={styles.profileControls}>
        <button className="button" onClick={handleLogoutClick}>
          Logout
        </button>
        <button
          className="button"
          onClick={() => setIsUpdateProfileOpen(true)}
        >
          Update profile
        </button>
      </div>
      <p>{error}</p>
    </div>
  );
}
