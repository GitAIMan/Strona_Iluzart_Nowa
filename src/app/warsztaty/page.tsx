import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import SectionHeading from "@frontend/components/ui/SectionHeading";
import ImagePlaceholder from "@frontend/components/ui/ImagePlaceholder";
import Button from "@frontend/components/ui/Button";
import ScrollReveal from "@frontend/components/shared/ScrollReveal";

export const metadata = generatePageMetadata({
  title: "Warsztaty Iluzji",
});

const benefits = [
  "Dla każdego - bez względu na wiek",
  "Proste sztuczki - karty, monety, rekwizyty",
  "Efekt WOW gwarantowany",
];

function GoldCheckmark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="text-gold flex-shrink-0 mt-0.5"
    >
      <path
        d="M20 6L9 17L4 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WarsztatyPage() {
  return (
    <PageTransition>
      {/* Hero section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-dark/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,26,94,0.15)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <SectionHeading
            title="Warsztaty Iluzji"
            subtitle="Zostań Magiem w 2 Godziny!"
          />
        </div>
      </section>

      {/* Intro + benefits */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-2xl md:text-3xl font-serif text-cream text-center mb-12">
              Chcesz zaskoczyć wszystkich magicznym trikiem?
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={0.1}>
              <ul className="space-y-6">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-4">
                    <GoldCheckmark />
                    <span className="text-lg text-cream/80 font-sans">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <ImagePlaceholder aspectRatio="4/3" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why me section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="glass rounded-2xl p-8 md:p-12 space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif text-cream">
                Dlaczego ja?
              </h2>
              <p className="text-lg text-cream/80 leading-relaxed font-sans">
                Sam uczyłem się latami metodą prób i błędów. Dziś pokażę Ci
                wszystkie sekrety za jednym razem - zaoszczędzisz masę czasu i
                od razu zaczniesz tworzyć prawdziwą magię.
              </p>
              <p className="text-lg text-cream/80 leading-relaxed font-sans">
                Nie tylko nauka trików - to boost pewności siebie i umiejętność,
                która zostanie z Tobą na zawsze.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Second image */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <ImagePlaceholder aspectRatio="16/9" />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-xl md:text-2xl font-serif text-cream mb-8">
              Gotowy na magię? Sprawmy, żeby niemożliwe stało się
              rzeczywistością!
            </p>
            <Button href="https://wa.me/48882011161" size="lg">
              Zarezerwuj warsztaty
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
