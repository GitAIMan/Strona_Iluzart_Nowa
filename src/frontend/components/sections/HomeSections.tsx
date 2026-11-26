import Image from "next/image";
import Link from "next/link";

const R2 = "https://pub-461768aab8564907a3f677968018aa28.r2.dev";
const WRAP = "max-w-7xl mx-auto px-5 sm:px-8 lg:px-10";

function CheckDateLink() {
  return (
    <a
      href="#termin"
      className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 font-sans font-semibold text-background transition-colors hover:bg-gold-light"
    >
      Sprawdź wolny termin
    </a>
  );
}

/* Pasek konkretów pod hero */
export function ProofStrip() {
  const items = [
    ["Od 2016", "na scenie"],
    ["Nibylandia, Strefa Bajtla", "duże sceny dla dzieci"],
    ["Śląsk i cała Polska", "dojeżdżam"],
  ];
  return (
    <div className="grain bg-lvl2 border-y border-white/5">
      <div className={`${WRAP} py-5 flex flex-wrap gap-x-12 gap-y-2 font-sans text-sm text-cream/55`}>
        {items.map(([b, t]) => (
          <span key={b}>
            <b className="text-cream font-semibold mr-1.5">{b}</b>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Wideo z pokazu, w snopie światła */
export function ShowreelSection() {
  return (
    <section className="grain bg-spot">
      <div className={`${WRAP} py-20 md:py-28 grid md:grid-cols-12 gap-10 md:gap-14 items-center`}>
        <div className="md:col-span-6 lg:col-span-7">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-4">
            Zobacz na żywo
          </p>
          <h2 className="font-serif text-cream text-3xl md:text-5xl leading-[1.1] mb-6">
            Tak to wygląda z&nbsp;bliska
          </h2>
          <p className="font-sans text-cream/65 text-base md:text-lg leading-relaxed max-w-lg mb-8">
            Zdjęcia nie oddają reakcji ludzi. Najważniejszy moment pokazu dzieje
            się sekundę po tym, jak coś znika, kiedy widzowie patrzą na siebie i
            próbują zrozumieć, co się stało.
          </p>
          <CheckDateLink />
        </div>
        <div className="md:col-span-6 lg:col-span-5 flex md:justify-end">
          <video
            src={`${R2}/about-video.mp4`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Fragment pokazu iluzji"
            className="w-full max-w-[360px] aspect-[9/16] object-cover rounded-md bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>
    </section>
  );
}

/* Trzy ścieżki: wesela, dzieci, firmy */
type Media =
  | { type: "cards" }
  | { type: "img"; src: string; alt: string }
  | { type: "smoke"; text: string };

const paths: {
  kicker: string;
  title: string;
  text: string;
  price: string;
  time: string;
  href: string;
  linkLabel: string;
  bg: string;
  media: Media;
}[] = [
  {
    kicker: "Dla par młodych",
    title: "Wesele, o którym goście będą mówić",
    text: "Close-up przy stołach, pokaz z Parą Młodą w roli głównej, mentalizm na afterparty. Wiem, kiedy wejść i kiedy zejść.",
    price: "od 1500 zł",
    time: "45–90 min",
    href: "/oferta/iluzja-na-wesela",
    linkLabel: "Pokaz na wesele",
    bg: "bg-lvl2",
    media: { type: "cards" },
  },
  {
    kicker: "Dla dzieci",
    title: "Urodziny, po których jubilat jest bohaterem klasy",
    text: "Dzieci wchodzą na scenę, pomagają w sztuczkach i wychodzą z własnym trikiem. Pokazy i warsztaty dla dzieci od 4 do 12 lat.",
    price: "od 400 zł",
    time: "30–60 min",
    href: "/oferta/magiczne-urodziny",
    linkLabel: "Pokazy i warsztaty dla dzieci",
    bg: "bg-background",
    media: { type: "img", src: `${R2}/warsztaty-ataa.jpeg`, alt: "Pokaz magii dla dzieci na scenie, chłopiec pomaga w sztuczce" },
  },
  {
    kicker: "Dla firm",
    title: "Event firmowy, na którym nikt nie patrzy w telefon",
    text: "Iluzja, standup i mentalizm pod Twoją branżę. Mogę wpleść logo albo hasło firmy. Od kameralnej sali po 500+ osób.",
    price: "od 1200 zł",
    time: "45–90 min",
    href: "/oferta/eventy-firmowe",
    linkLabel: "Oferta dla firm",
    bg: "bg-lvl3",
    media: { type: "smoke", text: "czytam\nw myślach" },
  },
];

function PathMedia({ media }: { media: Media }) {
  if (media.type === "img") {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={85}
        className="object-cover"
      />
    );
  }
  if (media.type === "cards") {
    return (
      <div className="card-fan" aria-hidden>
        <div className="playing-card pc-1" data-rank="K">♥</div>
        <div className="playing-card pc-2" data-rank="Q">♥</div>
        <div className="playing-card is-back pc-3" />
      </div>
    );
  }
  return (
    <span className="relative font-serif italic text-cream/90 text-5xl md:text-7xl leading-none text-center whitespace-pre-line [text-shadow:0_2px_24px_#000]">
      {media.text}
    </span>
  );
}

export function AudiencePaths() {
  return (
    <section aria-label="Dla kogo">
      {paths.map((p, i) => {
        const mediaBg =
          p.media.type === "cards" ? "bg-stage grain" : p.media.type === "smoke" ? "bg-smoke grain" : "bg-surface";
        return (
          <div
            key={p.kicker}
            className={`grid md:grid-cols-2 min-h-[420px] ${p.media.type === "cards" ? "fan-trigger" : ""}`}
          >
            <div
              className={`relative min-h-[280px] overflow-hidden grid place-items-center p-10 ${mediaBg} ${
                i % 2 === 1 ? "md:order-2" : ""
              }`}
            >
              <PathMedia media={p.media} />
            </div>
            <div className={`grain ${p.bg} flex flex-col justify-center gap-4 px-5 sm:px-8 lg:px-14 py-12 md:py-16`}>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold">
                {p.kicker}
              </p>
              <h2 className="font-serif text-cream text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] max-w-lg">
                {p.title}
              </h2>
              <p className="font-sans text-cream/65 leading-relaxed max-w-md">
                {p.text}
              </p>
              <p className="font-sans text-sm text-cream/45 flex gap-6">
                <b className="text-gold font-semibold">{p.price}</b>
                <span>{p.time}</span>
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-2">
                <CheckDateLink />
                <Link
                  href={p.href}
                  className="font-sans text-cream border-b border-cream/40 pb-0.5 hover:border-gold transition-colors"
                >
                  {p.linkLabel}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      <div className="grain bg-lvl3 border-t border-white/5">
        <div className={`${WRAP} py-8 font-sans text-cream/60`}>
          Szukasz czegoś innego? Mroczny mentalizm, close-up na festiwale i
          więcej:{" "}
          <Link href="/oferta" className="text-cream border-b border-gold/60 hover:border-gold">
            cała oferta
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Cytat na kurtynie + jak to wygląda (karty) */
export function QuoteSteps() {
  const steps = [
    ["A", "♠", "Napisz lub zadzwoń", "Data, miejsce, liczba gości."],
    ["2", "♥", "Ustalamy szczegóły", "Wycena tego samego dnia."],
    ["3", "♦", "Ty się bawisz", "Resztą zajmuję się sam."],
  ];
  return (
    <>
      <section className="grain bg-velvet">
        <div className={`${WRAP} py-20 md:py-28`}>
          <div className="flex items-center gap-4 text-gold mb-6" aria-hidden>
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            ✦
            <span className="h-px w-16 bg-gradient-to-r from-gold to-transparent" />
          </div>
          <blockquote className="font-serif text-cream text-3xl md:text-5xl leading-[1.15] max-w-3xl">
            Lubię, kiedy ludzie się śmieją{" "}
            <em className="text-gold">tuż przed tym</em>, jak zaczynają nie
            wierzyć własnym oczom.
          </blockquote>
          <p className="mt-5 font-sans text-cream/60">
            Grzegorz Pawleta ·{" "}
            <Link href="/o-mnie" className="text-cream border-b border-cream/40 hover:border-gold">
              Więcej o mnie
            </Link>
          </p>
        </div>
      </section>
      <section className="bg-suits">
        <div className={`${WRAP} py-16 md:py-20 grid md:grid-cols-12 gap-8`}>
          <h2 className="md:col-span-3 font-serif text-cream text-3xl md:text-4xl leading-tight">
            Jak to wygląda
          </h2>
          <ol className="md:col-span-9 grid sm:grid-cols-3 gap-8">
            {steps.map(([rank, suit, t, d]) => (
              <li key={t}>
                <div className="mini-card mb-4" data-rank={rank} aria-hidden>
                  {suit}
                </div>
                <b className="block font-sans text-cream font-semibold mb-1">{t}</b>
                <span className="font-sans text-sm text-cream/60">{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
