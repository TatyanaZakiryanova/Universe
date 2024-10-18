'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Camera, House, Search, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between rounded-lg bg-customBackground p-4 shadow-md">
      <ul className="flex gap-2">
        <li>
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 rounded-lg p-3 text-sm text-white transition-all duration-300 hover:bg-customButtonHover ${
              pathname === '/dashboard' ? 'bg-customButton font-bold text-white' : 'text-white'
            }`}
          >
            <Camera size={16} />
            Photo of the day
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/search"
            className={`flex items-center gap-2 rounded-lg p-3 text-sm text-white transition-all duration-300 hover:bg-customButtonHover ${
              pathname === '/dashboard/search'
                ? 'bg-customButton font-bold text-white'
                : 'text-white'
            }`}
          >
            <Search size={16} />
            Search
          </Link>
        </li>
      </ul>
      <ul className="flex items-center gap-2">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 rounded-lg p-3 text-sm text-customTextColor text-white transition-all duration-300 hover:bg-customButtonHover"
          >
            <User size={16} />
            Login
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className={`flex items-center gap-2 rounded-lg p-3 text-sm text-white transition-all duration-300 hover:bg-customButtonHover ${
              pathname === '/' ? 'bg-customButton font-bold text-white' : 'text-white'
            }`}
          >
            <House size={16} />
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}
