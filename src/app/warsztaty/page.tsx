import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import WorkshopDial from "@frontend/components/workshop/WorkshopDial";
import { CONTACT } from "@shared/constants";

export const metadata = generatePageMetadata({
  title: "Warsztaty Magii dla Dzieci Katowice",
  description:
    "Warsztaty iluzji dla dzieci w Katowicach i na Śląsku. Około 2 godzin nauki sztuczek krok po kroku, na koniec pokaz dla rodziców. Przedszkola, szkoły, domy kultury, urodziny.",
});

const WRAP = "max-w-7xl mx-auto px-5 sm:px-8 lg:px-10";
const R2 = "https://pub-461768aab8564907a3f677968018aa28.r2.dev";
const TEL = CONTACT.phone.replace(/\s/g, "");
const TEL_SHORT = CONTACT.phone.replace("+48 ", "");

const stairs = [
  { n: "I", title: "Uczeń", text: "Ogląda kilka sztuczek z bliska i próbuje zgadnąć, jak to działa.", items: ["Pierwszy trik z kartą"] },
  { n: "II", title: "Asystent", text: "Ćwiczy w parach, pomaga mi na scenie, poprawia ruchy rąk.", items: ["Karty i monety", "Motoryka mała"] },
  { n: "III", title: "Magik", text: "Pokazuje swój repertuar rodzicom. Pierwsze brawa, własne.", items: ["Gotowy pokaz", "Pewność siebie"] },
];

const skills = [
  ["♠", "Sztuczki z kartami", "Od najprostszych trików po takie, które zaskoczą dorosłych."],
  ["♦", "Monety i codzienne przedmioty", "Magia z rzeczy, które ma w kieszeni."],
  ["♣", "Sprawne ręce", "Ćwiczy motorykę małą, nawet o tym nie wiedząc."],
  ["♥", "Występ przed ludźmi", "Na koniec pokazuje sztuczki rodzicom. Pewność siebie rośnie."],
];

function AskLink() {
  return (
    <Link
      href="/#termin"
      className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 font-sans font-semibold text-background transition-colors hover:bg-gold-light"
    >
      Zapytaj o termin
    </Link>
  );
}

export default function WarsztatyPage() {
  return (
    <PageTransition>
      {/* 1. Wstęp + zegar */}
      <section className="grain bg-spot overflow-hidden">
        <div className={`${WRAP} pt-32 pb-20 md:pb-28`}>
          <WorkshopDial
            intro={
              <>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-4">
                  Warsztaty magii dla dzieci
                </p>
                <h1 className="font-serif text-cream text-5xl sm:text-6xl lg:text-[5.25rem] leading-[1] max-w-[13ch]">
                  Dwie godziny, <em className="text-gold">które zostają</em> na lata.
                </h1>
                <p className="mt-6 font-sans text-cream/65 text-lg leading-relaxed max-w-xl">
                  Dzieci uczą się sztuczek krok po kroku, od prostych trików z kartami
                  po efekty, które robią wrażenie na rodzicach. Na koniec mają gotowy pokaz.
                </p>
              </>
            }
            actions={
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <AskLink />
                <a href={`tel:${TEL}`} className="font-sans text-cream border-b border-cream/40 pb-0.5 hover:border-gold transition-colors">
                  Zadzwoń: {TEL_SHORT}
                </a>
              </div>
            }
          />
        </div>
      </section>

      {/* 2. Trzy stopnie */}
      <section className="grain bg-lvl2">
        <div className={`${WRAP} py-20 md:py-28`}>
          <h2 className="font-serif text-cream text-3xl md:text-5xl leading-[1.1] mb-20">
            Trzy stopnie w dwie godziny
          </h2>
          <ol className="grid md:grid-cols-3 gap-16 md:gap-6 items-end">
            {stairs.map((s, i) => (
              <li key={s.n} className={`ws-stair ws-stair-${i + 1}`}>
                <span className="ws-seal" aria-hidden>{s.n}</span>
                <h3 className="font-serif text-cream text-[1.75rem] mb-1.5">{s.title}</h3>
                <p className="font-sans text-cream/75 text-[15px]">{s.text}</p>
                <ul className="mt-3.5 grid gap-1 font-sans text-sm text-cream/60">
                  {s.items.map((it) => (
                    <li key={it}><span className="text-gold">✦ </span>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Przed i po */}
      <section className="relative grid md:grid-cols-2" aria-label="Przed i po warsztacie">
        <div className="ws-half ws-before relative min-h-[340px] md:min-h-[460px] flex items-end p-7">
          <Image src={`${R2}/warsztaty-1-uyt.jpeg`} alt="Dzieci w klasie oglądają pokaz magii" fill sizes="(max-width: 768px) 100vw, 50vw" quality={80} className="object-cover" />
          <div className="relative z-[1]">
            <small className="font-sans text-xs uppercase tracking-[0.2em] text-gold">Na początku</small>
            <b className="block font-serif font-normal text-cream text-3xl md:text-4xl">Patrzy i nie wierzy</b>
          </div>
        </div>
        <div className="ws-half relative min-h-[340px] md:min-h-[460px] flex items-end p-7">
          <Image src={`${R2}/warsztaty-bara.jpeg`} alt="Chłopiec uczy się sztuczki z piłeczką na warsztatach" fill sizes="(max-width: 768px) 100vw, 50vw" quality={85} className="object-cover" />
          <div className="relative z-[1]">
            <small className="font-sans text-xs uppercase tracking-[0.2em] text-gold">Po 2 godzinach</small>
            <b className="block font-serif font-normal text-cream text-3xl md:text-4xl">Robi to sam</b>
          </div>
        </div>
        <span className="ws-arrow" aria-hidden>→</span>
      </section>

      {/* 4. Czego się nauczy */}
      <section className="grain bg-suits">
        <div className={`${WRAP} py-20 md:py-28 grid md:grid-cols-12 gap-10`}>
          <h2 className="md:col-span-4 font-serif text-cream text-3xl md:text-5xl leading-[1.1]">
            Czego nauczy się Twoje dziecko
          </h2>
          <ul className="md:col-span-8 grid sm:grid-cols-2 gap-x-10">
            {skills.map(([suit, t, d]) => (
              <li key={t} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border-t border-white/10 py-5">
                <span className="text-gold text-2xl text-center" aria-hidden>{suit}</span>
                <div>
                  <b className="block font-sans font-semibold text-cream">{t}</b>
                  <span className="font-sans text-sm text-cream/60">{d}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Rezerwacja */}
      <section className="grain bg-velvet">
        <div className={`${WRAP} py-20 md:py-24 flex flex-wrap items-end justify-between gap-8`}>
          <h2 className="font-serif text-cream text-3xl md:text-5xl leading-[1.12] max-w-[18ch]">
            Twoje dziecko chce zostać magikiem? Daj mu 2 godziny.
          </h2>
          <div className="flex flex-col gap-4 md:items-end">
            <a href={`tel:${TEL}`} className="font-serif text-cream text-4xl md:text-5xl hover:text-gold transition-colors">
              {TEL_SHORT}
            </a>
            <AskLink />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
