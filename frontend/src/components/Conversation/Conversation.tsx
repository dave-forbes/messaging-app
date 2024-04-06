import Avatar from '../Avatar/Avatar';
import styles from './Conversation.module.scss';
import formatTimeAgo from '../../utils/formatTimeAgo';

interface ConversationProps {
  title: string;
  lastUpdated: string;
  onClick: React.MouseEventHandler<HTMLLIElement>;
}

export default function Conversation({
  title,
  lastUpdated,
  onClick,
}: ConversationProps) {
  return (
    <li className={styles.conversation} onClick={onClick}>
      <Avatar user={null} size={40} />
      <div className={styles.conversationContent}>
        <div className={styles.flex}>
          <p>{title}</p>
        </div>
        <p className={styles.conversationText}>
          last updated {formatTimeAgo(lastUpdated)}
        </p>
      </div>
    </li>
  );
}
