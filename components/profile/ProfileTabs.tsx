import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS: { href: string; label: string }[] = [
  { label: "Profile", href: "/profile" },
  { label: "Orders", href: "/profile/orders" },
];

const ProfileTabs = () => {
  const pathname = usePathname();

  const tabClass = (tab: (typeof TABS)[0]) =>
    `pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${pathname === tab.href
      ? "border-charcoal text-charcoal"
      : "border-transparent text-secondary hover:text-charcoal"
    }`;

  return (
    <div className="flex gap-8 border-b border-border mb-8">
      {TABS.map(({ href, label }) => (
        <Link href={href} key={href} className={tabClass({ href, label })}>
          {label}
        </Link>
      ))}
    </div>
  );
};

export default ProfileTabs;
