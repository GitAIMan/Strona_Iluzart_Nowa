import Link from "next/link";
import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import OfferTickets, { type Ticket } from "@frontend/components/offer/OfferTickets";
import { services } from "@shared/data/services";

export const metadata = generatePageMetadata({
  title: "Pokazy Iluzji Katowice | Wesela, Eventy, Urodziny",
  description:
    "Pokazy magii i mentalizmu w Katowicach i na Śląsku. Wesela, eventy firmowe, urodziny, close-up magic. Iluzjonista łączący magię ze standup comedy.",
});

const WRAP = "max-w-7xl mx-auto px-5 sm:px-8 lg:px-10";
const R2 = "https://pub-461768aab8564907a3f677968018aa28.r2.dev";

/* Kolejność biletów + krótkie teksty i zdjęcia. Cena, czas i odbiorcy z services.ts */
const TICKETS: {
  slug: string;
  name: string;
  short: string;
  highlights: string[];
  photo: string | null;
  suit: string;
  atmosphere: Ticket["atmosphere"];
}[] = [
  {
    slug: "iluzja-na-wesela",
    name: "Iluzja na wesela",
    short: "Close-up przy stołach, pokaz z Parą Młodą, mentalizm na afterparty.",
    highlights: ["Od close-up przy stołach po pokaz sceniczny", "Para Młoda jako gwiazdy pokazu", "Dopasowanie do klimatu wesela"],
    photo: null,
    suit: "♥",
    atmosphere: "bg-velvet",
  },
  {
    slug: "eventy-firmowe",
    name: "Eventy firmowe",
    short: "Magia i standup na jednej scenie. Konferencje, gale, integracje.",
    highlights: ["Personalizacja pod markę", "Od kameralnej sali po 500+ osób", "Iluzja + standup w jednym"],
    photo: "/images/hero_elo.jpeg",
    suit: "♠",
    atmosphere: "bg-smoke",
  },
  {
    slug: "magia-dla-dzieci",
    name: "Magia dla dzieci",
    short: "Dzieci nie tylko oglądają. Wchodzą na scenę i pomagają w sztuczkach.",
    highlights: ["Dzieci aktywnie w pokazie", "Dopasowane do wieku 4–12 lat", "Każde uczy się prostej sztuczki"],
    photo: `${R2}/warsztaty-ataa.jpeg`,
    suit: "♦",
    atmosphere: "bg-smoke",
  },
  {
    slug: "magiczne-urodziny",
    name: "Magiczne urodziny",
    short: "Jubilat w roli głównej, sztuczka na wynos dla każdego.",
    highlights: ["Jubilat/ka jako gwiazda", "Bawi się każdy, od 4-latka po dziadka", "Sztuczka na wynos"],
    photo: "/images/oferta-urodziny.jpeg",
    suit: "♣",
    atmosphere: "bg-smoke",
  },
  {
    slug: "close-up-magic",
    name: "Close-up na festiwale",
    short: "Chodzę między gośćmi. Karty i monety centymetry od Twoich oczu.",
    highlights: ["Iluzja z odległości centymetrów", "Nie potrzebuję sceny", "Kontakt z każdym gościem"],
    photo: "/images/oferta-closeup.jpeg",
    suit: "♠",
    atmosphere: "bg-smoke",
  },
  {
    slug: "mroczny-mentalizm",
    name: "Mroczny mentalizm",
    short: "Czytanie myśli i przewidywanie wyborów. Na poważnie (prawie).",
    highlights: ["Czytanie myśli", "Atmosfera tajemnicy z humorem", "Na ekskluzywne wydarzenia"],
    photo: null,
    suit: "♦",
    atmosphere: "bg-smoke",
  },
];

const tickets: Ticket[] = TICKETS.flatMap((t) => {
  const s = services.find((x) => x.slug === t.slug);
  if (!s) return [];
  return [
    {
      ...t,
      audience: s.audience,
      price: s.priceRange,
      duration: s.duration.replace("-", "–"),
    },
  ];
});

export default function OfertaPage() {
  return (
    <PageTransition>
      <section className="grain bg-spot">
        <div className={`${WRAP} pt-32 pb-10`}>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-4">
            Kasa biletowa
          </p>
          <h1 className="font-serif text-cream text-5xl sm:text-6xl lg:text-7xl leading-[1.02] max-w-[12ch]">
            Wybierz swój pokaz
          </h1>
          <p className="mt-5 font-sans text-cream/65 text-base md:text-lg leading-relaxed max-w-xl">
            Ceny są orientacyjne, &bdquo;od&rdquo;. Ostateczna zależy od miejsca,
            czasu i liczby gości. Wycenę dostajesz tego samego dnia.
          </p>
        </div>
      </section>

      <section className="grain bg-background">
        <div className={WRAP}>
          <OfferTickets tickets={tickets} />

          <div className="ticket-tear py-10 md:pb-24 flex flex-wrap items-center justify-between gap-5">
            <p className="font-sans text-cream/60 max-w-xl">
              Nie ma tu Twojej okazji? Komunie, jubileusze, otwarcia sklepów też
              robię. Napisz, co planujesz.
            </p>
            <Link
              href="/#termin"
              className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 font-sans font-semibold text-background transition-colors hover:bg-gold-light"
            >
              Sprawdź wolny termin
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
