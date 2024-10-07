import styles from '../dashboard/search/styles/search.module.scss';
import Image from 'next/image';

interface InitialPhotoCardProps {
  title: string;
  url: string;
  copyright: string;
  date: string;
}

const InitialPhotoCard: React.FC<InitialPhotoCardProps> = ({ title, url, copyright, date }) => {
  return (
    <div className={styles.photoCard}>
      <h3>{title}</h3>
      <div className={styles.imageContainer}>
        <Image
          src={url}
          alt={title}
          fill
          style={{ borderRadius: '5px', objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
      </div>
      <span>{copyright} </span>
      <span>{date}</span>
    </div>
  );
};

export default InitialPhotoCard;
