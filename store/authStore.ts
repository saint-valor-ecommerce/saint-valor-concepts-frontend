import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  userName: string | null;
  isLoggingOut: boolean;
  setAuth: (userName: string) => void;
  clearAuth: () => void;
  setIsLoggingOut: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn:
    typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
  userName:
    typeof window !== "undefined" ? localStorage.getItem("firstName") : null,
  isLoggingOut: false,
  setAuth: (userName) => set({ isLoggedIn: true, userName }),
  clearAuth: () => set({ isLoggedIn: false, userName: null }),
  setIsLoggingOut: (value) => set({ isLoggingOut: value }),
}));
