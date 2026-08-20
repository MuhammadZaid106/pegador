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

export const navLinks: MenuLink[] = [
  { label: "MEN", href: "/men" },
  { label: "WOMEN", href: "/women" },
  { label: "ESSENTIALS", href: "/essentials" },
  { label: "FIRE", href: "/fire" },
];

export const megaMenuByNav: Record<string, MegaMenuData> = {
  MEN: {
    columns: [
      {
        title: "FEATURED",
        links: [
          { label: "Here and Now", href: "/collections/here-and-now-men" },
          { label: "Athletic Capsule", href: "/collections/athletic-capsule-men" },
          { label: "Summer Graphics", href: "/collections/summer-graphics-men" },
          { label: "All products", href: "/collections/men" },
        ],
      },
      {
        title: "TOPS",
        links: [
          { label: "Teas", href: "/collections/men-tshirts" },
          { label: "Shirts", href: "/collections/men-shirts" },
          { label: "Hoodies", href: "/collections/men-hoodies" },
          { label: "Sweat Jackets", href: "/collections/men-sweat-jackets" },
          { label: "Sweaters", href: "/collections/men-sweaters" },
          { label: "Longsleeves", href: "/collections/men-longsleeves" },
          { label: "Track Jackets", href: "/collections/men-track-jackets" },
          { label: "Knitwear", href: "/collections/men-knitwear" },
        ],
      },
      {
        title: "BOTTOMS",
        links: [
          { label: "shorts", href: "/collections/men-shorts" },
          { label: "Swim Shorts", href: "/collections/men-swim-shorts" },
          { label: "Pants & Joggers", href: "/collections/men-pants-joggers" },
          { label: "jeans", href: "/collections/men-jeans" },
          { label: "Cargo", href: "/collections/men-cargo" },
        ],
      },
      {
        title: "OUTERWEAR",
        links: [
          { label: "Jackets", href: "/collections/men-jackets" },
          { label: "Vests", href: "/collections/men-vests" },
        ],
      },
      {
        title: "FOOTWEAR",
        links: [
          { label: "Slides", href: "/collections/men-slides" },
          { label: "Footwear", href: "/collections/men-footwear" },
        ],
      },
      {
        title: "ACCESSORIES",
        links: [
          { label: "Socks", href: "/collections/men-socks" },
          { label: "Caps & Hats", href: "/collections/men-caps-hats" },
          { label: "Underwear", href: "/collections/men-underwear" },
          { label: "Sunglasses", href: "/collections/men-sunglasses" },
          { label: "Perfumes", href: "/collections/men-perfumes" },
          { label: "Bags", href: "/collections/men-bags" },
          { label: "Beanies", href: "/collections/men-beanies" },
          { label: "Gift cards", href: "/info/gift-card" },
        ],
      },
    ],
  },
  WOMEN: {
    columns: [
      {
        title: "FEATURED",
        links: [
          { label: "Here and Now", href: "/collections/here-and-now-women" },
          { label: "Athletic Capsule", href: "/collections/athletic-capsule-women" },
          { label: "Summer Graphics", href: "/collections/summer-graphics-women" },
          { label: "All products", href: "/collections/women" },
        ],
      },
      {
        title: "TOPS",
        links: [
          { label: "Teas", href: "/collections/women-tshirts" },
          { label: "Tops", href: "/collections/women-tops" },
          { label: "Hoodies", href: "/collections/women-hoodies" },
          { label: "Sweat Jackets", href: "/collections/women-sweat-jackets" },
          { label: "Sweaters", href: "/collections/women-sweaters" },
          { label: "Longsleeves", href: "/collections/women-longsleeves" },
          { label: "Shirts", href: "/collections/women-shirts" },
          { label: "Track Jackets", href: "/collections/women-track-jackets" },
          { label: "Knitwear", href: "/collections/women-knitwear" },
        ],
      },
      {
        title: "BOTTOMS",
        links: [
          { label: "shorts", href: "/collections/women-shorts" },
          { label: "Pants & Joggers", href: "/collections/women-pants-joggers" },
          { label: "jeans", href: "/collections/women-jeans" },
          { label: "leggings", href: "/collections/women-leggings" },
        ],
      },
      {
        title: "OUTERWEAR",
        links: [
          { label: "Jackets", href: "/collections/women-jackets" },
          { label: "Vests", href: "/collections/women-vests" },
        ],
      },
      {
        title: "FOOTWEAR",
        links: [
          { label: "Slides", href: "/collections/women-slides" },
          { label: "Footwear", href: "/collections/women-footwear" },
        ],
      },
      {
        title: "ACCESSORIES",
        links: [
          { label: "Socks", href: "/collections/women-socks" },
          { label: "Caps & Hats", href: "/collections/women-caps-hats" },
          { label: "Sunglasses", href: "/collections/women-sunglasses" },
          { label: "Perfumes", href: "/collections/women-perfumes" },
          { label: "Bags", href: "/collections/women-bags" },
          { label: "Beanies", href: "/collections/women-beanies" },
          { label: "Gift cards", href: "/products/gift-card" },
        ],
      },
    ],
  },
  ESSENTIALS: {
    columns: [
      {
        title: "MEN",
        links: [
          { label: "Teas", href: "/collections/essentials-men-tees" },
          { label: "shorts", href: "/collections/essentials-men-shorts" },
          { label: "Swim Shorts", href: "/collections/essentials-men-swim-shorts" },
          { label: "Pants & Joggers", href: "/collections/essentials-men-pants-joggers" },
          { label: "Hoodies", href: "/collections/essentials-men-hoodies" },
          { label: "Sweat Jackets", href: "/collections/essentials-men-sweat-jackets" },
          { label: "Sweaters", href: "/collections/essentials-men-sweaters" },
          { label: "Longsleeves", href: "/collections/essentials-men-longsleeves" },
          { label: "Track Jackets", href: "/collections/essentials-men-track-jackets" },
        ],
      },
      {
        title: "WOMEN",
        links: [
          { label: "Tees & Tops", href: "/collections/essentials-women-tees-tops" },
          { label: "shorts", href: "/collections/essentials-women-shorts" },
          { label: "Pants & Joggers", href: "/collections/essentials-women-pants-joggers" },
          { label: "Hoodies", href: "/collections/essentials-women-hoodies" },
          { label: "Sweat Jackets", href: "/collections/essentials-women-sweat-jackets" },
          { label: "Sweaters", href: "/collections/essentials-women-sweaters" },
          { label: "Longsleeves", href: "/collections/essentials-women-longsleeves" },
          { label: "Track Jackets", href: "/collections/essentials-women-track-jackets" },
        ],
      },
    ],
    imageCards: [
      {
        src: "/img3.webp",
        alt: "Essentials lookbook image one",
        caption: "Summer Stroll",
        href: "/collections/essentials",
      },
      {
        src: "/img4.webp",
        alt: "Essentials lookbook image two",
        caption: "City Ease",
        href: "/collections/essentials",
      },
    ],
  },
  FIRE: {
    columns: [
      {
        title: "FIRE",
        links: [
          { label: "About us", href: "/info/about-us" },
          { label: "Lookbook FW '26 | Here and Now", href: "/collections/here-and-now" },
        ],
      },
      {
        title: "LOOKBOOKS",
        links: [
          { label: "Summer Dreams | S '26", href: "/collections/summer-dreams" },
          { label: "Moments to Memories | SP '26", href: "/collections/moments-to-memories" },
          { label: "Whispers of Cold | W '25", href: "/collections/whispers-of-cold" },
          { label: "Everyday Ambition | FW '25", href: "/collections/everyday-ambition" },
          { label: "Scent of Summer | S '25", href: "/collections/scent-of-summer" },
          { label: "All We Got | SP '25", href: "/collections/all-we-got" },
        ],
      },
      {
        title: "SOCIAL MEDIA",
        links: [
          { label: "Instagram", href: "https://instagram.com" },
          { label: "TikTok", href: "https://tiktok.com" },
          { label: "YouTube", href: "https://youtube.com" },
          { label: "Facebook", href: "https://facebook.com" },
        ],
      },
    ],
    imageCards: [
      {
        src: "/img5.webp",
        alt: "Fire campaign image",
        caption: "Here and Now | FW '26",
        href: "/collections/here-and-now",
      },
    ],
  },
};
