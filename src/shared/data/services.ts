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
      "Interaktywne pokazy, w których dzieci nie tylko oglądają, ale same stają się częścią magii. Śmiech, zaskoczenie i pierwsze własne sztuczki w jednym pakiecie.",
    details:
      "Prowadzę pokazy dla dzieci od lat: na Strefie Bajtla, w Nibylandii i na setkach prywatnych imprez w Katowicach i okolicach. Wiem, że dzieci to najtrudniejsza publiczność. I najlepsza. Każdy pokaz to mieszanka iluzji, humoru i interakcji. Maluchy nie siedzą biernie. Wchodzą na scenę, pomagają w sztuczkach i wychodzą z imprezy z własnym trikiem do pokazania rodzicom. Wszystko dopasowane do wieku, od 4 do 12 lat.",
    imageUrl: null,
    order: 1,
    icon: "sparkles",
    highlights: [
      "Dzieci aktywnie uczestniczą w pokazie",
      "Dopasowane do wieku 4-12 lat",
      "Humor i śmiech od pierwszej minuty",
      "Każde dziecko uczy się prostej sztuczki",
    ],
    audience: "Dzieci",
    duration: "30-45 min",
    priceRange: "od 400 zł",
  },
  {
    name: "Pokaz Iluzji na Eventy Firmowe",
    slug: "eventy-firmowe",
    description:
      "Magia i standup comedy na jednej scenie. Idealne na konferencje, gale i spotkania integracyjne na Śląsku. Twoi pracownicy zapamiętają ten event.",
    details:
      "Event firmowy to nie tylko PowerPoint i catering. Dekada występów na scenach od kameralnych sal po hale na 500+ osób nauczyła mnie jednego: ludzie chcą się dobrze bawić, nawet w garniturach. Łączę profesjonalną iluzję ze standup comedy, dopasowując pokaz do branży, firmy i okazji. Mogę wpleść logo, hasło firmy albo przekaz, który chcesz zakomunikować. Działam na terenie Katowic, Śląska i całej Polski.",
    imageUrl: null,
    order: 2,
    icon: "building",
    highlights: [
      "Personalizacja pod markę i przekaz firmy",
      "Iluzja + standup comedy w jednym występie",
      "Od kameralnych spotkań po hale na 500+ osób",
      "Integracja zespołu przez wspólne emocje",
    ],
    audience: "Dorośli",
    duration: "45-90 min",
    priceRange: "od 1200 zł",
  },
  {
    name: "Close-up Magic na Festiwale",
    slug: "close-up-magic",
    description:
      "Magia na wyciągnięcie ręki. Chodzę między gośćmi i sprawiam, że karty, monety i codzienne przedmioty robią rzeczy niemożliwe. Idealne na festiwale i eventy plenerowe w Katowicach.",
    details:
      "Close-up magic to moja specjalność, kiedy scena jest zbędna. Poruszam się między gośćmi na festiwalach, piknikach i imprezach plenerowych, dostarczając magię dosłownie na wyciągnięcie ręki. Karty znikają, monety przenikają przez stoły, a widzowie nie wierzą własnym oczom, bo wszystko dzieje się centymetry od nich. Sprawdza się wszędzie: od Strefy Bajtla po firmowe garden party na Śląsku.",
    imageUrl: null,
    order: 3,
    icon: "hand",
    highlights: [
      "Iluzja z odległości centymetrów",
      "Idealne na imprezy plenerowe i festiwale",
      "Bezpośrednia interakcja z każdym gościem",
      "Nie potrzebuję sceny ani sprzętu nagłośnieniowego",
    ],
    audience: "Wszyscy",
    duration: "60-120 min",
    priceRange: "od 800 zł",
  },
  {
    name: "Mroczny Mentalizm",
    slug: "mroczny-mentalizm",
    description:
      "Czytanie myśli, przewidywanie wyborów i efekty psychologiczne, które sprawią, że zaczniesz wątpić we własną percepcję. Mentalizm w Katowicach na poważnie.",
    details:
      "Mentalizm to moja ciemna strona. Tu nie ma żartów (no dobra, kilka jest). Przewiduję wybory widzów, czytam myśli i tworzę atmosferę, w której granica między możliwym a niemożliwym się zaciera. Pokazy mentalizmu sprawdzają się na eventach firmowych, ekskluzywnych kolacjach i wszędzie tam, gdzie dorosła publiczność szuka czegoś głębszego niż wyciąganie królików z kapelusza. Działam na terenie Katowic i całego Śląska.",
    imageUrl: null,
    order: 4,
    icon: "brain",
    highlights: [
      "Czytanie myśli i przewidywanie wyborów",
      "Atmosfera tajemnicy z domieszką humoru",
      "Intelektualne wyzwanie dla widzów",
      "Idealne na ekskluzywne wydarzenia",
    ],
    audience: "Dorośli",
    duration: "45-75 min",
    priceRange: "od 1000 zł",
  },
  {
    name: "Iluzja na Wesela",
    slug: "iluzja-na-wesela",
    description:
      "Pokaz magii na wesele, o którym goście będą mówić jeszcze na następnym weselu. Elegancka iluzja z humorem, bo ślub to ma być zabawa.",
    details:
      "Wesele to jeden z najważniejszych dni w życiu i jeden z moich ulubionych typów występów. Przez dekadę zagrałem na setkach wesel na Śląsku i w całej Polsce. Wiem, kiedy wejść, kiedy zejść i jak sprawić, żeby goście mówili o Waszym weselu jeszcze latami. Od close-up magic przy stołach, przez sceniczny pokaz z Parą Młodą, po mentalizm na afterparty. Wszystko dopasowane do klimatu Waszego dnia.",
    imageUrl: null,
    order: 5,
    icon: "rings",
    highlights: [
      "Dopasowanie do stylu i klimatu wesela",
      "Od close-up przy stołach po pokaz sceniczny",
      "Para Młoda jako gwiazdy pokazu",
      "Dekada doświadczenia na weselach Śląska",
    ],
    audience: "Wszyscy",
    duration: "45-90 min",
    priceRange: "od 1500 zł",
  },
  {
    name: "Magiczne Urodziny dla Dzieci",
    slug: "magiczne-urodziny",
    description:
      "Urodziny, po których Twoje dziecko będzie bohaterem klasy. Interaktywny pokaz, w którym bawi się każdy, od 4-latka po dziadka.",
    details:
      "Magiczne urodziny to mój hit. Doświadczenie ze Strefy Bajtla i Nibylandii przenoszę wprost do Waszego domu, sali zabaw czy restauracji w Katowicach. Każde dziecko jest częścią pokazu, jubilatka lub jubilat dostaje specjalną rolę, a na koniec wszyscy uczą się sztuczek, które mogą pokazać w szkole. Rodzice odpoczywają, dzieci się bawią, a dziadkowie nie mogą uwierzyć w to, co widzą.",
    imageUrl: null,
    order: 6,
    icon: "cake",
    highlights: [
      "Jubilat/ka jako gwiazda pokazu",
      "Angażuje gości w każdym wieku",
      "Każde dziecko uczy się sztuczki na wynos",
      "Sprawdzone na setkach imprez w Katowicach",
    ],
    audience: "Dzieci",
    duration: "45-60 min",
    priceRange: "od 500 zł",
  },
];

