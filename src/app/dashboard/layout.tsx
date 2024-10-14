import Navbar from '../ui/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="relative">
        <Navbar />
      </aside>
      <div className="flex flex-grow flex-col text-customTextColor">
        <header className="flex items-center justify-between p-4">
          <h1 className="text-2xl">Universe</h1>
          <div className="flex space-x-4">
            <button className="rounded p-2">Login</button>
          </div>
        </header>
        <main className="flex flex-grow justify-center p-4">{children}</main>
      </div>
    </div>
  );
}
