import Image from "next/image";
import Link from "next/link";
import { footerColumns } from "@/data/footerData";

export default function Footer() {
  return (
    <footer className="bg-burgundy text-ivory">
      {/* Top */}
      <div className="mx-auto max-w-7xl py-10 px-6">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex flex-col items-start gap-4">
              {/* Logo */}
              <Link href="/" aria-label="Go to homepage">
                <Image
                  src="/images/Logo.svg"
                  width={80}
                  height={50}
                  alt="Saint Valor Logo"
                  style={{ height: "auto" }}
                />
              </Link>

              <div>
                <p className="text-lg font-semibold leading-tight">
                  Saint Valor
                </p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ivory/75">
                  Where elegance meets distinction — explore our collections and
                  bespoke experiences with care.
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-8">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
              {footerColumns.map((col) => (
                <div key={col.title}>
                  <p className="text-sm font-semibold">{col.title}</p>

                  <ul className="mt-4 space-y-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-ivory/70 transition hover:text-ivory"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-3 text-xs text-ivory/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Saint valor, Inc. All rights reserved
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="#" className="transition hover:text-ivory">
              Privacy policy
            </Link>

            <Link href="#" className="transition hover:text-ivory">
              Terms and conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
