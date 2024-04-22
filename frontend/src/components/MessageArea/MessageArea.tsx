import Avatar from '../Avatar/Avatar';
import styles from './MessageArea.module.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageSent from '../MessageSent/MessageSent';
import MessageRecieved from '../MessageRecieved/MessageRecieved';
import { useConversation } from '../../contexts/ConversationContext';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import CreateMessage from '../CreateMessage/CreateMessage';
import { MessageI } from '../../interfaces/interfaces';
import API_URL from '../../utils/apiConfig';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import apiFetch from '../../utils/apiFetch';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function MessageArea() {
  const { currentConversation } = useConversation();
  const [messages, setMessages] = useState<MessageI[]>([]);
  const { user } = useAuth();
  const centralDivRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentConversation) {
      fetchMessages(currentConversation._id);
    }
  }, [currentConversation]);

  const fetchMessages = async (conversationId: string) => {
    try {
      setLoading(true);
      const data = await apiFetch(
        `${API_URL}/messages/${conversationId}`,
        {},
        user?.token,
        'GET',
        true
      );
      setMessages(data);
      setLoading(false);
      setError('');
    } catch (error: any) {
      setError(error.toString());
      setLoading(false);
    }
  };

  const handleMessageSent = () => {
    if (currentConversation) {
      fetchMessages(currentConversation._id);
    }
  };

  const scrollToBottom = () => {
    const ref = centralDivRef.current;
    if (ref) {
      ref.scrollTop = ref.scrollHeight;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToBottom();
    }, 100); // Adjust the delay as needed
    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <div className={styles.messageAreaContainer}>
      <div className={styles.messageAreaInnerWrapper}>
        {error && <p className={styles.error}>{error}</p>}
        {!currentConversation && !error && (
          <div className={styles.noConversation}>
            <ArrowBackIcon />
            <h1>Please select a conversation</h1>
          </div>
        )}
        {loading && currentConversation && !error && (
          <div className={styles.loadingSpinner}>
            <CircularProgress />
          </div>
        )}
        {currentConversation && !loading && !error && (
          <>
            <div className={styles.topDiv}>
              <div className={styles.participants}>
                {currentConversation?.participants.map(
                  (participant) => (
                    <div
                      className={styles.flex}
                      key={participant._id}
                    >
                      <Avatar user={participant} size={40} />
                      <h1
                        key={participant._id}
                      >{`${participant.username}, `}</h1>
                    </div>
                  )
                )}
              </div>
              <div className={styles.conversationControls}>
                <RefreshIcon
                  onClick={() =>
                    fetchMessages(currentConversation._id)
                  }
                />
                <MoreVertIcon />
              </div>
            </div>
            <div className={styles.centralDiv} ref={centralDivRef}>
              {messages.map((message: any) =>
                message.senderId._id === user?._id ? (
                  <MessageSent
                    key={message._id}
                    content={message.content}
                    image={message.image}
                  />
                ) : (
                  <MessageRecieved
                    key={message._id}
                    content={message.content}
                    sender={message.senderId}
                    image={message.image}
                  />
                )
              )}
            </div>
            <div className={styles.bottomDiv}>
              <CreateMessage onMessageSent={handleMessageSent} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
