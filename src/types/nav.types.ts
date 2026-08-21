export type MenuLink = {
  label: string;
  href: string;
};

export type MenuColumn = {
  title: string;
  links: MenuLink[];
};

export type MenuImageCard = {
  src: string;
  alt: string;
  caption: string;
  href: string;
};

export type MegaMenuData = {
  columns: MenuColumn[];
  imageCards?: MenuImageCard[];
};
