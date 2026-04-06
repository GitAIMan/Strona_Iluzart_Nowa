import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import SectionHeading from "@frontend/components/ui/SectionHeading";
import ScrollReveal from "@frontend/components/shared/ScrollReveal";
import ContactForm from "@frontend/components/contact/ContactForm";
import { CONTACT } from "@shared/constants";

export const metadata = generatePageMetadata({
  title: "Kontakt – Zarezerwuj Iluzjonistę Katowice",
  description:
    "Zarezerwuj pokaz magii w Katowicach i na Śląsku. Zadzwoń, napisz lub wypełnij formularz — odpowiadam tego samego dnia.",
});

const steps = [
  {
    number: "1",
    title: "Napisz lub zadzwoń",
    description: "WhatsApp, telefon, e-mail lub formularz obok — jak Ci wygodnie.",
  },
  {
    number: "2",
    title: "Ustalamy szczegóły",
    description:
      "Typ pokazu, termin, miejsce, liczba gości — dopasuję ofertę do Twojego wydarzenia.",
  },
  {
    number: "3",
    title: "Ty się bawisz, ja czaruję",
    description:
      "Resztą zajmę się sam. Ty skupiasz się na gościach i dobrej zabawie.",
  },
];

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gold"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gold"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gold"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function KontaktPage() {
  return (
    <PageTransition>
      {/* Hero section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-dark/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,26,94,0.15)_0%,_transparent_70%)]" />
        <div className="relative z-10" />
      </section>

      {/* Content */}
      <section className="pb-24 -mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left column */}
            <ScrollReveal direction="left">
              <div className="space-y-10">
                <SectionHeading
                  title="Zarezerwuj swój termin"
                  subtitle="Kontakt"
                  align="left"
                />

                <div>
                  <h3 className="text-xl font-serif text-cream mb-8">
                    Jak zamówić pokaz lub warsztaty?
                  </h3>

                  <div className="space-y-8">
                    {steps.map((step) => (
                      <div key={step.number} className="flex gap-5">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center">
                          <span className="text-background font-bold font-sans text-lg">
                            {step.number}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-serif text-cream mb-1">
                            {step.title}
                          </h4>
                          <p className="text-cream/60 font-sans">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact info */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <PhoneIcon />
                    <a
                      href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                      className="text-cream/80 hover:text-gold transition-colors font-sans"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <EmailIcon />
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-cream/80 hover:text-gold transition-colors font-sans"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <LocationIcon />
                    <span className="text-cream/80 font-sans">
                      {CONTACT.address}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right column */}
            <ScrollReveal direction="right" delay={0.2}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
