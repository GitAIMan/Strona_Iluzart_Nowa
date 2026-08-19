import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import SectionHeading from "@frontend/components/ui/SectionHeading";
import ScrollReveal from "@frontend/components/shared/ScrollReveal";
import AboutVideoSwitcher from "@frontend/components/shared/AboutVideoSwitcher";

export const metadata = generatePageMetadata({
  title: "O mnie – Iluzjonista Katowice Grzegorz Pawleta",
  description:
    "Grzegorz Pawleta — iluzjonista z Katowic łączący magię ze standup comedy. Dekada na scenie, od Bajki Pana Kleksa po wesela na Śląsku.",
});

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
                  Jako dziecko zobaczyłem w telewizji iluzjonistę, który
                  sprawił, że moneta zniknęła mu w dłoni i pojawiła się za
                  uchem widza. Pamiętam dokładnie to uczucie — przez sekundę
                  naprawdę uwierzyłem, że świat działa inaczej, niż mi się
                  wydawało. Od tamtej chwili chciałem robić to samo dla innych.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <p className="text-lg text-cream/80 leading-relaxed font-sans">
                  Dziś, po ponad dekadzie na scenie, wiem, że iluzja to nie
                  tylko sztuczki. To opowieść, tempo, kontakt z ludźmi.
                  Najważniejszy moment pokazu dzieje się nie wtedy, kiedy coś
                  znika — tylko sekundę później, kiedy widzowie patrzą na
                  siebie nawzajem i próbują zrozumieć, co się właśnie stało.
                  Dla tego jednego spojrzenia warto wychodzić na scenę.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-lg text-cream/80 leading-relaxed font-sans">
                  Nie lubię sztywnych, teatralnych pokazów — interesuje mnie
                  kontakt i humor. Dlatego łączę iluzję z lekkim standupem.
                  Rozmawiam z publicznością, zaskakuję, czasem żartuję z samego
                  siebie. Lubię, kiedy ludzie się śmieją tuż przed tym, jak
                  zaczynają nie wierzyć własnym oczom.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.45}>
                <p className="text-lg text-cream/80 leading-relaxed font-sans">
                  Każde wydarzenie traktuję osobno. Inaczej pracuję na weselu,
                  inaczej na evencie firmowym, a jeszcze inaczej przy
                  kameralnych urodzinach. Zawsze jednak zależy mi na jednym —
                  żeby po pokazie ktoś podszedł i powiedział: &bdquo;to było
                  niesamowite, nigdy czegoś takiego nie widziałem&rdquo;.
                  Dla tej reakcji wracam na scenę raz za razem.
                </p>
              </ScrollReveal>
            </div>

            <div className="md:col-span-2">
              <ScrollReveal direction="right" delay={0.2}>
                <AboutVideoSwitcher />
              </ScrollReveal>
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
