import ScrollReveal from "@frontend/components/shared/ScrollReveal";
import SectionHeading from "@frontend/components/ui/SectionHeading";
import ImagePlaceholder from "@frontend/components/ui/ImagePlaceholder";
import ParallaxImage from "@frontend/components/shared/ParallaxImage";
import Button from "@frontend/components/ui/Button";

export default function AboutPreview() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Navy Radial Background */}
      <div className="absolute inset-0 bg-navy-radial opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column - Text */}
          <ScrollReveal direction="left">
            <div className="border-l-2 border-navy-light pl-6">
            <SectionHeading
              title="O mnie"
              subtitle="Mistrz Iluzji"
              align="left"
            />
            <p className="text-cream/70 font-sans leading-relaxed mb-8">
              Dekada na scenach całego Śląska — od Bajki Pana Kleksa, przez
              Nibylandię i Strefę Bajtla, po setki wesel i eventów firmowych.
              Łączę iluzję z humorem, bo magia nie musi być poważna, żeby
              robiła wrażenie.
            </p>
            <Button variant="secondary" href="/o-mnie">
              Czytaj więcej
            </Button>
            </div>
          </ScrollReveal>

          {/* Right Column - Image */}
          <ScrollReveal direction="right" delay={0.2}>
            <ParallaxImage speed={0.2}>
              <div className="relative after:absolute after:inset-0 after:translate-x-3 after:translate-y-3 after:border after:border-gold/30 after:rounded-lg">
                <ImagePlaceholder aspectRatio="3/4" />
              </div>
            </ParallaxImage>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
