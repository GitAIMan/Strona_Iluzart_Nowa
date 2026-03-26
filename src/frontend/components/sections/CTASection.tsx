import ScrollReveal from "@frontend/components/shared/ScrollReveal";
import Button from "@frontend/components/ui/Button";

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy/30 to-background" />

      {/* Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,26,94,0.3)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-cream mb-6">
            Gotowy na magię?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-cream/60 font-sans text-lg md:text-xl mb-10 leading-relaxed">
            Skontaktuj się ze mną i stwórzmy niezapomniane chwile na Twoim
            wydarzeniu
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <Button variant="primary" size="lg" href="https://wa.me/48882011161">
            Sprawdź dostępność terminu
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