export const SERVICE_EMOJI_HEX: Record<string, string> = {
  sparkles: "2728",   // ✨ Magia dla dzieci
  building: "1f3e2",  // 🏢 Eventy firmowe
  hand:     "1f3a9",  // 🎩 Close-up magic
  brain:    "1f9e0",  // 🧠 Mentalizm
  rings:    "1f48d",  // 💍 Wesela
  cake:     "1f382",  // 🎂 Urodziny
};

export const getServiceEmojiUrl = (icon: string) =>
  `https://fonts.gstatic.com/s/e/notoemoji/latest/${SERVICE_EMOJI_HEX[icon] ?? SERVICE_EMOJI_HEX.sparkles}/512.png`;

/* ---------- Dane do Oferty (bilety) i podstron pokazów, od 2026-11-26 ---------- */
const R2 = "https://pub-461768aab8564907a3f677968018aa28.r2.dev";

export interface ServiceStage {
  shortName: string;
  short: string;
  ticketHighlights: string[];
  photo: string | null;
  photoAlt: string;
  suit: "♠" | "♥" | "♦" | "♣";
  /** Zastępstwo gdy brak zdjęcia */
  fallback: "cards" | "smoke";
  smokeText?: string;
  lead: string;
  program: { title: string; text: string }[];
}

/** Kolejność biletów na /oferta */
export const OFFER_ORDER = [
  "iluzja-na-wesela",
  "eventy-firmowe",
  "magia-dla-dzieci",
  "magiczne-urodziny",
  "close-up-magic",
  "mroczny-mentalizm",
] as const;

