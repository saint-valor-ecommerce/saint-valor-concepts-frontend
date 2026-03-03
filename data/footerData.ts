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
      { label: "Female", href: "/female" },
      { label: "Male", href: "/male" },
      { label: "Fashion", href: "/fashion" },
      { label: "Bespoke collection", href: "/bespoke-collection" },
      { label: "Custom Inquiry", href: "/custom-inquiry" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "The Signature Edit", href: "/signature-edit" },
      { label: "Heirloom Series", href: "#" },
      { label: "The Prestige Collection", href: "#" },
      { label: "Elysian Line", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Contact us", href: "#" },
    ],
  },
];
