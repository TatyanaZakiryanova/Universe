import Header from '../shared/header';
import Navbar from '../shared/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <aside>
          <Navbar />
        </aside>
        <main className="mx-3 mt-5 flex-1 p-2 text-customTextColor">{children}</main>
      </div>
    </div>
  );
}
