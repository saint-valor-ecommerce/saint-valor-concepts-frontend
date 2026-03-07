"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border py-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full cursor-pointer"
      >
        <span className="text-xs font-semibold text-charcoal uppercase tracking-wide">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-charcoal" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-charcoal" />
        )}
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
};

export default FilterSection;
