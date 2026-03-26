export interface ServiceData {
  name: string;
  slug: string;
  description: string;
  details: string;
  imageUrl: string | null;
  order: number;
  icon: string;
  highlights: string[];
  audience: "Dzieci" | "Dorośli" | "Wszyscy";
  duration: string;
  priceRange: string;
}

export const services: ServiceData[] = [
  {
    name: "Magia Dla Dzieci",
    slug: "magia-dla-dzieci",
    description:
      "Specjalnie przygotowane pokazy dla najmłodszych widzów, które łączą zabawę z edukacją.",
    details:
      "Specjalnie przygotowane pokazy dla najmłodszych widzów, które łączą zabawę z edukacją. Dzieci nie tylko oglądają magię, ale także aktywnie uczestniczą w pokazie, ucząc się podstawowych technik iluzji w bezpieczny i zabawny sposób. Pokazy dostosowane do wieku i możliwości percepcyjnych dzieci, z elementami interaktywnymi i humorystycznymi.",
    imageUrl: null,
    order: 1,
    icon: "sparkles",
    highlights: [
      "Interaktywny pokaz z udziałem dzieci",
      "Dostosowany do wieku 4-12 lat",
      "Elementy edukacyjne i humorystyczne",
      "Każde dziecko poznaje prostą sztuczkę",
    ],
    audience: "Dzieci",
    duration: "30–45 min",
    priceRange: "od 400 zł",
  },
  {
    name: "Pokaz Iluzji na Eventy Firmowe",
    slug: "eventy-firmowe",
    description:
      "Profesjonalne pokazy iluzji idealne na konferencje, spotkania firmowe, gale i inne wydarzenia biznesowe.",
    details:
      "Profesjonalne pokazy iluzji idealne na konferencje, spotkania firmowe, gale i inne wydarzenia biznesowe. Łączę elegancję z humorem, tworząc atmosferę, która integruje zespół i pozostawia pozytywne wrażenie. Pokazy mogą być dostosowane do tematyki firmy i charakteru wydarzenia.",
    imageUrl: null,
    order: 2,
    icon: "building",
    highlights: [
      "Personalizacja pod markę firmy",
      "Integracja zespołu przez wspólne emocje",
      "Elegancja połączona z humorem",
      "Od 20 do 500+ osób",
    ],
    audience: "Dorośli",
    duration: "45–90 min",
    priceRange: "od 1200 zł",
  },
  {
    name: "Close-up Magic na Festiwale",
    slug: "close-up-magic",
    description:
      "Intymne pokazy magiczne wykonywane w bezpośrednim kontakcie z publicznością.",
    details:
      "Intymne pokazy magiczne wykonywane w bezpośrednim kontakcie z publicznością. Idealne na festiwale, pikniki, imprezy plenerowe i inne wydarzenia, gdzie chcesz dodać element zaskoczenia i interakcji. Magia close-up pozwala widzom doświadczyć iluzji z bliska, co tworzy niezapomniane wrażenia.",
    imageUrl: null,
    order: 3,
    icon: "hand",
    highlights: [
      "Magia na wyciągnięcie ręki",
      "Idealne na imprezy plenerowe",
      "Bezpośredni kontakt z widzami",
      "Efekt WOW z bliska",
    ],
    audience: "Wszyscy",
    duration: "60–120 min",
    priceRange: "od 800 zł",
  },
  {
    name: "Mroczny Mentalizm",
    slug: "mroczny-mentalizm",
    description:
      "Tajemnicze i intrygujące pokazy mentalizmu, które testują granice percepcji i rzeczywistości.",
    details:
      "Tajemnicze i intrygujące pokazy mentalizmu, które testują granice percepcji i rzeczywistości. Dla dorosłej publiczności poszukującej głębszych wrażeń i intelektualnego wyzwania. Pokazy obejmują czytanie myśli, przewidywanie wyborów i inne fenomeny psychiczne, które pozostawiają widzów w osłupieniu.",
    imageUrl: null,
    order: 4,
    icon: "brain",
    highlights: [
      "Czytanie myśli i przewidywanie wyborów",
      "Atmosfera tajemnicy i napięcia",
      "Intelektualne wyzwanie dla widzów",
      "Efekt osłupienia gwarantowany",
    ],
    audience: "Dorośli",
    duration: "45–75 min",
    priceRange: "od 1000 zł",
  },
  {
    name: "Iluzja na Wesela",
    slug: "iluzja-na-wesela",
    description:
      "Uczyń swoje wesele niezapomnianym dzięki eleganckiemu pokazowi iluzji.",
    details:
      "Uczyń swoje wesele niezapomnianym dzięki eleganckiemu pokazowi iluzji. Twoi goście będą mówić o tym dniu przez lata. Oferuję personalizowane występy dostosowane do charakteru uroczystości - od kameralnych momentów po spektakularne show dla całej sali.",
    imageUrl: null,
    order: 5,
    icon: "rings",
    highlights: [
      "Personalizacja pod charakter wesela",
      "Od kameralnych momentów po wielkie show",
      "Goście zapamiętają ten dzień na lata",
      "Elegancki i dyskretny występ",
    ],
    audience: "Wszyscy",
    duration: "45–90 min",
    priceRange: "od 1500 zł",
  },
  {
    name: "Magiczne Urodziny dla Dzieci",
    slug: "magiczne-urodziny",
    description:
      "Stwórz magiczne urodziny, które będą tematem rozmów na długo po imprezie.",
    details:
      "Stwórz magiczne urodziny, które będą tematem rozmów na długo po imprezie. Interaktywny pokaz angażuje wszystkich gości - od najmłodszych po dziadków. Każde dziecko otrzymuje magiczny prezent i poznaje proste sztuczki do pokazania znajomym.",
    imageUrl: null,
    order: 6,
    icon: "cake",
    highlights: [
      "Angażuje gości w każdym wieku",
      "Magiczny prezent dla każdego dziecka",
      "Nauka prostych sztuczek",
      "Niezapomniana atmosfera świętowania",
    ],
    audience: "Dzieci",
    duration: "45–60 min",
    priceRange: "od 500 zł",
  },
];
