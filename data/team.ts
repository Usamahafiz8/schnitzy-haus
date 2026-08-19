// ============================================================================
// THE TEAM — kitchen staff shown in the homepage "Our Chefs" section. Same
// pattern as data/menu.ts: edit this file and the section updates
// automatically. `image` is optional, same placeholder convention as menu
// items (see PlaceholderImage) until real staff photos are added.
// ============================================================================

export type LocalizedText = { de: string; en: string };

export type TeamMember = {
  id: string;
  name: string;
  bio: LocalizedText;
  rating: number;
  image?: string;
};

export const team: TeamMember[] = [
  {
    id: "owen-grant",
    name: "Owen Grant",
    bio: {
      de: "Bringt 15 Jahre Erfahrung aus Wiener Küchen mit und verantwortet jedes Schnitzelrezept im Haus.",
      en: "Brings 15 years of experience from Viennese kitchens and oversees every schnitzel recipe in the house.",
    },
    rating: 5,
  },
  {
    id: "liam-john",
    name: "Liam John",
    bio: {
      de: "Perfektioniert unsere Burger-Patties und Saucen — jede Charge wird von Hand abgeschmeckt.",
      en: "Perfects our burger patties and sauces — every batch is hand-tasted.",
    },
    rating: 5,
  },
  {
    id: "harry-callum",
    name: "Harry Callum",
    bio: {
      de: "Verantwortlich für Bowls und Beilagen, mit einem Faible für frische, saisonale Zutaten.",
      en: "Runs our bowls and sides, with a soft spot for fresh, seasonal ingredients.",
    },
    rating: 5,
  },
];
