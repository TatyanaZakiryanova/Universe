import React from 'react';
import Link from 'next/link';
import { FolderHeart, User } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between rounded-lg bg-customBackground p-4 text-customTextColor shadow-md">
      <Link href="/dashboard" className="flex items-center justify-center">
        <h1 className="text-2xl">Universe</h1>
      </Link>
      <div className="flex space-x-4 text-sm">
        <button className="flex items-center gap-1 rounded p-2">
          <User size={16} />
          Login
        </button>
        <button className="flex items-center gap-1 rounded p-2">
          <FolderHeart size={16} />
          Favorites
        </button>
      </div>
    </header>
  );
};

export default Header;
