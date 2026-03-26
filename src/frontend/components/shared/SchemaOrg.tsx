import { CONTACT, SITE } from "@shared/constants";
import { services } from "@shared/data/services";

export default function SchemaOrg() {
  const organizationId = `${SITE.url}#organization`;

  const localBusiness = {
    "@type": ["LocalBusiness", "PerformingGroup"],
    "@id": organizationId,
    name: CONTACT.company,
    description: SITE.description,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Związkowa 5",
      addressLocality: "Katowice",
      postalCode: "40-730",
      addressCountry: "PL",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Katowice",
      },
      {
        "@type": "State",
        name: "Śląsk",
      },
    ],
    priceRange: "400-2500 PLN",
    knowsAbout: ["iluzja", "mentalizm", "close-up magic"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pokazy iluzji",
      itemListElement: services.map((service) => ({
        "@type": "OfferCatalog",
        name: service.name,
        description: service.description,
      })),
    },
    sameAs: [CONTACT.instagram],
    url: SITE.url,
  };

  const serviceSchemas = services.map((service) => ({
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@id": organizationId,
    },
    areaServed: "Śląsk",
    offers: {
      "@type": "Offer",
      priceCurrency: "PLN",
      price: service.priceRange,
    },
  }));

  const faqSchema = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Ile kosztuje pokaz iluzji?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ceny zaczynają się od 400 zł za pokazy dla dzieci. Koszt zależy od rodzaju pokazu, czasu trwania i liczby gości. Skontaktuj się po indywidualną wycenę.",
        },
      },
      {
        "@type": "Question",
        name: "Jak długo trwa pokaz?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "W zależności od typu, od 30 do 120 minut. Pokazy dla dzieci trwają zwykle 30-45 minut, a eventy firmowe i wesela 45-120 minut.",
        },
      },
      {
        "@type": "Question",
        name: "Do ilu osób mogę zamówić pokaz?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Od kameralnych spotkań po eventy dla 500+ osób. Każdy pokaz jest dostosowany do wielkości grupy i charakteru wydarzenia.",
        },
      },
      {
        "@type": "Question",
        name: "Czy dojeżdżasz poza Katowice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tak, działam na terenie całego Śląska i całej Polski. Dojazd poza Katowice jest możliwy po wcześniejszym uzgodnieniu szczegółów.",
        },
      },
    ],
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [localBusiness, ...serviceSchemas, faqSchema],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
