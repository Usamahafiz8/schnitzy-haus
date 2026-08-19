// ============================================================================
// THE MENU — edit this file and the whole site (home page highlights, the
// full /menu page, and order pricing) updates automatically. Nothing else
// needs to change.
//
// To add a dish: copy an existing entry, give it a unique `id`, fill in the
// fields. To remove one: delete its entry. `priceCents` is the price in
// cents (e.g. 1090 = €10.90) so totals never suffer floating-point rounding
// errors. `popular: true` puts a dish in the homepage "Popular Dishes" strip.
//
// `image` is optional — point it at a file under `public/images/menu/` (see
// the README) once you have real photos. Until then, a styled placeholder is
// shown automatically.
// ============================================================================

export type LocalizedText = { de: string; en: string };

export type MenuCategoryId =
  | "burgers"
  | "schnitzel"
  | "bowls"
  | "sides"
  | "drinks";

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: LocalizedText;
  description: LocalizedText;
  priceCents: number;
  popular?: boolean;
  image?: string;
  rating?: number;
  ratingCount?: number;
};

export type MenuCategory = {
  id: MenuCategoryId;
  label: LocalizedText;
};

export const menuCategories: MenuCategory[] = [
  { id: "burgers", label: { de: "Burger", en: "Burgers" } },
  { id: "schnitzel", label: { de: "Schnitzel", en: "Schnitzel" } },
  { id: "bowls", label: { de: "Bowls", en: "Bowls" } },
  { id: "sides", label: { de: "Beilagen", en: "Sides" } },
  { id: "drinks", label: { de: "Getränke", en: "Drinks" } },
];

export const menuItems: MenuItem[] = [
  // --- Burgers ---
  {
    id: "beef-burger",
    category: "burgers",
    name: { de: "Beef Burger", en: "Beef Burger" },
    description: {
      de: "Saftiges Rindfleisch, Cheddar, Salat, Spezial-Sauce",
      en: "Juicy beef patty, cheddar, lettuce, special sauce",
    },
    priceCents: 1190,
    popular: true,
    rating: 4.9,
    ratingCount: 214,
  },
  {
    id: "schnitzel-burger",
    category: "burgers",
    name: { de: "Schnitzel Burger", en: "Schnitzel Burger" },
    description: {
      de: "Knuspriges Hähnchenschnitzel, Salat, Haus-Sauce",
      en: "Crispy chicken schnitzel, lettuce, house sauce",
    },
    priceCents: 1090,
    popular: true,
    rating: 4.8,
    ratingCount: 189,
  },
  {
    id: "bacon-cheese-burger",
    category: "burgers",
    name: { de: "Bacon Cheese Burger", en: "Bacon Cheese Burger" },
    description: {
      de: "Doppel-Patty, Bacon, Cheddar, karamellisierte Zwiebeln",
      en: "Double patty, bacon, cheddar, caramelized onions",
    },
    priceCents: 1290,
    rating: 4.9,
    ratingCount: 156,
  },
  {
    id: "veggie-burger",
    category: "burgers",
    name: { de: "Veggie Burger", en: "Veggie Burger" },
    description: {
      de: "Hausgemachtes Gemüsepatty, Avocado, Rucola, Joghurt-Dip",
      en: "House-made veggie patty, avocado, arugula, yogurt dip",
    },
    priceCents: 1050,
    rating: 4.6,
    ratingCount: 98,
  },

  // --- Schnitzel ---
  {
    id: "wiener-schnitzel",
    category: "schnitzel",
    name: { de: "Wiener Schnitzel", en: "Wiener Schnitzel" },
    description: {
      de: "Klassisches Kalbsschnitzel, Zitrone, Preiselbeeren, Pommes",
      en: "Classic veal schnitzel, lemon, cranberry sauce, fries",
    },
    priceCents: 1590,
    rating: 4.9,
    ratingCount: 245,
  },
  {
    id: "chicken-schnitzel",
    category: "schnitzel",
    name: { de: "Chicken Schnitzel", en: "Chicken Schnitzel" },
    description: {
      de: "Knuspriges Hähnchenschnitzel, Salat, Haus-Sauce",
      en: "Crispy chicken schnitzel, salad, house sauce",
    },
    priceCents: 1290,
    rating: 4.7,
    ratingCount: 132,
  },
  {
    id: "schnitzel-jaeger",
    category: "schnitzel",
    name: { de: "Schnitzel Jäger-Art", en: "Schnitzel Hunter-Style" },
    description: {
      de: "Schnitzel mit Champignon-Rahmsauce und Kroketten",
      en: "Schnitzel with creamy mushroom sauce and croquettes",
    },
    priceCents: 1490,
    rating: 4.8,
    ratingCount: 87,
  },

  // --- Bowls ---
  {
    id: "schnitzy-bowl",
    category: "bowls",
    name: { de: "Schnitzy Bowl", en: "Schnitzy Bowl" },
    description: {
      de: "Knuspriges Hähnchen, Reis, Salat, Haus-Sauce",
      en: "Crispy chicken, rice, salad, house sauce",
    },
    priceCents: 990,
    popular: true,
    rating: 4.7,
    ratingCount: 121,
  },
  {
    id: "power-bowl",
    category: "bowls",
    name: { de: "Power Bowl", en: "Power Bowl" },
    description: {
      de: "Quinoa, gegrilltes Hähnchen, Avocado, Kirschtomaten",
      en: "Quinoa, grilled chicken, avocado, cherry tomatoes",
    },
    priceCents: 1150,
    rating: 4.6,
    ratingCount: 74,
  },

  // --- Sides ---
  {
    id: "loaded-fries",
    category: "sides",
    name: { de: "Loaded Fries", en: "Loaded Fries" },
    description: {
      de: "Pommes, Käse-Sauce, Rinderhack, Jalapeños",
      en: "Fries, cheese sauce, ground beef, jalapeños",
    },
    priceCents: 690,
    popular: true,
    rating: 4.6,
    ratingCount: 143,
  },
  {
    id: "classic-fries",
    category: "sides",
    name: { de: "Pommes Frites", en: "Classic Fries" },
    description: {
      de: "Knusprige Pommes mit Haus-Gewürzsalz",
      en: "Crispy fries with house seasoning salt",
    },
    priceCents: 390,
    rating: 4.5,
    ratingCount: 210,
  },
  {
    id: "onion-rings",
    category: "sides",
    name: { de: "Onion Rings", en: "Onion Rings" },
    description: {
      de: "Knusprige Zwiebelringe mit BBQ-Dip",
      en: "Crispy onion rings with BBQ dip",
    },
    priceCents: 450,
    rating: 4.4,
    ratingCount: 68,
  },

  // --- Drinks ---
  {
    id: "cola",
    category: "drinks",
    name: { de: "Cola", en: "Cola" },
    description: { de: "0,4l", en: "0.4l" },
    priceCents: 350,
  },
  {
    id: "still-water",
    category: "drinks",
    name: { de: "Wasser Still", en: "Still Water" },
    description: { de: "0,4l", en: "0.4l" },
    priceCents: 300,
  },
  {
    id: "peach-ice-tea",
    category: "drinks",
    name: { de: "Ice Tea Pfirsich", en: "Peach Ice Tea" },
    description: { de: "0,4l", en: "0.4l" },
    priceCents: 350,
  },
];

export function getMenuItem(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id);
}

export function getPopularItems(): MenuItem[] {
  return menuItems.filter((item) => item.popular);
}

export function getItemsByCategory(category: MenuCategoryId): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}
