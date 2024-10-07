'use client';

import styles from '../dashboard/search/styles/search.module.scss';
import Image from 'next/image';

interface PhotoCardProps {
  title: string;
  imageLink?: string;
  dateCreated: string;
  onClick: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ title, imageLink, dateCreated, onClick }) => {
  return (
    <div className={styles.photoCard} onClick={onClick} style={{ cursor: 'pointer' }}>
      <h3>{title}</h3>
      {imageLink && (
        <div className={styles.imageContainer}>
          <Image
            src={imageLink}
            alt={title}
            fill
            style={{ borderRadius: '5px', objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <span>{dateCreated}</span>
    </div>
  );
};

export default PhotoCard;
