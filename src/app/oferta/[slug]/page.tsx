import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageTransition from "@frontend/components/layout/PageTransition";
import { services, SERVICE_STAGE, OFFER_ORDER } from "@shared/data/services";
import { CONTACT } from "@shared/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

const WRAP = "max-w-7xl mx-auto px-5 sm:px-8 lg:px-10";
const ACTS = ["I", "II", "III"];
const KIND = { Dzieci: "Dla dzieci", Dorośli: "Dla dorosłych", Wszyscy: "Dla wszystkich" } as const;
const TEL = CONTACT.phone.replace(/\s/g, "");
const TEL_SHORT = CONTACT.phone.replace("+48 ", "");

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Usługa nie znaleziona" };
  return {
    title: `${service.name} | Iluzjonista Katowice i Śląsk`,
    description: `${service.description} Iluzjonista Katowice i Śląsk. ${service.audience}, czas trwania: ${service.duration}.`,
  };
}

function CheckDateLink() {
  return (
    <Link
      href="/kontakt"
      className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 font-sans font-semibold text-background transition-colors hover:bg-gold-light"
    >
      Sprawdź wolny termin
    </Link>
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const stage = SERVICE_STAGE[slug];
  if (!service || !stage) notFound();

  const duration = service.duration.replace("-", "–");
  const others = OFFER_ORDER.filter((s) => s !== slug).flatMap((s) => {
    const sv = services.find((x) => x.slug === s);
    const st = SERVICE_STAGE[s];
    return sv && st ? [{ slug: s, name: st.shortName, short: st.short, price: sv.priceRange, suit: st.suit }] : [];
  });

  const facts = [
    ["Cena", service.priceRange],
    ["Czas", duration],
    ["Dla kogo", KIND[service.audience]],
  ];

  return (
    <PageTransition>
      {/* 1. Góra: tytuł + zdjęcie w ramie */}
      <section className="grain bg-spot overflow-hidden">
        <div className={`${WRAP} pt-28 md:pt-32 pb-16 md:pb-24 grid md:grid-cols-12 gap-12 md:gap-10 items-center`}>
          <div className="md:col-span-7">
            <Link
              href="/oferta"
              className="inline-flex items-center gap-2 font-sans text-sm text-cream/55 hover:text-gold transition-colors mb-8"
            >
              <span aria-hidden>←</span> Wszystkie pokazy
            </Link>
            <h1 className="font-serif text-cream text-4xl sm:text-5xl lg:text-7xl leading-[1.04] mb-6 max-w-[14ch]">
              {service.name.charAt(0) + service.name.slice(1).toLowerCase()}
            </h1>
            <p className="font-serif italic text-gold text-xl md:text-2xl leading-snug max-w-xl mb-10">
              {stage.lead}
            </p>
            <dl className="grid grid-cols-3 max-w-lg border-y border-white/10 mb-10">
              {facts.map(([k, v], i) => (
                <div key={k} className={`py-4 ${i > 0 ? "pl-4 sm:pl-6 border-l border-white/10" : ""}`}>
                  <dt className="font-sans text-[11px] uppercase tracking-[0.18em] text-cream/45 mb-1">{k}</dt>
                  <dd className={`font-sans font-semibold ${i === 0 ? "text-gold" : "text-cream"}`}>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <CheckDateLink />
              <a
                href={`tel:${TEL}`}
                className="font-sans text-cream border-b border-cream/40 pb-0.5 hover:border-gold transition-colors"
              >
                Zadzwoń: {TEL_SHORT}
              </a>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="show-frame relative w-full max-w-[400px]">
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-md grid place-items-center ${
                  stage.photo ? "bg-surface" : stage.fallback === "cards" ? "bg-stage grain fan-trigger" : "bg-smoke grain"
                }`}
              >
                {stage.photo ? (
                  <Image
                    src={stage.photo}
                    alt={stage.photoAlt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                    quality={85}
                    className="object-cover"
                  />
                ) : stage.fallback === "cards" ? (
                  <div className="card-fan" aria-hidden>
                    <div className="playing-card pc-1" data-rank="K">♥</div>
                    <div className="playing-card pc-2" data-rank="Q">♥</div>
                    <div className="playing-card is-back pc-3" />
                  </div>
                ) : (
                  <span className="relative font-serif italic text-cream/90 text-5xl md:text-6xl leading-none text-center whitespace-pre-line [text-shadow:0_2px_24px_#000]">
                    {stage.smokeText}
                  </span>
                )}
              </div>
              <span className="show-suit" aria-hidden>{stage.suit}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. O pokazie */}
      <section className="grain bg-lvl2">
        <div className={`${WRAP} py-20 md:py-28 grid md:grid-cols-12 gap-10`}>
          <h2 className="md:col-span-4 font-serif text-cream text-3xl md:text-5xl leading-[1.1]">
            O pokazie
          </h2>
          <div className="md:col-span-8">
            <p className="font-sans text-cream/80 text-lg md:text-xl leading-relaxed max-w-3xl">
              {service.details}
            </p>
            <ul className="mt-12 grid sm:grid-cols-2 gap-x-10 max-w-3xl">
              {service.highlights.map((h) => (
                <li key={h} className="flex gap-3 items-baseline border-t border-gold/20 py-4 font-sans text-cream">
                  <span className="text-gold text-sm" aria-hidden>✦</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Program w trzech aktach */}
      <section className="bg-suits">
        <div className={`${WRAP} py-20 md:py-28`}>
          <h2 className="font-serif text-cream text-3xl md:text-5xl leading-[1.1] mb-14">
            Jak to wygląda
          </h2>
          <ol className="grid md:grid-cols-3 gap-12 md:gap-10">
            {stage.program.map((step, i) => (
              <li key={step.title} className="group">
                <span className="show-act block mb-4" aria-hidden>
                  {ACTS[i]}
                </span>
                <span className="block font-sans text-[11px] uppercase tracking-[0.2em] text-gold mb-2">
                  Akt {ACTS[i]}
                </span>
                <h3 className="font-serif text-cream text-2xl md:text-[1.75rem] leading-tight mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-cream/65 leading-relaxed max-w-sm">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Rezerwacja na kurtynie */}
      <section className="grain bg-velvet">
        <div className={`${WRAP} py-20 md:py-28 grid md:grid-cols-12 gap-10 items-end`}>
          <div className="md:col-span-7">
            <h2 className="font-serif text-cream text-3xl md:text-5xl leading-[1.12] max-w-2xl">
              Chcesz ten pokaz na <em className="text-gold">swoim</em> wydarzeniu?
            </h2>
            <p className="mt-5 font-sans text-cream/75 text-lg max-w-xl">
              Podaj datę i miejsce. Wycenę dostajesz tego samego dnia.
            </p>
          </div>
          <div className="md:col-span-5 md:justify-self-end flex flex-col gap-5 md:items-end">
            <a href={`tel:${TEL}`} className="font-serif text-cream text-4xl md:text-5xl hover:text-gold transition-colors">
              {TEL_SHORT}
            </a>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <CheckDateLink />
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-cream border-b border-cream/40 pb-0.5 hover:border-gold transition-colors"
              >
                Napisz na WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Inne pokazy */}
      <section className="grain bg-lvl3">
        <div className={`${WRAP} py-16 md:py-24`}>
          <h2 className="font-serif text-cream text-2xl md:text-4xl mb-8">Inne pokazy</h2>
          <ul className="border-t border-white/10">
            {others.map((o) => (
              <li key={o.slug} className="border-b border-white/10">
                <Link
                  href={`/oferta/${o.slug}`}
                  className="show-row group grid grid-cols-[28px_minmax(0,1fr)_auto] sm:grid-cols-[40px_minmax(0,1fr)_120px_24px] gap-4 items-center py-5 px-2 sm:px-4"
                >
                  <span className="text-gold text-xl text-center" aria-hidden>{o.suit}</span>
                  <span className="min-w-0">
                    <b className="block font-serif font-normal text-cream text-xl md:text-2xl leading-tight transition-transform duration-300 group-hover:translate-x-2">
                      {o.name}
                    </b>
                    <span className="block font-sans text-sm text-cream/50 mt-1 truncate">{o.short}</span>
                  </span>
                  <span className="font-sans text-sm font-semibold text-gold text-right whitespace-nowrap">{o.price}</span>
                  <span className="hidden sm:block text-cream/40 group-hover:text-gold transition-colors text-right" aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageTransition>
  );
}
