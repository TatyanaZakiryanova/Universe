import Link from 'next/link';

import { Telescope } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center bg-customBackground p-12">
      <h1 className="gradient-text text-5xl font-bold tracking-wide sm:text-6xl md:text-7xl lg:text-8xl">
        UNIVERSE
      </h1>
      <span className="text-sm text-white sm:text-base md:text-lg">
        collection of NASA photos and knowledge
      </span>
      <Link
        href="/dashboard"
        className="text-md md:text-l mt-28 flex w-56 cursor-pointer items-center justify-center gap-1 rounded-lg border-none bg-customButton px-5 py-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-customButtonHover sm:w-64 sm:px-7 sm:py-5"
      >
        <Telescope size={20} />
        Discover the universe
      </Link>
    </main>
  );
}
