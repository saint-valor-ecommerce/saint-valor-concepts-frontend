"use client";

import { useAuthStore } from "@/store/authStore";

export default function LogoutOverlay() {
  const { isLoggingOut } = useAuthStore();

  if (!isLoggingOut) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-charcoal/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-ivory/20 border-t-gold animate-spin" />
      <p className="text-ivory text-xs tracking-[0.3em] uppercase">
        Logging out...
      </p>
    </div>
  );
}
