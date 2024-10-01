import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Universe</h1>
      <Link href="/dashboard">
        <button>Explore Universe</button>
      </Link>
    </div>
  );
}
