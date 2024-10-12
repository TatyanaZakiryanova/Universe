import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center h-screen bg-customBackground p-12 bg-[url('/background1.jpg')] bg-cover">
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl  font-bold tracking-wide gradient-text">
        UNIVERSE
      </h1>
      <span className="text-sm sm:text-base md:text-lg text-white">
        collection of NASA photos and knowledge
      </span>
      <Link
        href="/dashboard"
        className="mt-28 w-56 sm:w-64 md:w-72 bg-customButton text-lg sm:text-xl md:text-2xl py-4 sm:py-5 px-5 sm:px-7 text-white text-center border-none rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:bg-customButtonHover hover:-translate-y-1"
      >
        Discover the universe
      </Link>
    </main>
  );
}
