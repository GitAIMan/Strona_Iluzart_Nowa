import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageTransition from "@frontend/components/layout/PageTransition";
import Button from "@frontend/components/ui/Button";
import ScrollReveal from "@frontend/components/shared/ScrollReveal";
import { services } from "@shared/data/services";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Usługa nie znaleziona" };
  }

  return {
    title: `${service.name} | Iluzjonista Śląsk - IluzArt`,
    description: `${service.description} Iluzjonista Katowice i Śląsk. ${service.audience}, czas trwania: ${service.duration}.`,
  };
}

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

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  return (
    <PageTransition>
      {/* 1. Hero section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-navy-spotlight">
        <div className="absolute inset-0 bg-navy-radial opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-dark/20 to-background" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-gold text-sm uppercase tracking-[0.2em] font-sans font-medium mb-6">
              Oferta
            </p>

            {/* Icon in gold circle */}
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center text-gold shadow-[0_0_40px_rgba(201,168,76,0.15)]">
                <ServiceIcon
                  icon={service.icon}
                  className="[&_svg]:w-8 [&_svg]:h-8"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream leading-tight mb-8">
              {service.name}
            </h1>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              <span className="bg-navy/50 border border-navy-light/30 text-cream/70 text-sm px-4 py-1.5 rounded-full">
                {service.audience}
              </span>
              <span className="bg-navy/50 border border-navy-light/30 text-cream/70 text-sm px-4 py-1.5 rounded-full">
                {service.duration}
              </span>
              <span className="bg-navy/50 border border-navy-light/30 text-gold/80 text-sm px-4 py-1.5 rounded-full">
                {service.priceRange}
              </span>
            </div>

            {/* Scroll indicator */}
            <div className="animate-bounce text-cream/30">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="mx-auto"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Description section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal delay={0.1}>
            <div className="border-l-2 border-navy-light pl-8">
              <p className="text-lg leading-relaxed text-cream/80 font-sans">
                {service.details}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Highlights section */}
      <section className="relative py-20 bg-navy-mesh">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-serif text-cream text-center mb-4">
              Co wyróżnia ten pokaz
            </h2>
            <div className="w-12 h-0.5 bg-gold-gradient mx-auto mb-12" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.highlights.map((highlight, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="card-navy rounded-xl p-6 flex items-start gap-4">
                  {/* Gold checkmark */}
                  <span className="flex-shrink-0 mt-0.5 text-gold">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <p className="text-cream/80 font-sans leading-relaxed">
                    {highlight}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Details cards */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0}>
              <div className="glass rounded-xl p-8 text-center bg-gradient-to-br from-navy-dark/60 to-navy/20 border border-navy-light/10">
                <div className="mb-4 text-gold flex justify-center">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <p className="text-xs uppercase tracking-widest text-cream/40 font-sans mb-2">
                  Dla kogo
                </p>
                <p className="text-lg font-semibold text-cream font-sans">
                  {service.audience}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="glass rounded-xl p-8 text-center bg-gradient-to-br from-navy-dark/60 to-navy/20 border border-navy-light/10">
                <div className="mb-4 text-gold flex justify-center">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <p className="text-xs uppercase tracking-widest text-cream/40 font-sans mb-2">
                  Czas trwania
                </p>
                <p className="text-lg font-semibold text-cream font-sans">
                  {service.duration}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="glass rounded-xl p-8 text-center bg-gradient-to-br from-navy-dark/60 to-navy/20 border border-navy-light/10">
                <div className="mb-4 text-gold flex justify-center">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                </div>
                <p className="text-xs uppercase tracking-widest text-cream/40 font-sans mb-2">
                  Orientacyjna cena
                </p>
                <p className="text-lg font-semibold text-cream font-sans">
                  {service.priceRange}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. CTA section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy to-navy-dark" />
        <div className="absolute inset-0 bg-navy-radial opacity-30" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-serif text-cream mb-4">
              Zarezerwuj ten pokaz
            </h2>
            <p className="text-cream/60 font-sans mb-8 leading-relaxed">
              Skontaktuj się ze mną, aby omówić szczegóły i zarezerwować termin
              na Twoje wydarzenie.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="https://wa.me/48882011161" size="lg">
                Napisz na WhatsApp
              </Button>
              <Button href="/kontakt" variant="secondary" size="lg">
                Strona kontaktowa
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Related services */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-serif text-cream text-center mb-4">
              Może Cię również zainteresować
            </h2>
            <div className="w-12 h-0.5 bg-gold-gradient mx-auto mb-12" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((related, index) => (
              <ScrollReveal key={related.slug} delay={index * 0.1}>
                <Link
                  href={`/oferta/${related.slug}`}
                  className="group block h-full"
                >
                  <div className="card-navy rounded-xl p-6 h-full flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy to-navy-dark flex items-center justify-center text-gold mb-4 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.15)] transition-shadow duration-500">
                      <ServiceIcon icon={related.icon} />
                    </div>
                    <h3 className="text-lg font-serif text-cream group-hover:text-gold transition-colors duration-300 mb-2">
                      {related.name}
                    </h3>
                    <p className="text-sm text-cream/50 font-sans line-clamp-2 mb-4 flex-grow">
                      {related.description}
                    </p>
                    <span className="text-gold text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                      Zobacz &rarr;
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
