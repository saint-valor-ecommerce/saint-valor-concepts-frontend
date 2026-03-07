import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { CurrencyDropdown } from "../CurrencyDropdown";
import UserMenu from "../UserMenu";

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
            style={{ height: "auto" }}
          />
        </Link>
      </div>

      <div className="flex items-center gap-2.5">
        {/* User menu button */}
        <UserMenu />

        {/* Cart */}
        <button type="button" className={navStyles} aria-label="Open cart">
          <ShoppingCart className="w-6 h-6" />
        </button>

        {/* Fav */}
        <Link
          href="/favourites"
          className={navStyles}
          aria-label="Open favourites"
        >
          <Heart className="w-6 h-6" />
        </Link>

        {/* Divider */}
        <div className="w-px h-6 bg-charcoal" />
        {/* Currency */}
        <div>
          <CurrencyDropdown />
        </div>
      </div>
    </nav>
  );
};

export default DesktopTopNav;
