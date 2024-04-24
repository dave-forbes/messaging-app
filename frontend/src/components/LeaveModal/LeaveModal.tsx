import { MouseEvent } from 'react';
import styles from './LeaveModal.module.scss';

interface LeaveModalProps {
  onClose: (event: MouseEvent<HTMLButtonElement>) => void;
  confirmLeaveConversation: () => void;
  onCancel: () => void;
}

const LeaveModal = ({
  onClose,
  confirmLeaveConversation,
  onCancel,
}: LeaveModalProps) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalContent}>
          <h2>Are you sure?</h2>
          <p>This action cannot be undone.</p>
          <div className={styles.modalButtons}>
            <button
              className="button"
              onClick={confirmLeaveConversation}
            >
              Yes, leave
            </button>
            <button className="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveModal;
