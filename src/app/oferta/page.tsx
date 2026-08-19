import Link from "next/link";
import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import SectionHeading from "@frontend/components/ui/SectionHeading";
import ScrollReveal from "@frontend/components/shared/ScrollReveal";
import ServiceEmoji from "@frontend/components/ui/ServiceEmoji";
import { services } from "@shared/data/services";

export const metadata = generatePageMetadata({
  title: "Pokazy Iluzji Katowice – Wesela, Eventy, Urodziny",
  description:
    "Pokazy magii i mentalizmu w Katowicach i na Śląsku. Wesela, eventy firmowe, urodziny, close-up magic. Iluzjonista łączący magię ze standup comedy.",
});

export default function OfertaPage() {
  return (
    <PageTransition>
      {/* Hero section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-navy-spotlight">
        <div className="absolute inset-0 bg-navy-radial opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <SectionHeading title="Oferta" subtitle="Co mogę dla Ciebie zrobić" />
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <ScrollReveal delay={0.1}>
              <p className="text-lg text-cream/80 leading-relaxed font-sans">
                Nie robię dwóch takich samych pokazów. Co innego sprawdza się
                przy kameralnej kolacji, co innego na weselu, a jeszcze co
                innego na scenie przed kilkuset osobami. Styl, tempo i dawka
                humoru zależą od tego, kogo mam przed sobą.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-cream/80 leading-relaxed font-sans">
                Poniżej znajdziesz kierunki, w których pracuję najczęściej.
                Potraktuj je jako punkt wyjścia — szczegóły zawsze ustalamy
                pod konkretne wydarzenie.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="relative pb-24 pt-16 bg-navy-mesh">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.slug} delay={index * 0.1}>
                <Link
                  href={`/oferta/${service.slug}`}
                  className="group block h-full"
                >
                  <div className="card-navy rounded-xl overflow-hidden h-full flex flex-col p-6">
                    {/* Icon */}
                    <div className="mb-5 flex justify-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy to-navy-dark flex items-center justify-center shadow-[0_0_20px_rgba(26,26,94,0.4)] group-hover:shadow-[0_0_30px_rgba(201,168,76,0.2)] transition-shadow duration-500">
                        <ServiceEmoji icon={service.icon} size={40} alt={service.name} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-serif text-cream text-center group-hover:text-gold transition-colors duration-300 mb-3">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-cream/60 leading-relaxed font-sans line-clamp-3 text-center mb-4 flex-grow">
                      {service.description}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-gold-gradient opacity-30 mb-4" />

                    {/* Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-navy/30 text-cream/60 text-xs px-2 py-1 rounded-full">
                        {service.audience}
                      </span>
                      <span className="bg-navy/30 text-cream/60 text-xs px-2 py-1 rounded-full">
                        {service.duration}
                      </span>
                    </div>

                    {/* Link */}
                    <span className="inline-block text-gold text-sm font-medium text-center group-hover:translate-x-1 transition-transform duration-300">
                      Dowiedz się więcej &rarr;
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
