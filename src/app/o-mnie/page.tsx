import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import SectionHeading from "@frontend/components/ui/SectionHeading";
import ImagePlaceholder from "@frontend/components/ui/ImagePlaceholder";
import ScrollReveal from "@frontend/components/shared/ScrollReveal";

export const metadata = generatePageMetadata({
  title: "O mnie – Iluzjonista Katowice Grzegorz Pawleta",
  description:
    "Grzegorz Pawleta — iluzjonista z Katowic łączący magię ze standup comedy. Dekada na scenie, od Bajki Pana Kleksa po wesela na Śląsku.",
});

const milestones = [
  {
    year: "2016",
    title: "Pierwsze pokazy",
    text: "Początek profesjonalnej kariery. Pierwsze wesela, urodziny i eventy na Śląsku.",
  },
  {
    year: "2018",
    title: "Strefa Bajtla",
    text: "Regularne występy na największym śląskim evencie dla dzieci. Setki pokazów, tysiące uśmiechów.",
  },
  {
    year: "2020",
    title: "Nibylandia",
    text: "Stały iluzjonista w interaktywnej przestrzeni dla dzieci. Tu nauczyłem się, że 5-latek to najtrudniejszy krytyk.",
  },
  {
    year: "2023",
    title: "Bajka Pana Kleksa",
    text: "Udział w filmie kinowym. Magia na dużym ekranie — dosłownie.",
  },
  {
    year: "2025",
    title: "Standup & Magia",
    text: "Autorski format łączący iluzję ze standup comedy. Bo najlepsze sztuczki to te, przy których się śmiejesz.",
  },
];

export default function OmniePage() {
  return (
    <PageTransition>
      {/* Hero section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-dark/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,26,94,0.15)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <SectionHeading
            title="O mnie"
            subtitle="Iluzjonista Katowice"
          />
        </div>
      </section>

      {/* Intro — 2 kolumny: tekst + małe zdjęcie */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-center">
            <div className="md:col-span-3 space-y-6">
              <ScrollReveal delay={0}>
                <p className="text-lg text-cream/80 leading-relaxed font-sans">
                  Miałem 15 lat, kiedy w telewizji zobaczyłem coś, co zmieniło
                  mi życie — iluzjonista sprawił, że moneta zniknęła i pojawiła
                  się za uchem widowni. Dla nastolatka z Katowic to był moment,
                  w którym pomyślałem: &bdquo;chcę umieć robić to
                  samo&rdquo;. I zacząłem.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <p className="text-lg text-cream/80 leading-relaxed font-sans">
                  Dekada później prowadzę pokazy na scenach, o których wtedy nawet
                  nie marzyłem. Zagrałem w Bajce Pana Kleksa. Występuję
                  w Nibylandii i na Strefie Bajtla. Łączę iluzję z humorem — bo
                  ludzie lepiej zapamiętują to, przy czym się śmieją. Moje pokazy
                  to nie jest &bdquo;pan w cylindrze wyciąga królika&rdquo;. To
                  standup comedy, w którym niemożliwe dzieje się naprawdę.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-lg text-cream/80 leading-relaxed font-sans">
                  Każde wydarzenie traktuję indywidualnie — inne jest wesele na
                  50 osób w Chorzowie, a inne gala firmowa na 400 gości
                  w Katowicach. Dopasowuję styl, tempo i dawkę humoru. Bo iluzja
                  to umiejętność stworzenia momentu, w którym wszyscy w sali na
                  chwilę zapominają o telefonach.
                </p>
              </ScrollReveal>
            </div>

            <div className="md:col-span-2">
              <ScrollReveal direction="right" delay={0.2}>
                <div className="relative after:absolute after:inset-0 after:translate-x-3 after:translate-y-3 after:border after:border-gold/30 after:rounded-lg">
                  <ImagePlaceholder aspectRatio="4/5" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Kamienie milowe — timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-serif text-cream text-center mb-14">
              Dekada w skrócie
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Linia pionowa */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-navy-light/50 via-gold/30 to-navy-light/50 md:-translate-x-px" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;
                return (
                  <ScrollReveal
                    key={milestone.year}
                    delay={index * 0.1}
                    direction={isEven ? "left" : "right"}
                  >
                    <div
                      className={`relative flex items-start gap-6 md:gap-0 ${
                        isEven
                          ? "md:flex-row"
                          : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Rok — kółko na timeline */}
                      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center">
                        <div className="w-9 h-9 rounded-full bg-background border-2 border-gold/50 flex items-center justify-center shadow-[0_0_15px_rgba(201,168,76,0.2)]">
                          <span className="text-gold text-[10px] font-bold font-sans">
                            {milestone.year.slice(2)}
                          </span>
                        </div>
                      </div>

                      {/* Treść */}
                      <div
                        className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                          isEven
                            ? "md:pr-8 md:text-right"
                            : "md:pl-8 md:ml-auto"
                        }`}
                      >
                        <span className="text-gold/70 text-sm font-sans font-medium">
                          {milestone.year}
                        </span>
                        <h3 className="text-lg font-serif text-cream mt-1 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-cream/60 font-sans text-sm leading-relaxed">
                          {milestone.text}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Co wyróżnia — karty */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-serif text-cream text-center mb-12">
              Dlaczego akurat ja?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎭",
                title: "Magia + Standup",
                text: "Nie wybieram między śmiechem a zaskoczeniem — daję jedno i drugie. Autorski format, który trudno skopiować.",
              },
              {
                icon: "🎬",
                title: "Sprawdzone na dużej scenie",
                text: "Bajka Pana Kleksa, Nibylandia, Strefa Bajtla — to nie tylko nazwy, to doświadczenie, które przekłada się na każdy pokaz.",
              },
              {
                icon: "🎯",
                title: "Dopasowane do Ciebie",
                text: "Nie mam jednego pokazu na wszystko. Każdy event, wesele czy urodziny dostaną program szyty na miarę.",
              },
            ].map((card, index) => (
              <ScrollReveal key={card.title} delay={index * 0.15}>
                <div className="glass rounded-xl p-6 h-full border border-navy/20 hover:border-navy/40 hover:shadow-[0_0_25px_rgba(26,26,94,0.2)] transition-all duration-300">
                  <span className="text-3xl block mb-4">{card.icon}</span>
                  <h3 className="text-lg font-serif text-cream mb-3">
                    {card.title}
                  </h3>
                  <p className="text-cream/60 font-sans text-sm leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
