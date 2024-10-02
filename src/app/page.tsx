import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.home}>
      <h1>Universe</h1>
      <Link href="/dashboard">Explore the universe</Link>
    </main>
  );
}
