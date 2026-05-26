"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DesktopDropdown } from "./DesktopDropdown";

const DesktopBottomNav = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="flex justify-center items-center gap-7">
      <Link
        href="/new-arrivals"
        className={`bottom-nav-link-style ${isActive("/new-arrivals") ? "text-burgundy" : ""}`}
      >
        New Arrivals
      </Link>

      <Link
        href="/shop"
        className={`bottom-nav-link-style ${isActive("/shop") ? "text-burgundy" : ""}`}
      >
        Shop
      </Link>

      <DesktopDropdown
        label="Female"
        href="/shop?gender=Female"
        items={[
          { label: "Rings", href: "/shop?gender=Female&category=rings" },
          {
            label: "Necklaces",
            href: "/shop?gender=Female&category=necklaces",
          },
          { label: "Earrings", href: "/shop?gender=Female&category=earrings" },
          {
            label: "Bracelets",
            href: "/shop?gender=Female&category=bracelets",
          },
          {
            label: "Pant Chains",
            href: "/shop?gender=Female&category=pant-chains",
          },
          { label: "Anklet", href: "/shop?gender=Female&category=anklets" },
        ]}
      />

      <DesktopDropdown
        label="Male"
        href="/shop?gender=Male"
        items={[
          { label: "Rings", href: "/shop?gender=Male&category=rings" },
          { label: "Necklaces", href: "/shop?gender=Male&category=necklaces" },
          { label: "Earrings", href: "/shop?gender=Male&category=earrings" },
          { label: "Bracelets", href: "/shop?gender=Male&category=bracelets" },
          {
            label: "Pant Chains",
            href: "/shop?gender=Male&category=pant-chains",
          },
          { label: "Anklet", href: "/shop?gender=Male&category=anklets" },
        ]}
      />

      <DesktopDropdown
        label="Fashion"
        href="/shop?gender=Unisex"
        items={[
          { label: "Rings", href: "/shop?gender=Unisex&category=rings" },
          {
            label: "Necklaces",
            href: "/shop?gender=Unisex&category=necklaces",
          },
          { label: "Earrings", href: "/shop?gender=Unisex&category=earrings" },
          {
            label: "Bracelets",
            href: "/shop?gender=Unisex&category=bracelets",
          },
          {
            label: "Pant Chains",
            href: "/shop?gender=Unisex&category=pant-chains",
          },
          { label: "Anklet", href: "/shop?gender=Unisex&category=anklets" },
        ]}
      />

      <Link
        href="/bespoke-collection"
        className={`bottom-nav-link-style ${isActive("/bespoke-collection") ? "text-burgundy" : ""}`}
      >
        Bespoke Collection
      </Link>

      <Link
        href="/about-us"
        className={`bottom-nav-link-style ${isActive("/about-us") ? "text-burgundy" : ""}`}
      >
        About Us
      </Link>
    </nav>
  );
};

export default DesktopBottomNav;
