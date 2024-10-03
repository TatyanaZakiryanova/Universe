import styles from './styles/loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.header}></div>
      <div className={styles.content}></div>
    </div>
  );
}
