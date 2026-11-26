"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type Ticket = {
  slug: string;
  name: string;
  audience: "Dzieci" | "Dorośli" | "Wszyscy";
  short: string;
  highlights: string[];
  price: string;
  duration: string;
  photo: string | null;
  suit: string;
  atmosphere: "bg-velvet" | "bg-smoke";
};

const FILTERS = [
  { value: "all", label: "Wszystkie" },
  { value: "Dzieci", label: "Dla dzieci" },
  { value: "Dorośli", label: "Dla dorosłych" },
  { value: "Wszyscy", label: "Dla wszystkich" },
] as const;

const KIND: Record<Ticket["audience"], string> = {
  Dzieci: "Dla dzieci",
  Dorośli: "Dla dorosłych",
  Wszyscy: "Dla wszystkich",
};

export default function OfferTickets({ tickets }: { tickets: Ticket[] }) {
  const [filter, setFilter] = useState<string>("all");
  const visible = tickets.filter((t) => filter === "all" || t.audience === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2 pb-8" role="group" aria-label="Filtr pokazów">
        {FILTERS.map((f) => {
          const on = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f.value)}
              className={`rounded-full border px-[18px] py-2 font-sans text-sm transition-colors ${
                on
                  ? "bg-gold border-gold text-background"
                  : "border-gold/35 text-cream hover:border-gold/70"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 pb-20">
        {visible.map((t) => (
          <article key={t.slug} className="ticket">
            <div className="ticket-main rounded-l-lg grid sm:grid-cols-[130px_minmax(0,1fr)] min-w-0">
              <div
                className={`ticket-pic relative hidden sm:block overflow-hidden rounded-l-lg ${
                  t.photo ? "" : t.atmosphere
                }`}
              >
                {t.photo ? (
                  <Image
                    src={t.photo}
                    alt={t.name}
                    fill
                    sizes="130px"
                    quality={80}
                    className="object-cover"
                  />
                ) : (
                  <span
                    className="absolute inset-0 z-[1] grid place-items-center text-5xl text-gold"
                    aria-hidden
                  >
                    {t.suit}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2.5 p-5 sm:px-6 sm:py-6 min-w-0">
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">
                  {KIND[t.audience]}
                </span>
                <h2 className="font-serif text-cream text-2xl sm:text-[26px] leading-[1.15]">
                  {t.name}
                </h2>
                <p className="font-sans text-sm text-cream/60">{t.short}</p>
                <ul className="mt-1 grid gap-1 font-sans text-[13px] text-cream/75">
                  {t.highlights.map((h) => (
                    <li key={h}>
                      <span className="text-gold">✦ </span>
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/oferta/${t.slug}`}
                  className="mt-auto pt-2 self-start font-sans text-sm text-cream border-b border-cream/40 pb-0.5 hover:border-gold transition-colors"
                >
                  Pełny opis
                </Link>
              </div>
            </div>

            <div className="ticket-stub rounded-r-lg flex flex-col items-center justify-between gap-3 px-3 py-5 text-center">
              <div>
                <small className="block font-sans text-[10px] uppercase tracking-[0.18em] text-cream/65">
                  Cena
                </small>
                <b className="font-serif font-medium text-cream whitespace-nowrap text-base sm:text-2xl leading-tight">
                  {t.price}
                </b>
              </div>
              <div className="font-sans text-sm text-cream">
                <small className="block text-[10px] uppercase tracking-[0.18em] text-cream/65">
                  Czas
                </small>
                {t.duration}
              </div>
              <Link
                href="/#termin"
                className="w-full rounded-md bg-gold px-3 py-2 font-sans text-[13px] font-semibold text-background hover:bg-gold-light transition-colors"
              >
                Rezerwuj
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
