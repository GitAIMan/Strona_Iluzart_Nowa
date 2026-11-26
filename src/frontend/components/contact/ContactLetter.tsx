"use client";

import { useEffect, useState, FormEvent } from "react";
import Image from "next/image";
import { CONTACT } from "@shared/constants";

const EVENT_TYPES = ["wesele", "urodziny dziecka", "event firmowy", "warsztaty", "festyn", "specjalne wydarzenie"];

type Msg = { who: "me" | "him"; text: string };

/* Data z pola type="date" (2027-06-14) → 14.06.2027 */
function plDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}.${m}.${y}` : iso;
}

/* Wypełniony list jako jeden tekst: ten sam w dymku rozmowy i w panelu admina */
function letterText(f: { name: string; eventType: string; eventDate: string; place: string; guests: string; phone: string }) {
  const where = f.place.trim() ? ` w miejscowości ${f.place.trim()}` : "";
  const guests = f.guests.trim() ? `, a gości będzie około ${f.guests.trim()}` : "";
  return `Dzień dobry, nazywam się ${f.name.trim()} i organizuję ${f.eventType}. Odbędzie się ${plDate(f.eventDate)}${where}${guests}. Proszę o kontakt pod numerem telefonu ${f.phone.trim()}.`;
}

/* Luka w liście: pole z przerywaną złotą kreską */
const blank = "contact-blank";

export default function ContactLetter() {
  const [form, setForm] = useState({
    name: "",
    eventType: EVENT_TYPES[0],
    eventDate: "",
    place: "",
    guests: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [chat, setChat] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.eventDate || form.phone.replace(/\D/g, "").length < 9) {
      setError("Uzupełnij przynajmniej imię, datę i telefon (9 cyfr), żebym mógł oddzwonić.");
      return;
    }
    setStatus("sending");
    const message = letterText(form);
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
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError(`Nie udało się wysłać. Zadzwoń: ${CONTACT.phone} albo napisz na WhatsApp.`);
    }
  }

  /* Po wysłaniu: list zamienia się w rozmowę z Grzegorzem */
  useEffect(() => {
    if (status !== "sent") return;
    document.getElementById("rozmowa")?.scrollIntoView({ behavior: "smooth", block: "start" });
    const name = form.name.trim().split(" ")[0];
    const script: Msg[] = [
      { who: "me", text: letterText(form) },
      { who: "him", text: `Dzięki, ${name}! Twoja prośba do mnie dotarła.` },
      { who: "him", text: `Sprawdzę kalendarz na ${plDate(form.eventDate)}.` },
      { who: "him", text: "Jeśli sprawa jest pilna, śmiało zadzwoń. Jeśli nie odbieram, jestem na scenie. Oddzwonię w ciągu 2 dni 😊" },
    ];
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 300;
    script.forEach((m, i) => {
      if (m.who === "him") {
        timers.push(setTimeout(() => setTyping(true), t));
        t += i === 1 ? 1300 : 1100;
      }
      timers.push(setTimeout(() => { setTyping(false); setChat((c) => [...c, m]); }, t));
      t += 500;
    });
    return () => timers.forEach(clearTimeout);
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === "sent") {
    const done = chat.length === 4;
    return (
      <div id="rozmowa" className="contact-chat max-w-[640px] scroll-mt-28" aria-live="polite">
        <div className="flex items-center gap-3 px-5 py-4 bg-wine-dark border-b border-gold/20">
          <span className="relative w-11 h-11 rounded-full overflow-hidden border border-gold shrink-0">
            <Image src="/images/oferta-closeup.jpeg" alt="" fill sizes="44px" className="object-cover object-[30%_15%]" />
          </span>
          <span>
            <b className="block font-sans font-semibold text-cream text-[15px]">Grzegorz, IluzArt</b>
            <i className="not-italic font-sans text-xs text-[#8fd19e]">● {typing ? "pisze…" : "online"}</i>
          </span>
        </div>
        <div className="flex flex-col gap-2.5 px-4 sm:px-5 py-6 min-h-[340px]">
          {chat.map((m, i) => (
            <p key={i} className={`contact-msg ${m.who === "me" ? "is-me" : "is-him"}`}>{m.text}</p>
          ))}
          {typing && (
            <span className="contact-typing" aria-label="Grzegorz pisze">
              <span /><span /><span />
            </span>
          )}
        </div>
        <div className={`flex flex-wrap gap-2.5 px-4 sm:px-5 py-4 border-t border-white/10 transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="rounded-full bg-gold px-4 py-2 font-sans text-sm font-semibold text-background hover:bg-gold-light transition-colors">
            Zadzwoń: 882 011 161
          </a>
          <a href={CONTACT.whatsapp} className="rounded-full border border-gold/45 px-4 py-2 font-sans text-sm text-cream hover:bg-gold/10 transition-colors">
            WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="contact-letter max-w-[860px]">
      <span className="contact-seal" aria-hidden>I</span>
      <p className="font-serif italic text-gold text-[22px] mb-5">Dzień dobry,</p>
      <p className="contact-prose">
        nazywam się{" "}
        <input className={blank} style={{ width: "9em" }} placeholder="imię" aria-label="Imię" autoComplete="given-name" value={form.name} onChange={(e) => set("name")(e.target.value)} />{" "}
        i organizuję{" "}
        <select className={`${blank} contact-select`} aria-label="Rodzaj wydarzenia" value={form.eventType} onChange={(e) => set("eventType")(e.target.value)}>
          {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        . Odbędzie się{" "}
        <input className={blank} style={{ width: "8.5em" }} type="date" aria-label="Data wydarzenia" value={form.eventDate} onChange={(e) => set("eventDate")(e.target.value)} />{" "}
        w{" "}
        <input className={blank} style={{ width: "9em" }} placeholder="miejscowość" aria-label="Miejscowość" value={form.place} onChange={(e) => set("place")(e.target.value)} />
        , a gości będzie około{" "}
        <input className={blank} style={{ width: "3.5em", minWidth: 0 }} placeholder="ile" inputMode="numeric" aria-label="Liczba gości" value={form.guests} onChange={(e) => set("guests")(e.target.value)} />
        . Proszę o kontakt pod numerem telefonu{" "}
        <input className={blank} style={{ width: "9em" }} type="tel" placeholder="np. 600 100 200" aria-label="Telefon" autoComplete="tel" value={form.phone} onChange={(e) => set("phone")(e.target.value)} />
        .
      </p>
      {error && <p role="alert" className="mt-5 font-sans text-sm text-gold-light">{error}</p>}
      <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-md bg-gold px-7 py-4 font-sans font-semibold text-background transition-colors hover:bg-gold-light disabled:opacity-60"
        >
          {status === "sending" ? "Wysyłam…" : "Wyślij prośbę"}
        </button>
      </div>
    </form>
  );
}
