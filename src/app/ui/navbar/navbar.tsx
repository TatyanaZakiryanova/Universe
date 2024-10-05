'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.scss';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link href="/dashboard" className={pathname === '/dashboard' ? styles.active : ''}>
              Photo of the day
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/search"
              className={pathname === '/dashboard/search' ? styles.active : ''}
            >
              Photo search
            </Link>
          </li>
          <li>
            <Link href="/" className={pathname === '/' ? styles.active : ''}>
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
