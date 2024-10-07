'use client';

import { useState } from 'react';
import styles from './modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | undefined;
  description: string;
  center: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageSrc, description, center }) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        <div className={styles.info}>
          {!isImageLoaded && <p>Loading image...</p>}
          <img
            src={imageSrc}
            alt="Full size"
            className={styles.fullImage}
            onLoad={() => setIsImageLoaded(true)}
          />
          <span>Center: {center}</span>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
