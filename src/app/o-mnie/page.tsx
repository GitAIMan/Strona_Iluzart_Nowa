import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import SectionHeading from "@frontend/components/ui/SectionHeading";
import ImagePlaceholder from "@frontend/components/ui/ImagePlaceholder";
import ScrollReveal from "@frontend/components/shared/ScrollReveal";

export const metadata = generatePageMetadata({
  title: "O mnie - Iluzjonista Grzegorz Pawleta",
});

export default function OmniePage() {
  return (
    <PageTransition>
      {/* Hero section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-dark/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,26,94,0.15)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <SectionHeading title="O mnie" subtitle="Mistrz Iluzji" />
        </div>
      </section>

      {/* Content section */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8 mb-16">
            <ScrollReveal delay={0}>
              <p className="text-lg text-cream/80 leading-relaxed font-sans">
                W wieku 15 lat po raz pierwszy zetknąłem się z magią, oglądając
                w telewizji iluzjonistę, który w ułamku sekundy sprawił, że
                moneta zniknęła, a następnie pojawiła się za uchem. To niezwykłe
                zdarzenie, widziane oczami dziecka, było po prostu...
                zachwycające.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-lg text-cream/80 leading-relaxed font-sans">
                Wtedy poczułem, że uczestniczę w czymś niesamowitym, co
                wykracza poza zwykłą rzeczywistość. To doświadczenie
                zainspirowało mnie do podjęcia decyzji, która na zawsze wpłynęła
                na moje życie – postanowiłem zgłębić tajniki sztuki iluzji.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-lg text-cream/80 leading-relaxed font-sans">
                Moim pragnieniem stało się nie tylko opanowanie tej znakomitej
                formy wyrazu, ale także chęć wywołania u innych tego samego
                zachwytu i radości, jakie towarzyszyły mi w tamtej chwili.
                Iluzja przekształciła się w moją pasję oraz sposób na tworzenie
                niezapomnianych chwil, które łączą ludzi w obliczu niepojętej
                magii.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.4}>
            <div className="relative">
              <div className="absolute -inset-3 border border-gold/30 rounded-xl translate-x-3 translate-y-3" />
              <ImagePlaceholder
                aspectRatio="3/4"
                className="relative z-10"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