export const SERVICE_STAGE: Record<string, ServiceStage> = {
  "iluzja-na-wesela": {
    shortName: "Iluzja na wesela",
    short: "Close-up przy stołach, pokaz z Parą Młodą, mentalizm na afterparty.",
    ticketHighlights: ["Od close-up przy stołach po pokaz sceniczny", "Para Młoda jako gwiazdy pokazu", "Dopasowanie do klimatu wesela"],
    photo: null,
    photoAlt: "",
    suit: "♥",
    fallback: "cards",
    lead: "Wesele, o którym goście będą mówić jeszcze na następnym weselu.",
    program: [
      { title: "Przy stołach", text: "Close-up magic w trakcie przyjęcia. Podchodzę do stołów i pokazuję magię z bliska." },
      { title: "Pokaz z Parą Młodą", text: "Sceniczny pokaz, w którym Para Młoda gra główne role. Goście się śmieją, a Wy jesteście w centrum." },
      { title: "Afterparty", text: "Mentalizm dla tych, którzy zostają do końca. Czytanie myśli, kiedy emocje są już wysoko." },
    ],
  },
  "eventy-firmowe": {
    shortName: "Eventy firmowe",
    short: "Magia i standup na jednej scenie. Konferencje, gale, integracje.",
    ticketHighlights: ["Personalizacja pod markę", "Od kameralnej sali po 500+ osób", "Iluzja + standup w jednym"],
    photo: "/images/hero_elo.jpeg",
    photoAlt: "Grzegorz Pawleta z talią kart na tle Katowic",
    suit: "♠",
    fallback: "smoke",
    lead: "Event firmowy, na którym nikt nie patrzy w telefon.",
    program: [
      { title: "Ustalamy przekaz", text: "Przed eventem pytam o branżę, firmę i okazję. Mogę wpleść logo, hasło albo przekaz, który chcesz zakomunikować." },
      { title: "Iluzja i standup", text: "Na scenie łączę magię z humorem dopasowanym do sali. Od kameralnego spotkania po halę na 500+ osób." },
      { title: "Wspólne emocje", text: "Ludzie śmieją się razem i razem nie wierzą w to, co widzą. To integruje lepiej niż kolejna prezentacja." },
    ],
  },
  "magia-dla-dzieci": {
    shortName: "Magia dla dzieci",
    short: "Dzieci nie tylko oglądają. Wchodzą na scenę i pomagają w sztuczkach.",
    ticketHighlights: ["Dzieci aktywnie w pokazie", "Dopasowane do wieku 4–12 lat", "Każde uczy się prostej sztuczki"],
    photo: `${R2}/warsztaty-ataa.jpeg`,
    photoAlt: "Pokaz magii dla dzieci na scenie, chłopiec pomaga w sztuczce",
    suit: "♦",
    fallback: "smoke",
    lead: "Dzieci to najtrudniejsza publiczność. I najlepsza.",
    program: [
      { title: "Pokaz z humorem", text: "Iluzja i żarty od pierwszej minuty. Dzieci reagują, podpowiadają i śmieją się." },
      { title: "Dzieci na scenie", text: "Ochotnicy wchodzą na scenę i pomagają w sztuczkach. Nikt nie siedzi biernie." },
      { title: "Sztuczka na wynos", text: "Na koniec każde dziecko uczy się prostej sztuczki, którą pokaże rodzicom." },
    ],
  },
  "magiczne-urodziny": {
    shortName: "Magiczne urodziny",
    short: "Jubilat w roli głównej, sztuczka na wynos dla każdego.",
    ticketHighlights: ["Jubilat/ka jako gwiazda", "Bawi się każdy, od 4-latka po dziadka", "Sztuczka na wynos"],
    photo: "/images/oferta-urodziny.jpeg",
    photoAlt: "Pokaz magii na urodzinach dziecka w sali zabaw",
    suit: "♣",
    fallback: "smoke",
    lead: "Urodziny, po których jubilat jest bohaterem klasy.",
    program: [
      { title: "Jubilat w roli głównej", text: "Jubilatka lub jubilat dostaje specjalną rolę w pokazie. To jego dzień i wszyscy to widzą." },
      { title: "Wszyscy w pokazie", text: "Każde dziecko jest częścią pokazu. Dziadkowie też nie mogą uwierzyć w to, co widzą." },
      { title: "Sztuczki do szkoły", text: "Na koniec wszyscy uczą się sztuczek, które mogą pokazać kolegom w szkole." },
    ],
  },
  "close-up-magic": {
    shortName: "Close-up na festiwale",
    short: "Chodzę między gośćmi. Karty i monety centymetry od Twoich oczu.",
    ticketHighlights: ["Iluzja z odległości centymetrów", "Nie potrzebuję sceny", "Kontakt z każdym gościem"],
    photo: "/images/oferta-closeup.jpeg",
    photoAlt: "Close-up magic przy stoliku z gośćmi",
    suit: "♠",
    fallback: "smoke",
    lead: "Magia na wyciągnięcie ręki, tam gdzie są ludzie.",
    program: [
      { title: "Bez sceny", text: "Nie potrzebuję sceny ani nagłośnienia. Przychodzę tam, gdzie są goście." },
      { title: "Między gośćmi", text: "Podchodzę do małych grup i pokazuję magię z odległości centymetrów." },
      { title: "Codzienne przedmioty", text: "Karty znikają, monety przenikają przez stół. Wszystko tuż przed oczami widzów." },
    ],
  },
  "mroczny-mentalizm": {
    shortName: "Mroczny mentalizm",
    short: "Czytanie myśli i przewidywanie wyborów. Na poważnie (prawie).",
    ticketHighlights: ["Czytanie myśli", "Atmosfera tajemnicy z humorem", "Na ekskluzywne wydarzenia"],
    photo: null,
    photoAlt: "",
    suit: "♦",
    fallback: "smoke",
    smokeText: "czytam\nw myślach",
    lead: "Zaczniesz wątpić we własną percepcję.",
    program: [
      { title: "Atmosfera", text: "Budujemy napięcie. Tu jest mniej żartów niż zwykle. No dobra, kilka zostaje." },
      { title: "Przewidywanie wyborów", text: "Widzowie wybierają, a ja wiem, co wybiorą, zanim to zrobią." },
      { title: "Czytanie myśli", text: "Granica między możliwym a niemożliwym się zaciera. Dla dorosłej publiczności." },
    ],
  },
};
