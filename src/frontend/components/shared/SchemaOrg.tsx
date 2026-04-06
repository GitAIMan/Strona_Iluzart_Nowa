import { CONTACT, SITE } from "@shared/constants";
import { services } from "@shared/data/services";
import { faqItems } from "@shared/data/faq";

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
    knowsAbout: ["iluzja", "mentalizm", "close-up magic", "standup comedy", "pokazy dla dzieci", "magia sceniczna"],
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
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
