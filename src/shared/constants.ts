export const SITE = {
  name: "IluzArt",
  title: "Iluzjonista Katowice – Pokazy Magii i Mentalizmu | IluzArt",
  description:
    "Iluzjonista Katowice i Śląsk – Grzegorz Pawleta. Dekada doświadczenia, magia połączona ze standup comedy. Pokazy na wesela, eventy firmowe, urodziny. Znany z Bajki Pana Kleksa i Nibylandii. Zadzwoń: +48 882 011 161",
  ogTitle: "IluzArt – Iluzjonista Katowice | Magia i Standup Comedy",
  ogDescription:
    "Grzegorz Pawleta – iluzjonista z Katowic łączący magię ze standup comedy. Dekada na scenie, setki wydarzeń na Śląsku. Sprawdź dostępność terminu.",
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

/** @deprecated Nie używane na stronie — StatsSection jest wyłączony */
export const STATS = [
  { value: 10, suffix: "+", label: "Lat doświadczenia" },
] as const;
