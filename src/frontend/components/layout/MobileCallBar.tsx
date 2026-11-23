"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CONTACT } from "@shared/constants";

// Przyklejony pasek kontaktu na telefonie. Pojawia się po przewinięciu hero.
export default function MobileCallBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-background/90 backdrop-blur-md border-t border-white/10 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-3">
        <a
          href="tel:+48882011161"
          className="flex-1 inline-flex items-center justify-center rounded-lg bg-gold-gradient text-background font-semibold font-sans py-3"
        >
          Zadzwoń
        </a>
        <a
          href={CONTACT.whatsapp}
          className="flex-1 inline-flex items-center justify-center rounded-lg border border-navy-light text-cream font-sans py-3"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
