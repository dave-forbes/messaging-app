import { useEffect, useState } from 'react';
import { UserI } from '../../interfaces/interfaces';
import styles from './Avatar.module.scss';
import apiFetch from '../../utils/apiFetch';
import API_URL from '../../utils/apiConfig';
import { useNavbar } from '../../contexts/NavbarContext';
import { useAuth } from '../../contexts/AuthContext';

interface AvatarProps {
  userToDisplay: UserI | null;
  size: number;
  getURL: boolean;
}

export default function Avatar({
  userToDisplay,
  size,
  getURL,
}: AvatarProps) {
  const [userData, setUserData] = useState<UserI | null>(null);
  const { setIsProfileOpen, setProfileToView } = useNavbar();
  const { user } = useAuth();

  if (getURL) {
    useEffect(() => {
      fetchUser();
    }, []);
    const fetchUser = async () => {
      try {
        const data = await apiFetch(
          `${API_URL}/users/${userToDisplay?._id}`,
          {},
          user?.token,
          'GET',
          true
        );
        setUserData(data.user);
      } catch (error: any) {
        console.error(error.toString());
      }
    };
  }

  return (
    <div
      className={styles.avatar}
      style={{ width: size, height: size, cursor: 'pointer' }}
      onClick={() => {
        setProfileToView(userToDisplay?._id);
        setIsProfileOpen(true);
      }}
    >
      {userToDisplay?.avatar ? (
        <img
          src={userData ? userData.avatar : userToDisplay?.avatar}
          alt={`A picture of ${userToDisplay?.username}`}
        />
      ) : (
        <div className={styles.noImg}></div>
      )}
    </div>
  );
}
