import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center h-screen bg-customBackground p-12">
      <h1 className="text-[100px] font-bold tracking-wide gradient-text">Universe</h1>
      <Link
        href="/dashboard"
        className="mt-12 w-72 bg-customButton text-[20px] py-5 px-9 text-white text-center border-none rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:bg-customButtonHover hover:-translate-y-1"
      >
        Explore the universe
      </Link>
    </main>
  );
}
