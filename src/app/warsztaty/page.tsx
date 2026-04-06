import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import SectionHeading from "@frontend/components/ui/SectionHeading";
import ImagePlaceholder from "@frontend/components/ui/ImagePlaceholder";
import Button from "@frontend/components/ui/Button";
import ScrollReveal from "@frontend/components/shared/ScrollReveal";

export const metadata = generatePageMetadata({
  title: "Warsztaty Magii dla Dzieci Katowice",
  description:
    "Warsztaty iluzji dla dzieci w Katowicach i na Śląsku. 2 godziny zabawy, nauki sztuczek i efektu WOW. Prowadzi iluzjonista znany ze Strefy Bajtla i Nibylandii.",
});

const benefits = [
  "2 godziny — bo dobra magia potrzebuje czasu",
  "Każde dziecko wychodzi z własnymi sztuczkami",
  "Sprawdzone na Strefie Bajtla i w Nibylandii",
  "Śmiech gwarantowany — nauka przez zabawę",
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
            title="Warsztaty Magii"
            subtitle="Warsztaty magii dla dzieci w Katowicach"
          />
        </div>
      </section>

      {/* Intro + benefits */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-2xl md:text-3xl font-serif text-cream text-center mb-12">
              Twoje dziecko chce zostać magikiem? Daj mu 2 godziny i zobaczysz.
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
                Dlaczego akurat ja?
              </h2>
              <p className="text-lg text-cream/80 leading-relaxed font-sans">
                Dekada doświadczenia z dziećmi — od Strefy Bajtla i Nibylandii
                po setki prywatnych imprez w Katowicach. Wiem, co bawi
                4-latka, a co robi wrażenie na 12-latku. Uczyłem się magii
                latami metodą prób i błędów — dziś pokażę Twojemu dziecku
                skróty, które sam chciałbym znać na początku.
              </p>
              <p className="text-lg text-cream/80 leading-relaxed font-sans">
                To nie tylko nauka trików. To pewność siebie, zaskakiwanie
                kolegów w szkole i umiejętność, która zostaje na lata. A przy
                okazji — świetna zabawa.
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
              Zarezerwuj warsztaty w Katowicach — wolne terminy znikają szybko
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
