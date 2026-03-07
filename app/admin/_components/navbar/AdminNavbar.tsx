"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Power } from "lucide-react";
import { logout } from "@/lib/api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const navLinks = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Users", href: "/admin/users" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Products", href: "/admin/products" },
];

export default function AdminNavbar() {
  const { clearAuth } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      clearAuth();
      toast.success("Logged out successfully!");
      router.push("/admin/sign-in");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <nav className="w-full bg-ivory px-8 py-4 flex items-center justify-between gap-12">
      <Image
        src="/images/Logo.svg"
        alt="Saint Valor Logo"
        width={50}
        height={50}
        style={{ height: "auto" }}
      />

      <ul className="flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-xs tracking-widest uppercase transition-all pb-1 ${
                  isActive
                    ? "border-b-2 border-charcoal font-medium text-charcoal"
                    : "text-secondary hover:text-charcoal"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div>
        <button type="button" className="cursor-pointer" onClick={handleLogout}>
          <Power />
        </button>
      </div>
    </nav>
  );
}
