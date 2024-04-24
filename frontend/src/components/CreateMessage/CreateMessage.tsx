import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import styles from './CreateMessage.module.scss';
import { useConversation } from '../../contexts/ConversationContext';
import { useAuth } from '../../contexts/AuthContext';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import API_URL from '../../utils/apiConfig';
import apiFetch from '../../utils/apiFetch';
import { MessageI } from '../../interfaces/interfaces';

interface CreateMessageProps {
  setMessages: Dispatch<SetStateAction<MessageI[]>>;
}

export default function CreateMessage({
  setMessages,
}: CreateMessageProps) {
  const [content, setContent] = useState('');
  const { currentConversation } = useConversation();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile] = useState<File | undefined>();

  const handleSendMessage = async () => {
    if (content.trim() !== '') {
      const formData = new FormData();

      formData.append('content', content);
      if (currentConversation) {
        formData.append('conversationId', currentConversation._id);
      }
      if (user?._id) {
        formData.append('senderId', user._id);
      }
      if (imgFile) {
        formData.append('image', imgFile);
      }

      try {
        const data = await apiFetch(
          `${API_URL}/messages/create`,
          formData,
          user?.token,
          'POST',
          false
        );
        setMessages((prevMessages: MessageI[]) => [
          ...prevMessages,
          data.newMessage,
        ]);
        setError('');
        setImgFile(undefined);
      } catch (error: any) {
        setError(error.toString());
      }
      setContent('');
    }
  };

  const handleSVGClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setImgFile(target.files[0]);
  };

  return (
    <div className={styles.form}>
      {imgFile ? (
        <CheckBoxIcon />
      ) : (
        <AddPhotoAlternateIcon onClick={handleSVGClick} />
      )}
      <input
        type="file"
        name="image"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
        required
        placeholder="write a message..."
      />
      <SendIcon onClick={handleSendMessage} />
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.error}>{error}</p>
        </div>
      )}
    </div>
  );
}
