import AdminNavbar from "../_components/adminNavbar/AdminNavbar";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-ivory">
      <AdminNavbar />
      {children}
    </div>
  );
}
