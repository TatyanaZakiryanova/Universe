'use client';

import { Camera, House, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="mt-5 h-[60vh] w-[15vw] rounded-lg bg-customBackground p-2 shadow-md">
        <ul className="flex flex-col gap-2">
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
              Photo search
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
    </>
  );
}
