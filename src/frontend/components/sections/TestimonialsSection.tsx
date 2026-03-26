import ScrollReveal from "@frontend/components/shared/ScrollReveal";
import SectionHeading from "@frontend/components/ui/SectionHeading";
import { testimonials } from "@shared/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Navy Spotlight Background */}
      <div className="absolute inset-0 bg-navy-spotlight pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading title="Co mówią klienci" subtitle="Opinie" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="rounded-lg p-6 h-full flex flex-col bg-white/[0.03] backdrop-blur-sm border border-navy/20 hover:border-navy/40 hover:shadow-[0_0_25px_rgba(26,26,94,0.2)] transition-all duration-300">
                {/* Gold Quote Icon */}
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="text-gold mb-4 flex-shrink-0"
                >
                  <path
                    d="M10.8 23.2C10.8 20.267 11.6 17.733 13.2 15.6C14.867 13.4 17.133 11.8 20 10.8L20.8 12.8C18.667 13.6 17.067 14.733 16 16.2C14.933 17.6 14.4 19.133 14.4 20.8H18V29.2H10.8V23.2ZM26.8 23.2C26.8 20.267 27.6 17.733 29.2 15.6C30.867 13.4 33.133 11.8 36 10.8L36.8 12.8C34.667 13.6 33.067 14.733 32 16.2C30.933 17.6 30.4 19.133 30.4 20.8H34V29.2H26.8V23.2Z"
                    fill="currentColor"
                  />
                </svg>

                {/* Testimonial Text */}
                <p className="text-cream/70 font-sans text-sm italic leading-relaxed mb-6 flex-1">
                  {testimonial.text}
                </p>

                {/* Author */}
                <div>
                  <p className="text-cream font-sans font-bold text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-cream/40 font-sans text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
