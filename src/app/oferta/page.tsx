import Link from "next/link";
import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import OfferTickets, { type Ticket } from "@frontend/components/offer/OfferTickets";
import { services, SERVICE_STAGE, OFFER_ORDER } from "@shared/data/services";

export const metadata = generatePageMetadata({
  title: "Pokazy Iluzji Katowice | Wesela, Eventy, Urodziny",
  description:
    "Pokazy magii i mentalizmu w Katowicach i na Śląsku. Wesela, eventy firmowe, urodziny, close-up magic. Iluzjonista łączący magię ze standup comedy.",
});

const WRAP = "max-w-7xl mx-auto px-5 sm:px-8 lg:px-10";
const tickets: Ticket[] = OFFER_ORDER.flatMap((slug) => {
  const s = services.find((x) => x.slug === slug);
  const st = SERVICE_STAGE[slug];
  if (!s || !st) return [];
  return [
    {
      slug,
      name: st.shortName,
      short: st.short,
      highlights: st.ticketHighlights,
      photo: st.photo,
      suit: st.suit,
      atmosphere: slug === "iluzja-na-wesela" ? "bg-velvet" : "bg-smoke",
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
              href="/kontakt"
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
