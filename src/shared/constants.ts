export const SITE = {
  name: "IluzArt",
  title: "Magik - Iluzjonista Premium",
  description:
    "Iluzjonista Katowice i Śląsk – Grzegorz Pawleta. Pokazy iluzji, mentalizm, close-up magic na eventy, wesela i urodziny. Zadzwoń: +48 882 011 161",
  ogTitle: "IluzArt – Iluzjonista Premium",
  ogDescription:
    "Pokazy iluzji i warsztaty. Skontaktuj się i stwórzmy magię na Twoim wydarzeniu.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "pl_PL",
} as const;

export const CONTACT = {
  name: "Grzegorz Pawleta",
  company: "IluzArt",
  phone: "+48 882 011 161",
  email: "grzegorziluzart@gmail.com",
  address: "Związkowa 5, 40-730 Katowice",
  instagram: "https://www.instagram.com/grzegorz_pawleta_iluzart/",
  instagramHandle: "@grzegorz_pawleta_iluzart",
  whatsapp: "https://wa.me/48882011161",
} as const;

export const NAV_LINKS = [
  { label: "O mnie", href: "/o-mnie" },
  { label: "Oferta", href: "/oferta" },
  { label: "Warsztaty", href: "/warsztaty" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const STATS = [
  { value: 200, suffix: "+", label: "Wykonanych pokazów" },
  { value: 100, suffix: "%", label: "Zadowolonych klientów" },
  { value: 9, suffix: "+", label: "Lat doświadczenia" },
] as const;
