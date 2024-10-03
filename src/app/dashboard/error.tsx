'use client';

import styles from './styles/error.module.scss';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className={styles.error}>
      <h2 className={styles.title}>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
