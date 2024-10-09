'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="min-w-48 bg-customBackground p-5 shadow">
        <ul className="flex justify-start">
          <li className="mr-3">
            <Link
              href="/dashboard"
              className={`block text-white p-3 rounded transition-all duration-300 hover:bg-customButtonHover ${
                pathname === '/dashboard' ? 'bg-customButton text-white font-bold' : 'text-white'
              }`}
            >
              Photo of the day
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/search"
              className={`block text-white p-3 rounded transition-all duration-300 hover:bg-customButtonHover ${
                pathname === '/dashboard/search'
                  ? 'bg-customButton text-white font-bold'
                  : 'text-white'
              }`}
            >
              Photo search
            </Link>
          </li>
          <li className="last:ml-auto">
            <Link
              href="/"
              className={`block text-white p-3 rounded transition-all duration-300 hover:bg-customButtonHover ${
                pathname === '/' ? 'bg-customButton text-white font-bold' : 'text-white'
              }`}
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
