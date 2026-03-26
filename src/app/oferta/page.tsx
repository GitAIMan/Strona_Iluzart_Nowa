import Link from "next/link";
import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import SectionHeading from "@frontend/components/ui/SectionHeading";
import ScrollReveal from "@frontend/components/shared/ScrollReveal";
import { services } from "@shared/data/services";

export const metadata = generatePageMetadata({
  title: "Oferta - Pokazy Iluzji i Warsztaty",
});

function ServiceIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const icons: Record<string, JSX.Element> = {
    sparkles: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
        <path d="M5 3v2" />
        <path d="M19 19v2" />
        <path d="M4 4l1 1" />
        <path d="M20 20l-1-1" />
      </svg>
    ),
    building: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </svg>
    ),
    hand: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 11V6a2 2 0 00-2-2 2 2 0 00-2 2v0" />
        <path d="M14 10V4a2 2 0 00-2-2 2 2 0 00-2 2v2" />
        <path d="M10 10.5V6a2 2 0 00-2-2 2 2 0 00-2 2v8" />
        <path d="M18 8a2 2 0 012 2v7.1a2 2 0 01-.6 1.4l-3 2.9a2 2 0 01-1.4.6H9a2 2 0 01-1.5-.7l-3.3-3.8A2 2 0 016 14.5V14" />
      </svg>
    ),
    brain: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22V12" />
        <path d="M9.5 8a3.5 3.5 0 10-2.83 6.86L12 12" />
        <path d="M14.5 8a3.5 3.5 0 112.83 6.86L12 12" />
        <path d="M7.17 14.86A4 4 0 009 21h6a4 4 0 001.83-6.14" />
        <path d="M12 2a3 3 0 00-2.83 2H9.5" />
        <path d="M12 2a3 3 0 012.83 2h-.33" />
      </svg>
    ),
    rings: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="12" r="5" />
        <circle cx="15" cy="12" r="5" />
      </svg>
    ),
    cake: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8" />
        <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
        <path d="M2 21h20" />
        <path d="M7 8v3" />
        <path d="M12 8v3" />
        <path d="M17 8v3" />
        <path d="M7 4h.01" />
        <path d="M12 4h.01" />
        <path d="M17 4h.01" />
      </svg>
    ),
  };
  return <span className={className}>{icons[icon] || icons.sparkles}</span>;
}

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
                Czy marzysz, by Twoje wydarzenie było wyjątkowe? A może chcesz,
                by Twoje dziecko odkryło swój talent lub po prostu przeżyło
                niezapomnianą przygodę?
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-cream/80 leading-relaxed font-sans">
                Moje pokazy i warsztaty iluzji to coś więcej niż sztuczki – to
                emocje, które zostają w pamięci na zawsze.
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
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy to-navy-dark flex items-center justify-center text-gold shadow-[0_0_20px_rgba(26,26,94,0.4)] group-hover:shadow-[0_0_30px_rgba(201,168,76,0.2)] transition-shadow duration-500">
                        <ServiceIcon icon={service.icon} />
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
