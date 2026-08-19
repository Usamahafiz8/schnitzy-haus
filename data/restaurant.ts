// ============================================================================
// RESTAURANT INFO — the other centralized content file. Business details,
// hours, locations, socials and delivery-partner links all live here. Edit
// this file and the footer, contact page, locations page, and reservation
// rules all update together.
// ============================================================================

export type LocalizedText = { de: string; en: string };

export type Location = {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  mapsUrl: string;
};

export type DeliveryPartner = {
  name: string;
  url: string;
  /** Brand-ish accent color for the badge, used only as a subtle text/border tint. */
  color: string;
};

export const restaurant = {
  name: "Schnitzy Haus",
  tagline: {
    de: "Premium Burgers & Bowls",
    en: "Premium Burgers & Bowls",
  } satisfies LocalizedText,

  phone: "+49 69 12345678",
  email: "info@schnitzyhaus.de",

  hoursLabel: {
    de: "Montag – Sonntag",
    en: "Monday – Sunday",
  } satisfies LocalizedText,
  hoursValue: "11:00 – 23:00",

  locations: [
    {
      id: "berger-strasse",
      name: "Schnitzy Haus – Berger Straße",
      addressLine1: "Berger Straße 123",
      addressLine2: "60316 Frankfurt am Main",
      mapsUrl: "https://maps.google.com/?q=Berger+Stra%C3%9Fe+123+Frankfurt",
    },
  ] satisfies Location[],

  socials: {
    instagram: "https://instagram.com/schnitzyhaus",
    facebook: "https://facebook.com/schnitzyhaus",
    tiktok: "https://tiktok.com/@schnitzyhaus",
  },

  // Aggregate rating shown in the homepage testimonial section. Update this
  // alongside your real review platform (Google, etc.) as it changes.
  reviews: {
    rating: 4.9,
    count: 18600,
  },

  deliveryPartners: [
    { name: "Lieferando", url: "https://www.lieferando.de", color: "#fb7a06" },
    { name: "Uber Eats", url: "https://www.ubereats.com", color: "#06c167" },
    { name: "Wolt", url: "https://wolt.com", color: "#00c2e8" },
  ] satisfies DeliveryPartner[],

  // Rules the dynamic ordering/reservation systems are built against — kept
  // here so opening hours only need to change in one place.
  operations: {
    openHour: 11, // 24h clock
    closeHour: 23,
    pickupLeadTimeMinutes: 20, // earliest a new order can be picked up from now
    pickupSlotIntervalMinutes: 10,
    reservationMinPartySize: 1,
    reservationMaxPartySizeOnline: 9, // 10+ guests: ask them to call directly
  },
};
