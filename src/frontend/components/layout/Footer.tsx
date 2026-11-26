"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT, NAV_LINKS } from "@shared/constants";
import { useTripleClick } from "@frontend/hooks/useTripleClick";
import LoginModal from "@frontend/components/admin/LoginModal";

/* Stopka „Katowice w tle” (od 2026-11-27): czarno-białe zdjęcie z sesji za danymi */

const icon = "w-4 h-4 shrink-0 text-gold";
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const WRITE = [
  {
    label: "WhatsApp",
    href: CONTACT.whatsapp,
    svg: <svg className={icon} {...iconProps}><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z" /></svg>,
  },
  {
    label: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    svg: <svg className={icon} {...iconProps}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>,
  },
  {
    label: CONTACT.instagramHandle,
    href: CONTACT.instagram,
    svg: <svg className={icon} {...iconProps}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" /></svg>,
  },
];

const heading = "font-sans text-xs uppercase tracking-[0.2em] text-gold mb-4";
const link = "text-cream/80 hover:text-gold-light transition-colors";

export default function Footer() {
  const [showLogin, setShowLogin] = useState(false);
  const pathname = usePathname();
  const tripleClickProps = useTripleClick(() => setShowLogin(true));

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="grain relative overflow-hidden bg-[#0a0606] border-t border-gold/25 pb-20 md:pb-0">
      {/* Tło: Grzegorz z kartami na tle Katowic, przygaszone */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/hero_elo.jpeg"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover object-[70%_30%] grayscale contrast-[1.05] opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0606_30%,rgba(10,6,6,0.82)_55%,rgba(58,10,18,0.55)),linear-gradient(0deg,#0a0606,transparent_45%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 md:pt-20 pb-7">
        <div className="grid gap-10 md:grid-cols-[1.25fr_0.7fr_0.9fr] md:gap-12">
          <div>
            <Link href="/" className="inline-flex font-serif text-3xl leading-none">
              <span className="text-cream">Iluz</span>
              <span className="text-gold">Art</span>
            </Link>
            <p className="mt-3 font-sans text-cream/65 max-w-sm leading-relaxed">
              Iluzja ze stand-upem. Gram w Katowicach, na całym Śląsku i w całej Polsce.
            </p>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="inline-block mt-7 font-serif text-[2rem] md:text-[2.6rem] leading-none text-gold-light hover:text-cream transition-colors"
            >
              882 011 161
            </a>
            <span className="block mt-2 font-sans text-[13px] text-cream/40">
              Jeśli nie odbieram, jestem na scenie. Oddzwonię.
            </span>
          </div>

          <nav aria-label="Stopka">
            <h4 className={heading}>Strony</h4>
            <ul className="grid gap-2.5 font-sans">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className={heading}>Napisz</h4>
            <ul className="grid gap-2.5 font-sans">
              {WRITE.map((w) => (
                <li key={w.label}>
                  <a
                    href={w.href}
                    {...(w.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`inline-flex items-center gap-2.5 break-all ${link}`}
                  >
                    {w.svg}
                    {w.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-5 border-t border-white/10 flex flex-wrap justify-between gap-2">
          {/* Ukryte wejście do panelu admina: 3 kliknięcia */}
          <span {...tripleClickProps} className="font-sans text-xs text-cream/30 cursor-default select-none">
            &copy; {new Date().getFullYear()} IluzArt. Wszelkie prawa zastrzeżone.
          </span>
          <span className="font-sans text-xs text-cream/40">Katowice, Śląsk</span>
        </div>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </footer>
  );
}
