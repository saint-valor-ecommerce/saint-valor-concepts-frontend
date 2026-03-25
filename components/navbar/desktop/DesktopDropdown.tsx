"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type DropdownItem = { label: string; href: string; count?: number };

export function DesktopDropdown({
  label,
  items,
}: {
  label: string;
  href: string;
  items: DropdownItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bottom-nav-link-style flex items-center bg-transparent border-none cursor-pointer"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-5 h-5 ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`
          fixed left-0 right-0 top-(--nav-height) bg-ivory z-50 
          transform translate-y-4 border-t border-burgundy
          transition-all duration-150
          ${
            isOpen
              ? "opacity-100 visible pointer-events-auto"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
      >
        <h1 className="uppercase px-14 pt-10 font-medium">Jewelry Type</h1>
        <ul className="py-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={handleItemClick}
                className="flex items-center gap-1 px-14 py-2 text-sm uppercase transition-colors"
              >
                <span>{item.label}</span>
                {typeof item.count === "number" && (
                  <span className="text-xs">({item.count})</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
