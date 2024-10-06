import { useState } from 'react';
import styles from './modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | undefined;
  description: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageSrc, description }) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closebutton}>
          X
        </button>
        <div className={styles.info}>
          {!isImageLoaded && <p>Loading image...</p>}
          <img
            src={imageSrc}
            alt="Full size"
            className={styles.fullimage}
            onLoad={() => setIsImageLoaded(true)}
          />
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
