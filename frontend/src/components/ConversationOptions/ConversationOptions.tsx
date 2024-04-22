import styles from './ConversationOptions.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useNavbar } from '../../contexts/NavbarContext';
import apiFetch from '../../utils/apiFetch';
import API_URL from '../../utils/apiConfig';
import { useConversation } from '../../contexts/ConversationContext';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { UserI } from '../../interfaces/interfaces';

export default function ConversationOptions() {
  const { setIsConversationOptionsOpen } = useNavbar();
  const { currentConversation, setCurrentConversation } =
    useConversation();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [selectedUsersToAdd, setSelectedUsersToAdd] = useState<
    [] | any
  >([]);
  const [selectedUsersToRemove, setSelectedUsersToRemove] = useState<
    [] | any
  >([]);
  const [usersToAdd, setUsersToAdd] = useState<
    { value: string; label: string }[]
  >([]);
  const [usersToRemove, setUsersToRemove] = useState<
    { value: string; label: string }[]
  >([]);

  const animatedComponents = makeAnimated();

  // Fetch users from API and sort into users to be added or removed
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiFetch(
        `${API_URL}/users/`,
        {},
        user?.token,
        'GET',
        true
      );
      const options = data.map((user: UserI) => ({
        value: user._id,
        label: user.username,
      }));
      const participants = currentConversation?.participants
        ? currentConversation?.participants
        : [];
      const usersToAdd = options.filter(
        (option: { value: string; label: string }) =>
          !participants.find(
            (participant) => option.value === participant._id
          )
      );

      const usersToRemove = options.filter(
        (option: { value: string; label: string }) =>
          participants.find(
            (participant: UserI) => option.value === participant._id
          )
      );

      setUsersToAdd(usersToAdd);
      setUsersToRemove(usersToRemove);
    } catch (error: any) {
      setError(error.toString());
    }
  };

  const handleAddUsersClick = async () => {
    try {
      const response = await apiFetch(
        `${API_URL}/conversations/${currentConversation?._id}/participants/add/`,
        selectedUsersToAdd,
        user?.token,
        'PUT',
        true
      );
      setError('');
      setCurrentConversation(response.updatedConversation);
      setIsConversationOptionsOpen(false);
    } catch (error: any) {
      setError(error.toString());
    }
  };

  const handleRemoveUsersClick = async () => {
    try {
      const response = await apiFetch(
        `${API_URL}/conversations/${currentConversation?._id}/participants/remove/`,
        selectedUsersToRemove,
        user?.token,
        'PUT',
        true
      );
      setError('');
      setCurrentConversation(response.updatedConversation);
      setIsConversationOptionsOpen(false);
    } catch (error: any) {
      setError(error.toString());
    }
  };

  const handleLeaveConvClick = async () => {
    try {
      await apiFetch(
        `${API_URL}/conversations/${currentConversation?._id}/participants/remove/`,
        [user],
        user?.token,
        'PUT',
        true
      );
      setError('');
      setCurrentConversation(null);
      setIsConversationOptionsOpen(false);
    } catch (error: any) {
      setError(error.toString());
    }
  };

  return (
    <div className={styles.conversationOptionsContainer}>
      <CloseIcon
        className={styles.closeIcon}
        onClick={() => setIsConversationOptionsOpen(false)}
      />
      <h1>Conversation Options</h1>
      <div className={styles.inputGroup}>
        <label>Add participant(s):</label>
        <div className={styles.flex}>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={usersToAdd.filter(
              (item) => item.value !== user?._id
            )}
            onChange={
              (selectedOptions) =>
                setSelectedUsersToAdd(selectedOptions || []) // Handle null case
            }
            required
          />
          <button className="button" onClick={handleAddUsersClick}>
            Add
          </button>
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>Remove participant(s):</label>
        <div className={styles.flex}>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={usersToRemove.filter(
              (item) => item.value !== user?._id
            )}
            onChange={
              (selectedOptions) =>
                setSelectedUsersToRemove(selectedOptions || []) // Handle null case
            }
            required
          />
          <button className="button" onClick={handleRemoveUsersClick}>
            Remove
          </button>
        </div>
      </div>
      <p>This action cannot be undone.</p>
      <button className="button" onClick={handleLeaveConvClick}>
        Leave Conversation
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
