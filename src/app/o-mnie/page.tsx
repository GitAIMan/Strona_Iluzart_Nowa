import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import AboutVideoSwitcher from "@frontend/components/shared/AboutVideoSwitcher";

export const metadata = generatePageMetadata({
  title: "O mnie | Iluzjonista Katowice Grzegorz Pawleta",
  description:
    "Grzegorz Pawleta, iluzjonista z Katowic, który łączy magię ze standup comedy. Na scenie od ponad dekady: wesela, eventy firmowe i pokazy dla dzieci na Śląsku.",
});

const WRAP = "max-w-7xl mx-auto px-5 sm:px-8 lg:px-10";
const R2 = "https://pub-461768aab8564907a3f677968018aa28.r2.dev";

const venues = [
  ["Nibylandia", "pokazy dla dzieci"],
  ["Strefa Bajtla", "pokazy dla dzieci"],
  ["Festyny na Śląsku", "close-up i scena"],
  ["Wesela", "Śląsk i cała Polska"],
  ["Eventy firmowe", "od sal po hale"],
];

const facts = [
  { rank: "A", suit: "♠", black: true, label: "Na scenie", text: "od 2016 roku" },
  { rank: "K", suit: "♥", black: false, label: "Początek", text: "moneta za uchem w telewizji" },
  { rank: "Q", suit: "♦", black: false, label: "Najtrudniejsza publiczność", text: "dzieci. I najlepsza." },
  { rank: "J", suit: "♣", black: true, label: "Mój styl", text: "magia i standup w jednym" },
];

const flow = [
  ["Rozmowa", "Poznaję ludzi na sali, zanim cokolwiek zniknie."],
  ["Śmiech", "Żartuję, także z siebie. Ludzie się rozluźniają."],
  ["Zaskoczenie", "I wtedy, kiedy nikt się nie spodziewa, dzieje się magia."],
];

const never = [
  ["sztywnego pokazu", "Rozmawiam z ludźmi i żartuję, także z siebie."],
  ["dwóch takich samych pokazów", "Każde wydarzenie dostaje program pod siebie."],
  ["królika z kapelusza", "Wolę rzeczy, które dzieją się centymetry od Twoich oczu."],
];

function ChapterNum({ n }: { n: number }) {
  return (
    <div className="md:col-span-3 font-serif text-gold text-sm tracking-wide">
      Rozdział
      <span className="block text-6xl md:text-7xl leading-[0.9] text-gold/35 font-medium">{n}</span>
    </div>
  );
}

