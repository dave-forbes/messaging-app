import styles from './ConversationOptions.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useNavbar } from '../../contexts/NavbarContext';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

export default function ConversationOptions() {
  const { setIsConversationOptionsOpen } = useNavbar();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<[] | any>([]);
  const [users, setUsers] = useState<
    { value: string; label: string }[]
  >([]);
  const animatedComponents = makeAnimated();
  const [error, setError] = useState('');
  return (
    <div className={styles.conversationOptionsContainer}>
      <CloseIcon
        className={styles.closeIcon}
        onClick={() => setIsConversationOptionsOpen(false)}
      />
      <h1>Conversation Options</h1>
      <div className={styles.inputGroup}>
        <label>Add participants:</label>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={users.filter((item) => item.value !== user?._id)}
          onChange={
            (selectedOptions) =>
              setSelectedUsers(selectedOptions || []) // Handle null case
          }
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Remove participants:</label>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={users.filter((item) => item.value !== user?._id)}
          onChange={
            (selectedOptions) =>
              setSelectedUsers(selectedOptions || []) // Handle null case
          }
          required
        />
      </div>
      <button className="button">Leave Group</button>
    </div>
  );
}
