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
      <div className={styles.conversationContent}>
        <p>{title}</p>
        <p className={styles.conversationText}>
          last updated {formatTimeAgo(lastUpdated)}
        </p>
      </div>
    </li>
  );
}
