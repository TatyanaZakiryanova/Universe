'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="h-[80vh] w-[20vw] bg-customBackground p-5 shadow">
        <ul className="flex flex-col gap-2">
          <li>
            <Link
              href="/dashboard"
              className={`block rounded p-3 text-white transition-all duration-300 hover:bg-customButtonHover ${
                pathname === '/dashboard' ? 'bg-customButton font-bold text-white' : 'text-white'
              }`}
            >
              Photo of the day
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/search"
              className={`block rounded p-3 text-white transition-all duration-300 hover:bg-customButtonHover ${
                pathname === '/dashboard/search'
                  ? 'bg-customButton font-bold text-white'
                  : 'text-white'
              }`}
            >
              Photo search
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`block rounded p-3 text-white transition-all duration-300 hover:bg-customButtonHover ${
                pathname === '/' ? 'bg-customButton font-bold text-white' : 'text-white'
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
