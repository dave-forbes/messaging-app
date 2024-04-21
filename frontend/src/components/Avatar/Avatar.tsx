import { useEffect, useState } from 'react';
import { UserI } from '../../interfaces/interfaces';
import styles from './Avatar.module.scss';
import apiFetch from '../../utils/apiFetch';
import API_URL from '../../utils/apiConfig';

interface AvatarProps {
  user: UserI | null;
  size: number;
}

export default function Avatar({ user, size }: AvatarProps) {
  const [userData, setUserData] = useState<UserI | null>(null);
  if (user) {
    const userLocalStorage = localStorage.getItem('user');
    let token: string;
    if (userLocalStorage) {
      const obj = JSON.parse(userLocalStorage);
      token = obj.token;
    }

    useEffect(() => {
      fetchUser();
    }, []);

    const fetchUser = async () => {
      try {
        const data = await apiFetch(
          `${API_URL}/users/${user?._id}`,
          {},
          token,
          'GET',
          true
        );
        setUserData(data);
      } catch (error: any) {
        console.error(error.toString());
      }
    };
  }

  return (
    <div
      className={styles.avatar}
      style={{ width: size, height: size }}
    >
      <img
        src={userData?.avatar}
        alt={`A picture of ${userData?.username}`}
      />
    </div>
  );
}
