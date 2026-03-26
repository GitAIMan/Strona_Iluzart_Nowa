"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@frontend/components/shared/ScrollReveal";
import SectionHeading from "@frontend/components/ui/SectionHeading";
import ImagePlaceholder from "@frontend/components/ui/ImagePlaceholder";
import Button from "@frontend/components/ui/Button";
import { services, type ServiceData } from "@shared/data/services";

const featuredServices = [services[1], services[3], services[4]];

function ServiceCard({ service }: { service: ServiceData }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link
        href={`/oferta/${service.slug}`}
        className="block card-navy rounded-lg overflow-hidden group"
      >
        <ImagePlaceholder aspectRatio="16/9" />
        <div className="p-6">
          <h3 className="font-serif text-xl text-cream mb-3 group-hover:text-gold transition-colors duration-300">
            {service.name}
          </h3>
          <p className="text-cream/60 font-sans text-sm leading-relaxed line-clamp-3 mb-4">
            {service.description}
          </p>
          <span className="text-gold font-sans text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
            Dowiedz się więcej
            <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function OfferPreview() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Navy Mesh Background */}
      <div className="absolute inset-0 bg-navy-mesh pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            title="Oferta"
            subtitle="Co mogę dla Ciebie zrobić"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredServices.map((service, index) => (
            <ScrollReveal key={service.slug} delay={index * 0.15}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center">
            <Button variant="ghost" href="/oferta">
              Zobacz pełną ofertę &rarr;
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
