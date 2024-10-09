import Navbar from '../ui/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col flex-grow items-center p-6 bg-customBackground2 text-customTextColor">
        {children}
      </main>
    </div>
  );
}
