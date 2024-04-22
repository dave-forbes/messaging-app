import { useEffect, useState } from 'react';
import Conversation from '../Conversation/Conversation';
import styles from './ConversationList.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useConversation } from '../../contexts/ConversationContext';
import { useNavbar } from '../../contexts/NavbarContext';
import API_URL from '../../utils/apiConfig';
import CircularProgress from '@mui/material/CircularProgress';
import apiFetch from '../../utils/apiFetch';
import CloseIcon from '@mui/icons-material/Close';

export default function ConversationList() {
  const { user } = useAuth();
  const { setIsConversationListOpen, setIsCreateConversationOpen } =
    useNavbar();
  const { currentConversation, setCurrentConversation } =
    useConversation();
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch conversations when component mounts and when current conversation changes
    fetchConversations();
  }, [currentConversation]);

  const fetchConversations = async () => {
    try {
      const data = await apiFetch(
        `${API_URL}/conversations/user/${user?._id}`,
        {},
        user?.token,
        'GET',
        true
      );
      setConversations(data);
      setError('');
      setLoading(false);
    } catch (error: any) {
      setError(error.toString());
      setLoading(false);
    }
  };

  return (
    <div className={styles.conversationListContainer}>
      <CloseIcon
        className={styles.closeIcon}
        onClick={() => setIsConversationListOpen(false)}
      />
      <div className={styles.listWrapper}>
        <h1 className={styles.title}>Conversations</h1>
        <ul className={styles.conversationList}>
          {loading && <CircularProgress />}
          {conversations.map((conversation: any): any => (
            <Conversation
              key={conversation._id}
              title={conversation.title}
              lastUpdated={conversation.updatedAt}
              onClick={() => {
                setCurrentConversation(conversation);
                setIsConversationListOpen(false);
              }}
            />
          ))}
          {error}
        </ul>
        <button
          className="button"
          onClick={() => setIsCreateConversationOpen(true)}
        >
          Create
        </button>
      </div>
    </div>
  );
}
