import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  userName: string | null;
  isLoggingOut: boolean;
  setAuth: (userName: string) => void;
  clearAuth: () => void;
  setIsLoggingOut: (value: boolean) => void;
  hydrate: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userName: null,
  isLoggingOut: false,
  setAuth: (userName) => set({ isLoggedIn: true, userName }),
  clearAuth: () => set({ isLoggedIn: false, userName: null }),
  setIsLoggingOut: (value) => set({ isLoggingOut: value }),
  hydrate: () => {
    const token = localStorage.getItem("token");
    const firstName = localStorage.getItem("firstName");
    set({
      isLoggedIn: !!token,
      userName: firstName,
    });
  },
}));
