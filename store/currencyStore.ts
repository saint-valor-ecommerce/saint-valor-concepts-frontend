import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Currency = "NGN" | "USD" | "GBP" | "CAD";

export interface CurrencyConfig {
  label: Currency;
  symbol: string;
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  NGN: { label: "NGN", symbol: "₦" },
  USD: { label: "USD", symbol: "$" },
  GBP: { label: "GBP", symbol: "£" },
  CAD: { label: "CAD", symbol: "C$" },
};

// These are strictly initial/offline fallbacks used ONLY on the first load before the live API succeeds.
export const INITIAL_FALLBACK_RATES: Record<Currency, number> = {
  NGN: 1,
  USD: 0.00067,
  GBP: 0.00053,
  CAD: 0.00091,
};

interface CurrencyStore {
  currency: Currency;
  rates: Record<Currency, number>;
  hasAttemptedDetection: boolean;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInNaira: number) => number;
  formatPrice: (priceInNaira: number) => string;
  detectCurrencyFromIP: () => Promise<void>;
  fetchExchangeRates: () => Promise<void>;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: "NGN",
      rates: INITIAL_FALLBACK_RATES,
      hasAttemptedDetection: false,
      
      setCurrency: (currency) => set({ currency }),
      
      convertPrice: (priceInNaira) => {
        const currentCurrency = get().currency;
        const rate = get().rates[currentCurrency] ?? INITIAL_FALLBACK_RATES[currentCurrency] ?? 1;
        return priceInNaira * rate;
      },
      
      formatPrice: (priceInNaira) => {
        const currentCurrency = get().currency;
        const symbol = CURRENCIES[currentCurrency]?.symbol || "₦";
        const rate = get().rates[currentCurrency] ?? INITIAL_FALLBACK_RATES[currentCurrency] ?? 1;
        const converted = priceInNaira * rate;
        
        // Show 2 decimal places for foreign currencies, 0 for NGN
        const decimals = currentCurrency === "NGN" ? 0 : 2;
        
        return `${symbol}${converted.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}`;
      },
      
      fetchExchangeRates: async () => {
        try {
          const res = await fetch("https://open.er-api.com/v6/latest/NGN").catch(() => null);
          if (!res || !res.ok) return;
          
          const data = await res.json().catch(() => null);
          if (!data || data.result !== "success" || !data.rates) return;
          
          set({
            rates: {
              NGN: 1,
              USD: data.rates.USD || INITIAL_FALLBACK_RATES.USD,
              GBP: data.rates.GBP || INITIAL_FALLBACK_RATES.GBP,
              CAD: data.rates.CAD || INITIAL_FALLBACK_RATES.CAD,
            },
          });
        } catch (error) {
          console.error("Failed to fetch exchange rates:", error);
        }
      },
      
      detectCurrencyFromIP: async () => {
        if (get().hasAttemptedDetection) return;
        set({ hasAttemptedDetection: true });
        
        try {
          // Using freeipapi.com as it is extremely fast and requires no API key.
          // Catch errors inline to handle adblockers/network issues completely silently.
          const res = await fetch("https://freeipapi.com/api/json").catch(() => null);
          if (!res || !res.ok) return;
          
          const data = await res.json().catch(() => null);
          if (!data) return;
          
          const countryCode = data.countryCode; // e.g. "US", "GB", "CA", "NG"
          
          if (countryCode === "US") {
            set({ currency: "USD" });
          } else if (countryCode === "GB") {
            set({ currency: "GBP" });
          } else if (countryCode === "CA") {
            set({ currency: "CAD" });
          } else if (countryCode === "NG") {
            set({ currency: "NGN" });
          } else {
            // Default to USD for other international users
            set({ currency: "USD" });
          }
        } catch {
          // Fail silently and preserve default state (NGN)
        }
      },
    }),
    {
      name: "saint-valor-currency",
    }
  )
);
