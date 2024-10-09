'use client';

import styles from '../dashboard/search/styles/search.module.scss';
import Image from 'next/image';

interface PhotoCardProps {
  title: string;
  imageUrl: string | undefined;
  date: string;
  copyright?: string;
  onClick?: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ title, imageUrl, date, copyright, onClick }) => {
  return (
    <div
      className={styles.photoCard}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <h3>{title}</h3>
      {imageUrl && (
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ borderRadius: '5px', objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      {copyright && <span>{copyright}</span>}
      <span>{date}</span>
    </div>
  );
};

export default PhotoCard;
