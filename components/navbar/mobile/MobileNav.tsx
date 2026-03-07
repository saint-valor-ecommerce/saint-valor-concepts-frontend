"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between bg-ivory p-4">
        <div>
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/images/Logo.svg"
              width={50}
              height={50}
              style={{ height: "auto" }}
              alt="Saint Valor Logo"
            />
          </Link>
        </div>

        <div>
          <button
            type="button"
            aria-label="Open Hamburger Menu"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="text-burgundy" />
          </button>
        </div>
      </nav>

      <MobileDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default MobileNav;
