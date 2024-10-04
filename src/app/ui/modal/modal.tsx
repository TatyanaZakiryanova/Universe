import styles from './modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | undefined;
  description: string;
}

export default function Modal({ isOpen, onClose, imageSrc, description }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closebutton}>
          X
        </button>
        <div className={styles.info}>
          <img src={imageSrc} alt="Full size" className={styles.fullimage} />
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
