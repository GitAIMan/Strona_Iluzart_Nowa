"use client";

import { useState, FormEvent } from "react";
import { CONTACT } from "@shared/constants";

const EVENT_TYPES = ["Wesele", "Urodziny / impreza dla dzieci", "Event firmowy", "Festyn / festiwal", "Inne"];

const field =
  "w-full rounded-md bg-background/60 border border-white/10 px-4 py-3 font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors";
const label = "block font-sans text-sm text-cream/70 mb-1.5";

export default function AvailabilitySection() {
  const [form, setForm] = useState({
    eventDate: "",
    eventType: "Wesele",
    place: "",
    guests: "",
    name: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.eventDate || !form.name.trim() || form.phone.replace(/\D/g, "").length < 9) {
      setError("Podaj datę, imię i numer telefonu (9 cyfr), żebym mógł oddzwonić.");
      return;
    }
    setStatus("sending");
    const message = [
      "Zapytanie o wolny termin (formularz ze strony głównej).",
      `Rodzaj: ${form.eventType}`,
      `Miejsce: ${form.place || "nie podano"}`,
      `Liczba gości: ${form.guests || "nie podano"}`,
    ].join("\n");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          eventDate: form.eventDate,
          eventType: form.eventType,
          message,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
    } catch {
      setStatus("error");
      setError("Nie udało się wysłać. Zadzwoń lub napisz na WhatsApp, numer obok.");
    }
  }

  return (
    <section id="termin" className="scroll-mt-20 grain bg-spot">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-24 grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5">
          <h2 className="font-serif text-cream text-4xl md:text-5xl leading-[1.08] mb-6">
            Masz datę? Sprawdźmy, czy jestem wolny.
          </h2>
          <p className="font-sans text-cream/80 leading-relaxed mb-4 max-w-md">
            Soboty w sezonie weselnym rezerwują się z dużym wyprzedzeniem.
            Wypełnij formularz, a odpowiem tego samego dnia.
          </p>
          <p className="font-sans text-cream/70 mb-2">Wolisz od razu porozmawiać?</p>
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="block font-serif text-cream text-3xl md:text-4xl mb-3 hover:text-gold transition-colors"
          >
            882 011 161
          </a>
          <a
            href={CONTACT.whatsapp}
            className="font-sans text-cream border-b border-cream/50 pb-0.5 hover:border-gold transition-colors"
          >
            Napisz na WhatsApp
          </a>
        </div>

        <div className="lg:col-span-7">
          {status === "ok" ? (
            <div className="rounded-md bg-background/85 border border-gold/25 p-8 md:p-10">
              <p className="font-serif text-cream text-3xl mb-3">Dzięki, mam to.</p>
              <p className="font-sans text-cream/70">
                Sprawdzę kalendarz i oddzwonię na {form.phone} jeszcze dziś.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-md bg-background/85 border border-gold/25 p-6 md:p-8 grid sm:grid-cols-2 gap-5"
            >
              <div>
                <label htmlFor="av-date" className={label}>Data wydarzenia</label>
                <input id="av-date" type="date" className={field} value={form.eventDate} onChange={(e) => set("eventDate")(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="av-type" className={label}>Rodzaj</label>
                <select id="av-type" className={field} value={form.eventType} onChange={(e) => set("eventType")(e.target.value)}>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-background">{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="av-place" className={label}>Miejscowość</label>
                <input id="av-place" className={field} placeholder="np. Katowice" value={form.place} onChange={(e) => set("place")(e.target.value)} />
              </div>
              <div>
                <label htmlFor="av-guests" className={label}>Liczba gości (ok.)</label>
                <input id="av-guests" inputMode="numeric" className={field} placeholder="np. 120" value={form.guests} onChange={(e) => set("guests")(e.target.value)} />
              </div>
              <div>
                <label htmlFor="av-name" className={label}>Imię</label>
                <input id="av-name" autoComplete="given-name" className={field} value={form.name} onChange={(e) => set("name")(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="av-phone" className={label}>Telefon</label>
                <input id="av-phone" type="tel" autoComplete="tel" className={field} placeholder="np. 600 100 200" value={form.phone} onChange={(e) => set("phone")(e.target.value)} required />
              </div>
              {error && (
                <p role="alert" className="sm:col-span-2 font-sans text-sm text-gold-light">
                  {error}
                </p>
              )}
              <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center rounded-md bg-gold px-7 py-4 font-sans font-semibold text-background transition-colors hover:bg-gold-light disabled:opacity-60"
                >
                  {status === "sending" ? "Wysyłam..." : "Sprawdź wolny termin"}
                </button>
                <span className="font-sans text-xs text-cream/45">
                  Bez zobowiązań. Dane służą tylko do odpowiedzi.
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
