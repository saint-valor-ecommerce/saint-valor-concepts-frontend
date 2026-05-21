"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useCurrencyStore, Currency } from "@/store/currencyStore";
import dynamic from "next/dynamic";

function CurrencyDropdownClient() {
  const { currency, setCurrency } = useCurrencyStore();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: Currency[] = ["NGN", "USD", "GBP", "CAD"];

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        type="button"
        className="flex items-center justify-center h-10 px-3 text-charcoal cursor-pointer"
        aria-label="Change currency"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((c) => !c)}
      >
        <span className="text-sm font-medium">{currency}</span>
        <ChevronDown
          className={`w-4 h-4 ml-1 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-28 rounded-md border border-black/10 bg-white shadow-lg overflow-hidden z-50"
          role="listbox"
          aria-label="Currency options"
        >
          {options.map((opt) => {
            const active = opt === currency;
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={active}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-black/5 transition ${
                  active ? "font-semibold bg-black/5" : ""
                }`}
                onClick={() => {
                  setCurrency(opt);
                  setIsOpen(false);
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export const CurrencyDropdown = dynamic(() => Promise.resolve(CurrencyDropdownClient), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-10 px-3 text-charcoal">
      <span className="text-sm font-medium">NGN</span>
      <ChevronDown className="w-4 h-4 ml-1" />
    </div>
  ),
});
