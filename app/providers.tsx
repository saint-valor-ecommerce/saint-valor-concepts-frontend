"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useCurrencyStore } from "@/store/currencyStore";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Fetch dynamic exchange rates in the background on every load to keep rates up-to-date
    useCurrencyStore.getState().fetchExchangeRates().catch(() => {});

    // Only detect from IP if the user hasn't explicitly set a currency preference yet
    const stored = localStorage.getItem("saint-valor-currency");
    if (!stored) {
      useCurrencyStore.getState().detectCurrencyFromIP().catch(() => {});
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  );
}
