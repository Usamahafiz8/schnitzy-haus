// All customer-facing UI copy for the site lives in one shape, implemented
// once per locale in `i18n/dictionaries/*.ts`. Because both dictionaries are
// typed against this, TypeScript fails the build if a translation is missing
// a key the other one has — the two files can't drift apart silently.
export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    menu: string;
    about: string;
    contact: string;
    locations: string;
    reservations: string;
    orderNow: string;
    search: string;
    cart: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    titleHighlight: string;
    description: string;
    ctaOrder: string;
    ctaMenu: string;
  };
  features: {
    premiumQuality: { title: string; description: string };
    madeFresh: { title: string; description: string };
    fastPickup: { title: string; description: string };
    topRated: { title: string; description: string };
  };
  popularDishes: {
    eyebrow: string;
    title: string;
    viewAll: string;
    addToCart: string;
  };
  deliveryPartners: {
    eyebrow: string;
    title: string;
  };
  aboutSection: {
    eyebrow: string;
    title: string;
    paragraph: string;
    cta: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    information: string;
    contactTitle: string;
    hoursTitle: string;
    impressum: string;
    datenschutz: string;
    closingNote: string;
    rights: string;
  };
  menuPage: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    popularBadge: string;
    addToCart: string;
    noResults: string;
    ctaEyebrow: string;
    ctaHeading: string;
    ctaBody: string;
    formFirstName: string;
    formLastName: string;
    formEmail: string;
    formPhone: string;
    formSubject: string;
    formMessage: string;
    formSubmit: string;
    formSubmitting: string;
    formSuccess: string;
  };
  cartPage: {
    title: string;
    empty: string;
    emptyCta: string;
    quantity: string;
    remove: string;
    subtotal: string;
    checkoutCta: string;
    continueShopping: string;
    itemNote: string;
  };
  checkoutPage: {
    title: string;
    subtitle: string;
    yourOrder: string;
    name: string;
    phone: string;
    email: string;
    pickupTime: string;
    pickupHint: string;
    notes: string;
    notesPlaceholder: string;
    total: string;
    submit: string;
    submitting: string;
    payAtPickup: string;
    backToCart: string;
  };
  orderConfirmation: {
    title: string;
    thankYou: string;
    orderNumberLabel: string;
    pickupTimeLabel: string;
    payNotice: string;
    backHome: string;
  };
  reservationsPage: {
    title: string;
    subtitle: string;
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    partySize: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    submitting: string;
    largePartyNotice: string;
    successTitle: string;
    successBody: string;
    backHome: string;
  };
  aboutPage: {
    title: string;
    intro: string;
    body: string;
  };
  contactPage: {
    title: string;
    subtitle: string;
    addressTitle: string;
    hoursTitle: string;
    getInTouch: string;
  };
  locationsPage: {
    title: string;
    subtitle: string;
    getDirections: string;
  };
  testimonials: {
    title: string;
    quote: string;
    feedbackLabel: string;
    reviewsSuffix: string;
  };
  chefs: {
    title: string;
    roleLabel: string;
  };
  bookTable: {
    title: string;
    tagline: string;
  };
  findRestaurant: {
    title: string;
    formName: string;
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  legal: {
    impressumTitle: string;
    datenschutzTitle: string;
    placeholderNotice: string;
  };
  common: {
    required: string;
    optional: string;
    loading: string;
    error: string;
  };
};
