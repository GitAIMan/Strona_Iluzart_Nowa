"use client";

import { useState } from "react";
import { faqItems } from "@shared/data/faq";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="grain bg-lvl3"><div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-8 md:gap-12">
      <div className="md:col-span-4">
        <h2 className="font-serif text-cream text-3xl md:text-4xl leading-tight">
          Zanim zapytasz
        </h2>
        <p className="mt-4 font-sans text-cream/55 max-w-xs">
          Najczęstsze pytania o ceny, czas i dojazd.
        </p>
      </div>
      <div className="md:col-span-8 border-t border-white/10">
        {faqItems.map((item, index) => {
          const open = openIndex === index;
          return (
            <div key={item.question} className="border-b border-white/10">
              <button
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
                className="w-full flex items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-sans font-medium text-cream text-base md:text-lg">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={`text-gold text-2xl leading-none transition-transform duration-200 ${open ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-200 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <p className="overflow-hidden font-sans text-cream/60 leading-relaxed max-w-2xl">
                  <span className="block pb-5">{item.answer}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div></section>
  );
}
