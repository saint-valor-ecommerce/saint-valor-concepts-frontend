export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "New arrivals", href: "/new-arrivals" },
      { label: "Female", href: "/shop?gender=Female" },
      { label: "Male", href: "/shop?gender=Male" },
      { label: "Fashion", href: "/shop?gender=Unisex" },
      { label: "Bespoke collection", href: "/bespoke-collection" },
      { label: "Custom Inquiry", href: "/custom-inquiry" },
    ],
  },
  {
    title: "Collections",
    links: [{ label: "The Signature Edit", href: "/shop" }],
  },
  {
    title: "Support",
    links: [
      { label: "Returns", href: "/returns-policy" },
      { label: "Contact us", href: "/contact-us" },
    ],
  },
];