export default function OmniePage() {
  return (
    <PageTransition>
      {/* 1. Góra */}
      <section className="grain bg-spot">
        <div className={`${WRAP} pt-32 pb-16 md:pb-20 grid md:grid-cols-12 gap-10 items-end`}>
          <div className="md:col-span-7">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-4">
              O mnie · iluzjonista Katowice
            </p>
            <h1 className="font-serif text-cream text-5xl sm:text-6xl lg:text-8xl leading-[0.98] mb-6">
              Grzegorz Pawleta
              <span className="block text-gold italic font-medium">od 2016 na scenie</span>
            </h1>
            <p className="font-sans text-cream/80 text-lg max-w-md mb-7">
              Robię magię, przy której ludzie najpierw się śmieją, a sekundę
              później nie wierzą własnym oczom.
            </p>
            <div className="flex flex-wrap gap-x-7 gap-y-2 font-sans text-sm text-cream/55">
              <span><b className="text-cream mr-1.5">Katowice</b>baza</span>
              <span><b className="text-cream mr-1.5">Magia + standup</b>mój styl</span>
              <span><b className="text-cream mr-1.5">Nibylandia, Strefa Bajtla</b>duże sceny</span>
            </div>
          </div>
          <div className="md:col-span-5 md:justify-self-end w-full max-w-[320px] shadow-[0_24px_60px_rgba(0,0,0,0.6)] rounded-lg">
            <AboutVideoSwitcher />
          </div>
        </div>
      </section>

      {/* 2. Rozdział 1 */}
      <section className="grain bg-lvl2">
        <div className={`${WRAP} py-20 md:py-24 grid md:grid-cols-12 gap-8 about-chap`}>
          <ChapterNum n={1} />
          <div className="md:col-span-9">
            <h2 className="font-serif text-cream text-3xl md:text-5xl leading-[1.1] mb-6">Moneta za uchem</h2>
            <p className="about-dropcap font-sans text-cream/80 text-lg leading-relaxed max-w-2xl">
              Jako dziecko zobaczyłem w telewizji iluzjonistę, który sprawił, że
              moneta zniknęła mu w dłoni i pojawiła się za uchem widza. Pamiętam
              dokładnie to uczucie: przez sekundę naprawdę uwierzyłem, że świat
              działa inaczej, niż mi się wydawało. Od tamtej chwili chciałem
              robić to samo dla innych.
            </p>
            <span className="about-coin mt-6" aria-hidden>5</span>
          </div>
        </div>
      </section>

      {/* Rozdział 2: kurtyna */}
      <section className="grain bg-velvet">
        <div className={`${WRAP} py-20 md:py-28`}>
          <div className="flex items-center gap-4 text-gold mb-6" aria-hidden>
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            ✦
            <span className="h-px w-16 bg-gradient-to-r from-gold to-transparent" />
          </div>
          <p className="font-serif text-cream text-3xl md:text-5xl leading-[1.12] max-w-3xl">
            Najważniejszy moment pokazu dzieje się{" "}
            <em className="text-gold">sekundę po tym</em>, jak coś znika.
          </p>
          <p className="mt-6 font-sans text-cream/80 text-base md:text-lg leading-relaxed max-w-2xl">
            Rozdział 2. Po ponad dekadzie na scenie wiem, że iluzja to nie tylko
            sztuczki. To opowieść, tempo, kontakt z ludźmi. Kiedy widzowie
            patrzą na siebie nawzajem i próbują zrozumieć, co się właśnie stało.
            Dla tego jednego spojrzenia warto wychodzić na scenę.
          </p>
        </div>
      </section>

      {/* Rozdział 3 */}
      <section className="grain bg-lvl3">
        <div className={`${WRAP} py-20 md:py-24 grid md:grid-cols-12 gap-8`}>
          <ChapterNum n={3} />
          <div className="md:col-span-9">
            <h2 className="font-serif text-cream text-3xl md:text-5xl leading-[1.1] mb-6">
              Najpierw śmiech, potem niedowierzanie
            </h2>
            <p className="font-sans text-cream/80 text-lg leading-relaxed max-w-2xl">
              Nie lubię sztywnych, teatralnych pokazów. Interesuje mnie kontakt i
              humor. Dlatego łączę iluzję z lekkim standupem. Rozmawiam z
              publicznością, zaskakuję, czasem żartuję z samego siebie.
            </p>
            <ol className="about-flow mt-10 grid sm:grid-cols-3 max-w-3xl">
              {flow.map(([t, d], i) => (
                <li key={t} className="border-t border-gold/35 pt-5 pr-6 pb-6 sm:pb-0">
                  <b className={`block font-serif text-2xl font-medium mb-1.5 ${i === flow.length - 1 ? "text-gold italic" : "text-cream"}`}>
                    {t}
                  </b>
                  <span className="font-sans text-sm text-cream/60">{d}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Rozdział 4 */}
      <section className="grain bg-lvl2">
        <div className={`${WRAP} py-20 md:py-24 grid md:grid-cols-12 gap-8`}>
          <ChapterNum n={4} />
          <div className="md:col-span-9">
            <h2 className="font-serif text-cream text-3xl md:text-5xl leading-[1.1] mb-6">Każdy pokaz osobno</h2>
            <p className="font-sans text-cream/80 text-lg leading-relaxed max-w-2xl">
              Inaczej pracuję na weselu, inaczej na evencie firmowym, a jeszcze
              inaczej przy kameralnych urodzinach. Zawsze zależy mi na jednym:
              żeby po pokazie ktoś podszedł i powiedział: &bdquo;to było
              niesamowite, nigdy czegoś takiego nie widziałem&rdquo;.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 max-w-3xl border-t border-white/10">
              {[
                ["Wesele", "wyczucie, kiedy wejść i kiedy zejść"],
                ["Firma", "pod branżę, logo, przekaz"],
                ["Urodziny", "dzieci na scenie, jubilat w roli głównej"],
              ].map(([t, d]) => (
                <div key={t} className="py-4 pr-5 border-b border-white/10">
                  <b className="block font-serif text-cream text-xl mb-1">{t}</b>
                  <span className="font-sans text-sm text-cream/55">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Afisz */}
      <section className="grid md:grid-cols-2 min-h-[440px]">
        <div className="relative min-h-[280px] bg-surface">
          <Image
            src={`${R2}/warsztaty-ataa.jpeg`}
            alt="Pokaz magii dla dzieci na scenie, chłopiec pomaga w sztuczce"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
            className="object-cover"
          />
        </div>
        <div className="grain bg-lvl3 flex flex-col justify-center px-5 sm:px-8 lg:px-14 py-14">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold">Gdzie mnie widzieliście</p>
          <h2 className="font-serif text-cream text-3xl md:text-4xl mt-3 mb-6">Afisz</h2>
          <ul className="border-t border-white/10">
            {venues.map(([n, d]) => (
              <li key={n} className="flex justify-between gap-4 py-3.5 border-b border-white/10">
                <span className="font-serif text-cream text-xl">{n}</span>
                <span className="font-sans text-sm text-cream/55 self-center text-right">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Talia faktów */}
      <section className="bg-suits">
        <div className={`${WRAP} py-20 md:py-24`}>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold">Talia faktów</p>
          <h2 className="font-serif text-cream text-3xl md:text-4xl mt-3 mb-10">Pomyśl o karcie i najedź</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-4xl">
            {facts.map((f) => (
              <div key={f.rank} className="fact-card" tabIndex={0} aria-label={`${f.label}: ${f.text}`}>
                <div className="fact-in">
                  <div className={`fact-face fact-front ${f.black ? "is-black" : ""}`} data-rank={f.rank} aria-hidden>
                    {f.suit}
                  </div>
                  <div className="fact-face fact-back">
                    <small className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-gold-light">{f.label}</small>
                    <b className="font-serif font-medium text-cream text-base leading-tight">{f.text}</b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Czego u mnie nie będzie */}
      <section className="grain bg-lvl2">
        <div className={`${WRAP} py-20 md:py-28 text-center`}>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold">Krótko i szczerze</p>
          <h2 className="font-serif text-cream text-4xl md:text-5xl mt-3 mb-12">Czego u&nbsp;mnie nie będzie:</h2>
          <div className="grid md:grid-cols-3 max-w-5xl mx-auto md:divide-x divide-gold/25">
            {never.map(([t, d], i) => (
              <div key={t} className={`px-6 py-6 md:py-2 ${i > 0 ? "border-t md:border-t-0 border-gold/25" : ""}`}>
                <s className="flex items-center justify-center md:min-h-[2.4em] font-serif italic text-cream/85 text-2xl md:text-3xl leading-tight decoration-wine-light decoration-[3px] mb-4">
                  {t}
                </s>
                <p className="font-sans text-cream/60">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Na koniec */}
      <section className="grain bg-spot">
        <div className={`${WRAP} py-20 md:py-24 flex flex-wrap items-end justify-between gap-8`}>
          <h2 className="font-serif text-cream text-4xl md:text-6xl leading-[1.05] max-w-xl">
            Chcesz zobaczyć to na żywo?
          </h2>
          <div>
            <a href="tel:+48882011161" className="block font-serif text-cream text-3xl md:text-4xl mb-4 hover:text-gold transition-colors">
              882 011 161
            </a>
            <Link
              href="/#termin"
              className="inline-flex items-center justify-center rounded-md bg-gold px-7 py-4 font-sans font-semibold text-background transition-colors hover:bg-gold-light"
            >
              Sprawdź wolny termin
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
