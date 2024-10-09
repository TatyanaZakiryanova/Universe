'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.scss';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="min-w-48 bg-customBackground p-5 shadow">
        <ul className="flex justify-start">
          <li className="mr-3">
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
          <li className="last:ml-auto">
            <Link href="/" className={pathname === '/' ? styles.active : ''}>
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
