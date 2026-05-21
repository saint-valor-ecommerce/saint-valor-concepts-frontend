import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Currency = "NGN" | "USD" | "GBP" | "CAD";

export interface CurrencyConfig {
  label: Currency;
  symbol: string;
  rate: number; // Multiply NGN price by this rate to get target currency price
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  NGN: { label: "NGN", symbol: "₦", rate: 1 },
  USD: { label: "USD", symbol: "$", rate: 0.00067 },  // approx 1 NGN = 0.00067 USD (1 USD = 1500 NGN)
  GBP: { label: "GBP", symbol: "£", rate: 0.00053 },  // approx 1 NGN = 0.00053 GBP (1 GBP = 1900 NGN)
  CAD: { label: "CAD", symbol: "C$", rate: 0.00091 }, // approx 1 NGN = 0.00091 CAD (1 CAD = 1100 NGN)
};

interface CurrencyStore {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInNaira: number) => number;
  formatPrice: (priceInNaira: number) => string;
  detectCurrencyFromIP: () => Promise<void>;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: "NGN",
      
      setCurrency: (currency) => set({ currency }),
      
      convertPrice: (priceInNaira) => {
        const currentCurrency = get().currency;
        const config = CURRENCIES[currentCurrency] || CURRENCIES.NGN;
        return priceInNaira * config.rate;
      },
      
      formatPrice: (priceInNaira) => {
        const currentCurrency = get().currency;
        const config = CURRENCIES[currentCurrency] || CURRENCIES.NGN;
        const converted = priceInNaira * config.rate;
        
        // Show 2 decimal places for foreign currencies, 0 for NGN
        const decimals = currentCurrency === "NGN" ? 0 : 2;
        
        return `${config.symbol}${converted.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}`;
      },
      
      detectCurrencyFromIP: async () => {
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
