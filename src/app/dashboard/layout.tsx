import Navbar from '../ui/navbar';
import styles from './styles/layout.module.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
