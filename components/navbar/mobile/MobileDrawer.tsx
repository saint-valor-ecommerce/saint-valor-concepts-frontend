"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Heart, X, User } from "lucide-react";
import { MENU } from "../../../data/mobileDrawer";
import LinkButton from "../../ui/LinkButton";
import { useAuthStore } from "@/store/authStore";
import { logout } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import CartIcon from "@/components/ui/CartIcon";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileDrawer({ isOpen, onClose }: DrawerProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { isLoggedIn, clearAuth, setIsLoggingOut } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      clearAuth();
      toast.success("Logged out successfully!");
      router.push("/");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Drawer */}
      <aside
        className={[
          "fixed left-0 top-0 z-50 h-dvh w-full bg-ivory",
          "shadow-xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex h-full flex-col">
          <div className="px-4 pt-2">
            <div className="flex justify-end">
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="rounded p-2"
              >
                <X className="h-5 w-5 text-burgundy" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-burgundy/10">
                  <Image
                    src="/images/Logo.svg"
                    width={42}
                    height={42}
                    style={{ height: "auto" }}
                    alt="Logo"
                    className="h-10 w-10 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <nav className="mt-4 flex-1 overflow-y-auto px-4 pb-6">
            <ul className="space-y-1">
              {MENU.map((item) => {
                if (item.type === "link") {
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between py-3 text-xs font-semibold tracking-wide text-charcoal"
                      >
                        <span>{item.label}</span>
                        {item.rightIcon === "chevron" && (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Link>
                    </li>
                  );
                }

                const expanded = openSection === item.label;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSection((prev) =>
                          prev === item.label ? null : item.label,
                        )
                      }
                      className="flex w-full items-center justify-between py-3 text-xs font-semibold tracking-wide text-charcoal"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={[
                          "h-4 w-4 transition-transform",
                          expanded ? "rotate-180" : "rotate-0",
                        ].join(" ")}
                      />
                    </button>

                    {expanded && item.children.length > 0 && (
                      <div className="pb-2 pl-2">
                        <ul className="space-y-2">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="flex items-center gap-2 py-1 text-xs font-medium uppercase tracking-wide text-charcoal"
                              >
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Divider */}
            <div className="my-4 h-px w-full bg-burgundy/20" />

            {/* Profile + Cart + Favourites */}
            <div className="space-y-3">
              {isLoggedIn && (
                <Link
                  href="/profile"
                  onClick={onClose}
                  className="flex items-center justify-between py-2 text-xs font-semibold text-charcoal"
                >
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4 text-burgundy" />
                    PROFILE
                  </span>
                  <ChevronRight className="h-4 w-4 text-charcoal" />
                </Link>
              )}

              <Link
                href="/cart"
                onClick={onClose}
                className="flex items-center justify-between py-2 text-xs font-semibold text-charcoal"
              >
                <span className="flex items-center gap-2">
                  <CartIcon size={16} className="text-burgundy" />
                  CART
                </span>
                <ChevronRight className="h-4 w-4 text-charcoal" />
              </Link>

              <Link
                href="/favourites"
                onClick={onClose}
                className="flex items-center justify-between py-2 text-xs font-semibold text-charcoal"
              >
                <span className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-burgundy" />
                  FAVOURITES
                </span>
                <ChevronRight className="h-4 w-4 text-charcoal" />
              </Link>
            </div>
          </nav>

          {/* Bottom buttons */}
          <div className="border-t border-burgundy/15 px-4 py-4">
            {isLoggedIn ? (
              <Button
                label="Log Out"
                size="sm"
                variant="primary"
                fullWidth
                onClick={handleLogout}
              />
            ) : (
              <div className="space-y-3">
                <LinkButton
                  href="/sign-in"
                  label="Log In"
                  size="sm"
                  variant="primary"
                  fullWidth
                />
                <LinkButton
                  href="/sign-up"
                  label="Sign Up"
                  size="sm"
                  variant="outline"
                  fullWidth
                />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
