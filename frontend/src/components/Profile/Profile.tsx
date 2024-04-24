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
import CloseIcon from '@mui/icons-material/Close';

export default function Profile() {
  const { setCurrentConversation } = useConversation();
  const { logout, user } = useAuth();
  const {
    setIsProfileOpen,
    setIsUpdateProfileOpen,
    profileToView,
    setProfileToView,
  } = useNavbar();
  const [error, setError] = useState('');
  const [userData, setUserData] = useState<UserI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(profileToView ? profileToView : undefined);
  }, []);

  const fetchUser = async (userId = user?._id) => {
    try {
      const data = await apiFetch(
        `${API_URL}/users/${userId}`,
        {},
        user?.token,
        'GET',
        true
      );
      setUserData(data.user);
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
      <CloseIcon
        className={styles.closeIcon}
        onClick={() => {
          setIsProfileOpen(false);
          setProfileToView('');
        }}
      />
      {loading && <CircularProgress />}
      {userData && <Avatar user={userData} size={150} />}
      <h1>{userData?.username}</h1>
      <p>{userData?.bio}</p>
      {user?._id === userData?._id && (
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
      )}
      <p>{error}</p>
    </div>
  );
}
