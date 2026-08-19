import type { Dictionary } from "../types";

const en = {
  meta: {
    title: "Schnitzy Haus | Premium Burgers & Bowls in Frankfurt",
    description:
      "Handmade burgers, crispy schnitzel and fresh bowls. Order online now or reserve a table.",
  },
  nav: {
    home: "Home",
    menu: "Menu",
    about: "About Us",
    contact: "Contact",
    locations: "Locations",
    reservations: "Reservations",
    orderNow: "Order Now",
    search: "Search",
    cart: "Cart",
  },
  hero: {
    titleLine1: "The Home For",
    titleLine2: "Delicious",
    titleHighlight: "Burgers",
    description:
      "Handmade burgers, crispy schnitzel, fresh ingredients and unmistakable flavor. Once you try it, you won't forget it.",
    ctaOrder: "Order Now",
    ctaMenu: "View Menu",
  },
  features: {
    premiumQuality: {
      title: "Premium Quality",
      description: "Only the best ingredients for the best taste.",
    },
    madeFresh: {
      title: "Made Fresh",
      description: "Freshly prepared, every time.",
    },
    fastPickup: {
      title: "Fast Pickup",
      description: "Order, pick up, enjoy.",
    },
    topRated: {
      title: "Top Rated",
      description: "Over 5000+ happy customers.",
    },
  },
  popularDishes: {
    eyebrow: "Our Highlights",
    title: "Our Most Popular Dishes",
    viewAll: "All Items",
    addToCart: "Add",
  },
  deliveryPartners: {
    eyebrow: "We deliver through",
    title: "Your Favorite Partners",
  },
  aboutSection: {
    eyebrow: "About Us",
    title: "More Than Just Burgers",
    paragraph:
      "At Schnitzy Haus it's all about passion, quality and real flavor. We care about fresh ingredients, our own sauces and handmade preparation. Our goal: to win you over, every single time.",
    cta: "Learn More",
  },
  footer: {
    tagline: "Premium Burgers & Bowls",
    quickLinks: "Quick Links",
    information: "Information",
    contactTitle: "Contact",
    hoursTitle: "Opening Hours",
    impressum: "Legal Notice",
    datenschutz: "Privacy Policy",
    closingNote: "We look forward to your order!",
    rights: "All rights reserved.",
  },
  menuPage: {
    title: "All Items",
    subtitle: "Handmade, fresh, and made with love.",
    searchPlaceholder: "Search a dish...",
    allCategories: "All",
    popularBadge: "Popular",
    addToCart: "Order Now",
    noResults: "No dishes found.",
    ctaEyebrow: "Get In Touch",
    ctaHeading: "Great taste for every table",
    ctaBody:
      "Enjoy freshly prepared schnitzel, burgers, pizza, and sides made with quality ingredients and warm service in a welcoming atmosphere for every guest.",
    formFirstName: "First Name",
    formLastName: "Last Name",
    formEmail: "Email",
    formPhone: "Phone number",
    formSubject: "Subject",
    formMessage: "Message",
    formSubmit: "Send a Message",
    formSubmitting: "Sending...",
    formSuccess: "Thanks! We'll get back to you shortly.",
  },
  cartPage: {
    title: "Your Cart",
    empty: "Your cart is empty.",
    emptyCta: "Browse the Menu",
    quantity: "Qty",
    remove: "Remove",
    subtotal: "Subtotal",
    checkoutCta: "Checkout",
    continueShopping: "Continue Shopping",
    itemNote: "Note (optional)",
  },
  checkoutPage: {
    title: "Checkout",
    subtitle: "Almost there! Fill in your details to complete your order.",
    yourOrder: "Your Order",
    name: "Name",
    phone: "Phone",
    email: "Email",
    pickupTime: "Pickup Time",
    pickupHint: "Choose when you'd like to pick up your order.",
    notes: "Notes",
    notesPlaceholder: "Allergies, requests, ...",
    total: "Total",
    submit: "Place Order",
    submitting: "Placing order...",
    payAtPickup: "Pay in person at pickup.",
    backToCart: "Back to Cart",
  },
  orderConfirmation: {
    title: "Order Received!",
    thankYou: "Thanks for ordering from Schnitzy Haus.",
    orderNumberLabel: "Your Order Number",
    pickupTimeLabel: "Pickup Time",
    payNotice: "Please pay in person at pickup.",
    backHome: "Back to Home",
  },
  reservationsPage: {
    title: "Reserve a Table",
    subtitle: "Secure your table at Schnitzy Haus.",
    name: "Name",
    phone: "Phone",
    email: "Email",
    date: "Date",
    time: "Time",
    partySize: "Party Size",
    notes: "Notes",
    notesPlaceholder: "Special requests...",
    submit: "Request Reservation",
    submitting: "Sending...",
    largePartyNotice: "For groups of 10 or more, please call us directly.",
    successTitle: "Request Received!",
    successBody:
      "We'll get back to you shortly by phone or email to confirm your reservation.",
    backHome: "Back to Home",
  },
  aboutPage: {
    title: "About Schnitzy Haus",
    intro: "More than just burgers.",
    body: "Schnitzy Haus was born out of a love for honest, handmade food. We combine crispy schnitzel, juicy beef burgers and fresh ingredients into dishes you won't forget. Every sauce, every breading and every bowl is made in-house — no shortcuts, no compromises. Whether it's lunch between meetings or a relaxed dinner, we want you to feel at home with us.",
  },
  contactPage: {
    title: "Contact",
    subtitle: "We'd love to hear from you.",
    addressTitle: "Address",
    hoursTitle: "Opening Hours",
    getInTouch: "Get in Touch",
  },
  locationsPage: {
    title: "Locations",
    subtitle: "Come visit us.",
    getDirections: "Get Directions",
  },
  testimonials: {
    title: "Experiences From Our Customers",
    quote:
      "“I had the pleasure of dining at Schnitzy Haus last night, and I'm still raving about the experience! The attention to detail in the presentation of the food and the service were simply flawless.”",
    feedbackLabel: "Customer Feedback",
    reviewsSuffix: "Reviews",
  },
  chefs: {
    title: "Our Chefs",
    roleLabel: "Head Chef",
  },
  bookTable: {
    title: "Book Your Table",
    tagline: "Crispy. Juicy. Delicious.",
  },
  findRestaurant: {
    title: "Find Us",
    formName: "Your Name",
  },
  faq: {
    title: "FAQ",
    items: [
      {
        question: "What are the opening hours?",
        answer: "We're open for you Monday through Sunday, from 11:00 AM to 11:00 PM.",
      },
      {
        question: "Are you open on public holidays?",
        answer:
          "Yes, we're open as usual on most public holidays. Any changes are announced ahead of time on our social media channels.",
      },
      {
        question: "How do I book a table?",
        answer:
          "Just use the reservation form further down this page, or call us directly — we'll confirm your reservation by phone or email.",
      },
      {
        question: "Are pets allowed outside and inside?",
        answer:
          "Well-behaved, leashed pets are very welcome on our outdoor terrace. For hygiene reasons, we unfortunately can't allow them inside.",
      },
      {
        question: "Do you have any ongoing promotions or special offers?",
        answer:
          "Current promotions are shared on our social media channels and directly in the menu — check back regularly.",
      },
      {
        question: "What food does your restaurant specialise in?",
        answer:
          "We specialize in handmade burgers, crispy schnitzel and fresh bowls — all made with house-made sauces and fresh ingredients.",
      },
      {
        question: "Are there choices for children on the menu?",
        answer:
          "Yes, we offer smaller portions of our most popular dishes as well as milder options for our youngest guests.",
      },
    ],
  },
  legal: {
    impressumTitle: "Legal Notice",
    datenschutzTitle: "Privacy Policy",
    placeholderNotice:
      "This is placeholder text. Replace it with real, legally reviewed content (e.g. via a lawyer or Impressum generator) before going live.",
  },
  common: {
    required: "Required",
    optional: "Optional",
    loading: "Loading...",
    error: "Something went wrong. Please try again.",
  },
} satisfies Dictionary;

export default en;
