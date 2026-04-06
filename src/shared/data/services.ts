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
      "Interaktywne pokazy, w których dzieci nie tylko oglądają — same stają się częścią magii. Śmiech, zaskoczenie i pierwsze własne sztuczki w jednym pakiecie.",
    details:
      "Prowadzę pokazy dla dzieci od lat — na Strefie Bajtla, w Nibylandii i na setkach prywatnych imprez w Katowicach i okolicach. Wiem, że dzieci to najtrudniejsza publiczność — i najlepsza. Każdy pokaz to mieszanka iluzji, humoru i interakcji. Maluchy nie siedzą biernie — wchodzą na scenę, pomagają w sztuczkach i wychodzą z imprezy z własnym trikiem do pokazania rodzicom. Wszystko dopasowane do wieku, od 4 do 12 lat.",
    imageUrl: null,
    order: 1,
    icon: "sparkles",
    highlights: [
      "Dzieci aktywnie uczestniczą w pokazie",
      "Dopasowane do wieku 4–12 lat",
      "Humor i śmiech od pierwszej minuty",
      "Każde dziecko uczy się prostej sztuczki",
    ],
    audience: "Dzieci",
    duration: "30–45 min",
    priceRange: "od 400 zł",
  },
  {
    name: "Pokaz Iluzji na Eventy Firmowe",
    slug: "eventy-firmowe",
    description:
      "Magia i standup comedy na jednej scenie — idealne na konferencje, gale i spotkania integracyjne na Śląsku. Twoi pracownicy zapamiętają ten event.",
    details:
      "Event firmowy to nie tylko PowerPoint i catering. Dekada występów na scenach od kameralnych sal po hale na 500+ osób nauczyła mnie jednego — ludzie chcą się dobrze bawić, nawet w garniturach. Łączę profesjonalną iluzję ze standup comedy, dopasowując pokaz do branży, firmy i okazji. Mogę wpleść logo, hasło firmy albo przekaz, który chcesz zakomunikować. Działam na terenie Katowic, Śląska i całej Polski.",
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
    duration: "45–90 min",
    priceRange: "od 1200 zł",
  },
  {
    name: "Close-up Magic na Festiwale",
    slug: "close-up-magic",
    description:
      "Magia na wyciągnięcie ręki — chodzę między gośćmi i sprawiam, że karty, monety i codzienne przedmioty robią rzeczy niemożliwe. Idealne na festiwale i eventy plenerowe w Katowicach.",
    details:
      "Close-up magic to moja specjalność, kiedy scena jest zbędna. Poruszam się między gośćmi na festiwalach, piknikach i imprezach plenerowych, dostarczając magię dosłownie na wyciągnięcie ręki. Karty znikają, monety przenikają przez stoły, a widzowie nie wierzą własnym oczom — bo wszystko dzieje się centymetry od nich. Sprawdza się wszędzie: od Strefy Bajtla po firmowe garden party na Śląsku.",
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
    duration: "60–120 min",
    priceRange: "od 800 zł",
  },
  {
    name: "Mroczny Mentalizm",
    slug: "mroczny-mentalizm",
    description:
      "Czytanie myśli, przewidywanie wyborów i efekty psychologiczne, które sprawią, że zaczniesz wątpić we własną percepcję. Mentalizm w Katowicach na poważnie.",
    details:
      "Mentalizm to moja ciemna strona — tu nie ma żartów (no dobra, kilka jest). Przewiduję wybory widzów, czytam myśli i tworzę atmosferę, w której granica między możliwym a niemożliwym się zaciera. Pokazy mentalizmu sprawdzają się na eventach firmowych, ekskluzywnych kolacjach i wszędzie tam, gdzie dorosła publiczność szuka czegoś głębszego niż wyciąganie królików z kapelusza. Działam na terenie Katowic i całego Śląska.",
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
    duration: "45–75 min",
    priceRange: "od 1000 zł",
  },
  {
    name: "Iluzja na Wesela",
    slug: "iluzja-na-wesela",
    description:
      "Pokaz magii na wesele, o którym goście będą mówić jeszcze na następnym weselu. Elegancka iluzja z humorem — bo ślub to ma być zabawa.",
    details:
      "Wesele to jeden z najważniejszych dni w życiu — i jeden z moich ulubionych typów występów. Przez dekadę zagrałem na setkach wesel na Śląsku i w całej Polsce. Wiem, kiedy wejść, kiedy zejść i jak sprawić, żeby goście mówili o Waszym weselu jeszcze latami. Od close-up magic przy stołach, przez sceniczny pokaz z Parą Młodą, po mentalizm na afterparty. Wszystko dopasowane do klimatu Waszego dnia.",
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
    duration: "45–90 min",
    priceRange: "od 1500 zł",
  },
  {
    name: "Magiczne Urodziny dla Dzieci",
    slug: "magiczne-urodziny",
    description:
      "Urodziny, po których Twoje dziecko będzie bohaterem klasy. Interaktywny pokaz, w którym bawi się każdy — od 4-latka po dziadka.",
    details:
      "Magiczne urodziny to mój hit — doświadczenie ze Strefy Bajtla i Nibylandii przenoszę wprost do Waszego domu, sali zabaw czy restauracji w Katowicach. Każde dziecko jest częścią pokazu, jubilatka lub jubilat dostaje specjalną rolę, a na koniec wszyscy uczą się sztuczek, które mogą pokazać w szkole. Rodzice odpoczywają, dzieci się bawią, a dziadkowie nie mogą uwierzyć w to, co widzą.",
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
    duration: "45–60 min",
    priceRange: "od 500 zł",
  },
];
