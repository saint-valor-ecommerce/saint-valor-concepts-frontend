import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { CurrencyDropdown } from "../CurrencyDropdown";
import UserMenu from "../UserMenu";
import CartIcon from "@/components/ui/CartIcon";

const navStyles =
  "flex items-center justify-center text-burgundy cursor-pointer";

const DesktopTopNav = () => {
  return (
    <nav className="flex justify-between">
      <div>
        <Link href="/" aria-label="Go to homepage">
          <Image
            src="/images/Logo.svg"
            width={50}
            height={50}
            alt="Saint Valor Logo"
            style={{ width: "50px", height: "auto" }}
          />
        </Link>
      </div>

      <div className="flex items-center gap-2.5">
        <UserMenu />

        {/* Cart */}
        <Link
          href="/cart"
          className="flex items-center justify-center text-burgundy cursor-pointer"
        >
          <CartIcon className="text-burgundy" />
        </Link>

        <Link
          href="/favourites"
          className={navStyles}
          aria-label="Open favourites"
        >
          <Heart className="w-6 h-6" />
        </Link>

        <div className="w-px h-6 bg-charcoal" />
        <div>
          <CurrencyDropdown />
        </div>
      </div>
    </nav>
  );
};

export default DesktopTopNav;
