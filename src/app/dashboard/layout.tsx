import Navbar from '../ui/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>
        <section>{children}</section>
      </main>
    </>
  );
}
