import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.skeleton}>
      <h2>Loading...</h2>
    </div>
  );
}
