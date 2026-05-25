import AdminNavbar from "../_components/adminNavbar/AdminNavbar";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="hidden lg:block">
        <AdminNavbar />
      </div>
      {children}
    </div>
  );
}
