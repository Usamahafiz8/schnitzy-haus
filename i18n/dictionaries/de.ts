import type { Dictionary } from "../types";

const de = {
  meta: {
    title: "Schnitzy Haus | Premium Burgers & Bowls in Frankfurt",
    description:
      "Handgemachte Burger, knusprige Schnitzel und frische Bowls. Jetzt online bestellen oder einen Tisch reservieren.",
  },
  nav: {
    home: "Home",
    menu: "Menü",
    about: "Über uns",
    contact: "Kontakt",
    locations: "Standorte",
    reservations: "Reservierung",
    orderNow: "Jetzt Bestellen",
    search: "Suche",
    cart: "Warenkorb",
  },
  hero: {
    titleLine1: "Das Zuhause für",
    titleLine2: "köstliche",
    titleHighlight: "Burgers",
    description:
      "Handgemachte Burger, knusprige Schnitzel, frische Zutaten und unverwechselbarer Geschmack. Einmal probiert, nie wieder vergessen.",
    ctaOrder: "Jetzt Bestellen",
    ctaMenu: "Speisekarte ansehen",
  },
  features: {
    premiumQuality: {
      title: "Premium Qualität",
      description: "Nur die besten Zutaten für besten Geschmack.",
    },
    madeFresh: {
      title: "Frisch Zubereitet",
      description: "Frisch zubereitet, jedes Mal.",
    },
    fastPickup: {
      title: "Schnelle Abholung",
      description: "Bestellen, abholen, genießen.",
    },
    topRated: {
      title: "Top Bewertet",
      description: "Über 5000+ zufriedene Kunden.",
    },
  },
  popularDishes: {
    eyebrow: "Unsere Highlights",
    title: "Unsere beliebtesten Gerichte",
    viewAll: "Alle Artikel",
    addToCart: "Hinzufügen",
  },
  deliveryPartners: {
    eyebrow: "Wir liefern über",
    title: "Deine Lieblings-Partner",
  },
  aboutSection: {
    eyebrow: "Über uns",
    title: "Mehr als nur Burger",
    paragraph:
      "Bei Schnitzy Haus geht es um Leidenschaft, Qualität und echten Geschmack. Wir legen Wert auf frische Zutaten, eigene Saucen und handgemachte Zubereitung. Unser Ziel: Dich jedes Mal aufs Neue zu begeistern.",
    cta: "Mehr erfahren",
  },
  footer: {
    tagline: "Premium Burgers & Bowls",
    quickLinks: "Schnellzugriff",
    information: "Informationen",
    contactTitle: "Kontakt",
    hoursTitle: "Öffnungszeiten",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    closingNote: "Wir freuen uns auf deine Bestellung!",
    rights: "Alle Rechte vorbehalten.",
  },
  menuPage: {
    title: "Alle Gerichte",
    subtitle: "Handgemacht, frisch und mit Liebe zubereitet.",
    searchPlaceholder: "Gericht suchen...",
    allCategories: "Alle",
    popularBadge: "Beliebt",
    addToCart: "Bestellen",
    noResults: "Keine Gerichte gefunden.",
    ctaEyebrow: "Kontaktieren Sie uns",
    ctaHeading: "Großartiger Geschmack für jeden Tisch",
    ctaBody:
      "Genießen Sie frisch zubereitete Schnitzel, Burger, Pizzen und Beilagen mit hochwertigen Zutaten und herzlichem Service in einer einladenden Atmosphäre für jeden Gast.",
    formFirstName: "Vorname",
    formLastName: "Nachname",
    formEmail: "E-Mail",
    formPhone: "Telefonnummer",
    formSubject: "Betreff",
    formMessage: "Nachricht",
    formSubmit: "Nachricht senden",
    formSubmitting: "Wird gesendet...",
    formSuccess: "Danke! Wir melden uns in Kürze bei Ihnen.",
  },
  cartPage: {
    title: "Warenkorb",
    empty: "Dein Warenkorb ist leer.",
    emptyCta: "Zur Speisekarte",
    quantity: "Menge",
    remove: "Entfernen",
    subtotal: "Zwischensumme",
    checkoutCta: "Zur Kasse",
    continueShopping: "Weiter einkaufen",
    itemNote: "Anmerkung (optional)",
  },
  checkoutPage: {
    title: "Kasse",
    subtitle:
      "Fast geschafft! Fülle deine Daten aus, um deine Bestellung abzuschließen.",
    yourOrder: "Deine Bestellung",
    name: "Name",
    phone: "Telefon",
    email: "E-Mail",
    pickupTime: "Abholzeit",
    pickupHint: "Wähle, wann du deine Bestellung abholen möchtest.",
    notes: "Anmerkungen",
    notesPlaceholder: "Allergien, Wünsche, ...",
    total: "Gesamt",
    submit: "Bestellung aufgeben",
    submitting: "Wird gesendet...",
    payAtPickup: "Zahlung bei Abholung vor Ort.",
    backToCart: "Zurück zum Warenkorb",
  },
  orderConfirmation: {
    title: "Bestellung erhalten!",
    thankYou: "Danke für deine Bestellung bei Schnitzy Haus.",
    orderNumberLabel: "Deine Bestellnummer",
    pickupTimeLabel: "Abholzeit",
    payNotice: "Bitte bezahle bei Abholung vor Ort.",
    backHome: "Zurück zur Startseite",
  },
  reservationsPage: {
    title: "Tisch reservieren",
    subtitle: "Sichere dir deinen Tisch bei Schnitzy Haus.",
    name: "Name",
    phone: "Telefon",
    email: "E-Mail",
    date: "Datum",
    time: "Uhrzeit",
    partySize: "Anzahl Personen",
    notes: "Anmerkungen",
    notesPlaceholder: "Besondere Wünsche...",
    submit: "Reservierung anfragen",
    submitting: "Wird gesendet...",
    largePartyNotice:
      "Für Gruppen ab 10 Personen ruf uns bitte direkt an.",
    successTitle: "Anfrage erhalten!",
    successBody:
      "Wir melden uns in Kürze telefonisch oder per E-Mail, um deine Reservierung zu bestätigen.",
    backHome: "Zurück zur Startseite",
  },
  aboutPage: {
    title: "Über Schnitzy Haus",
    intro: "Mehr als nur Burger.",
    body: "Schnitzy Haus wurde aus der Liebe zu ehrlichem, handgemachtem Essen geboren. Wir kombinieren knusprige Schnitzel, saftige Beef-Burger und frische Zutaten zu Gerichten, die man nicht mehr vergisst. Jede Sauce, jede Panade und jede Bowl entsteht bei uns in der Küche – kein Fertigprodukt, kein Kompromiss. Ob zum Mittag zwischen zwei Terminen oder zum entspannten Abendessen: Wir wollen, dass du dich bei uns wie zu Hause fühlst.",
  },
  contactPage: {
    title: "Kontakt",
    subtitle: "Wir freuen uns von dir zu hören.",
    addressTitle: "Adresse",
    hoursTitle: "Öffnungszeiten",
    getInTouch: "Kontaktiere uns",
  },
  locationsPage: {
    title: "Standorte",
    subtitle: "Besuche uns vor Ort.",
    getDirections: "Route planen",
  },
  testimonials: {
    title: "Erfahrungen unserer Kunden",
    quote:
      "„Ich hatte gestern Abend das Vergnügen, im Schnitzy Haus zu essen, und ich schwärme noch immer von diesem Erlebnis! Die Liebe zum Detail bei der Präsentation der Speisen und der Service waren einfach makellos.“",
    feedbackLabel: "Kundenfeedback",
    reviewsSuffix: "Bewertungen",
  },
  chefs: {
    title: "Unser Küchenteam",
    roleLabel: "Küchenchef",
  },
  bookTable: {
    title: "Reserviere deinen Tisch",
    tagline: "Knusprig. Saftig. Schmackhaft.",
  },
  findRestaurant: {
    title: "Finde uns",
    formName: "Dein Name",
  },
  faq: {
    title: "FAQ",
    items: [
      {
        question: "Was sind die Öffnungszeiten?",
        answer: "Wir haben Montag bis Sonntag von 11:00 bis 23:00 Uhr für dich geöffnet.",
      },
      {
        question: "Habt ihr an Feiertagen geöffnet?",
        answer:
          "Ja, an den meisten Feiertagen sind wir wie gewohnt für dich da. Über Änderungen informieren wir rechtzeitig auf unseren Social-Media-Kanälen.",
      },
      {
        question: "Wie kann ich einen Tisch reservieren?",
        answer:
          "Nutze einfach unser Reservierungsformular weiter unten auf dieser Seite oder ruf uns direkt an — wir bestätigen deine Reservierung per Telefon oder E-Mail.",
      },
      {
        question: "Sind Haustiere drinnen und draußen erlaubt?",
        answer:
          "Auf unserer Außenterrasse sind gut angeleinte Haustiere herzlich willkommen. Aus hygienischen Gründen dürfen sie leider nicht mit in den Innenbereich.",
      },
      {
        question: "Habt ihr laufende Aktionen oder Sonderangebote?",
        answer:
          "Aktuelle Aktionen teilen wir über unsere Social-Media-Kanäle und direkt in der Speisekarte — schau gerne regelmäßig vorbei.",
      },
      {
        question: "Worauf ist euer Restaurant spezialisiert?",
        answer:
          "Wir sind spezialisiert auf handgemachte Burger, knusprige Schnitzel und frische Bowls — alles mit hausgemachten Saucen und frischen Zutaten zubereitet.",
      },
      {
        question: "Gibt es Auswahlmöglichkeiten für Kinder auf der Speisekarte?",
        answer:
          "Ja, wir bieten kleinere Portionen unserer beliebtesten Gerichte sowie milde Varianten für unsere jüngsten Gäste an.",
      },
    ],
  },
  legal: {
    impressumTitle: "Impressum",
    datenschutzTitle: "Datenschutzerklärung",
    placeholderNotice:
      "Dies ist ein Platzhaltertext. Bitte ersetze ihn vor dem Livegang durch echte, rechtlich geprüfte Inhalte (z. B. durch einen Anwalt oder Impressum-Generator).",
  },
  common: {
    required: "Erforderlich",
    optional: "Optional",
    loading: "Lädt...",
    error: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
  },
} satisfies Dictionary;

export default de;
