export type ChildLink = {
  label: string;
  href: string;
};

export type MenuItem =
  | { type: "link"; label: string; href: string; rightIcon?: "chevron" }
  | { type: "accordion"; label: string; children: ChildLink[] };

export const MENU: MenuItem[] = [
  { type: "link", label: "NEW ARRIVALS", href: "/new-arrivals" },

  {
    type: "accordion",
    label: "FEMALE",
    children: [
      {
        label: "RINGS",
        href: "/shop?gender=Female&category=rings",
      },
      {
        label: "NECKLACES",
        href: "/shop?gender=Female&category=necklaces",
      },
      {
        label: "EARRINGS",
        href: "/shop?gender=Female&category=earrings",
      },
      {
        label: "BRACELETS",
        href: "/shop?gender=Female&category=bracelets",
      },
      {
        label: "PANT CHAINS",
        href: "/shop?gender=Female&category=pant-chains",
      },
      {
        label: "ANKLETS",
        href: "/shop?gender=Female&category=anklets",
      },
    ],
  },

  {
    type: "accordion",
    label: "MALE",
    children: [
      { label: "RINGS", href: "/shop?gender=Male&category=rings" },
      { label: "NECKLACES", href: "/shop?gender=Male&category=necklaces" },
      { label: "EARRINGS", href: "/shop?gender=Male&category=earrings" },
      { label: "BRACELETS", href: "/shop?gender=Male&category=bracelets" },
      { label: "PANT CHAINS", href: "/shop?gender=Male&category=pant-chains" },
    ],
  },

  {
    type: "accordion",
    label: "FASHION",
    children: [
      { label: "RINGS", href: "/shop?gender=Unisex&category=rings" },
      { label: "NECKLACES", href: "/shop?gender=Unisex&category=necklaces" },
      { label: "EARRINGS", href: "/shop?gender=Unisex&category=earrings" },
      { label: "BRACELETS", href: "/shop?gender=Unisex&category=bracelets" },
      {
        label: "PANT CHAINS",
        href: "/shop?gender=Unisex&category=pant-chains",
      },
      { label: "ANKLETS", href: "/shop?gender=Unisex&category=anklets" },
    ],
  },

  {
    type: "link",
    label: "BESPOKE COLLECTION",
    href: "/bespoke-collection",
    rightIcon: "chevron",
  },
  {
    type: "link",
    label: "CUSTOM INQUIRY",
    href: "/custom-inquiry",
    rightIcon: "chevron",
  },
  {
    type: "link",
    label: "ABOUT US",
    href: "/about-us",
    rightIcon: "chevron",
  },
];
