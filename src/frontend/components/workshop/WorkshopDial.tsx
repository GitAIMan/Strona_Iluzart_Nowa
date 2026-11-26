"use client";

import { useEffect, useState, type ReactNode } from "react";

/* Plan warsztatu na tarczy zegara (120 minut). Kolejne części przełączają się same, klik zatrzymuje. */
const SEGMENTS = [
  { a: 0, b: 15, title: "Na start: pokaz", text: "Pokazuję kilka sztuczek z bliska. Dzieci widzą, czego się nauczą, i od razu chcą zacząć." },
  { a: 15, b: 45, title: "Karty", text: "Pierwsze triki z kartami. Proste ruchy, duży efekt. Każde dziecko ćwiczy samo." },
  { a: 45, b: 75, title: "Monety i przedmioty", text: "Znikające monety i magia z rzeczy, które każdy ma w kieszeni. Ręce pracują, motoryka mała też." },
  { a: 75, b: 100, title: "Próba", text: "Ćwiczenie w parach. Poprawiamy ruchy, uczymy się mówić do widza i trzymać tajemnicę." },
  { a: 100, b: 120, title: "Pokaz dla rodziców", text: "Dzieci występują ze swoim repertuarem. Pierwsze brawa, własne." },
];
const COLORS = ["#5c1520", "#701526", "#8c1d30", "#701526", "#c9a84c"];
const C = 260;
const R = 250;
const r = 140;

function pt(min: number, rad: number) {
  const ang = (min / 120) * 2 * Math.PI - Math.PI / 2;
  return [C + rad * Math.cos(ang), C + rad * Math.sin(ang)];
}

export default function WorkshopDial({ intro, actions }: { intro: ReactNode; actions: ReactNode }) {
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setCur((c) => (c + 1) % SEGMENTS.length), 3500);
    return () => clearInterval(id);
  }, [auto]);

  const pick = (i: number) => {
    setAuto(false);
    setCur(i);
  };
  const s = SEGMENTS[cur];

  const ticks = [];
  for (let i = 0; i <= 120; i += 5) {
    const [x1, y1] = pt(i, R + 6);
    const [x2, y2] = pt(i, R + (i % 15 ? 12 : 20));
    ticks.push(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c9a84c"
        strokeOpacity={i % 15 ? 0.35 : 0.8} strokeWidth={i % 15 ? 1 : 2} />
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-10 items-center">
      <div className="order-2 ws-dial">
        <svg viewBox="-30 -30 580 580" role="group" aria-label="Plan warsztatu, 120 minut">
          {ticks}
          {SEGMENTS.map((seg, i) => {
            const [ax, ay] = pt(seg.a, R);
            const [bx, by] = pt(seg.b, R);
            const [cx, cy] = pt(seg.b, r);
            const [dx, dy] = pt(seg.a, r);
            const [tx, ty] = pt((seg.a + seg.b) / 2, (R + r) / 2);
            return (
              <g
                key={seg.title}
                className={`ws-seg ${i === cur ? "is-on" : ""}`}
                tabIndex={0}
                role="button"
                aria-label={`${seg.a}–${seg.b} minuta: ${seg.title}`}
                aria-pressed={i === cur}
                onClick={() => pick(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    pick(i);
                  }
                }}
              >
                <path d={`M${ax},${ay} A${R},${R} 0 0 1 ${bx},${by} L${cx},${cy} A${r},${r} 0 0 0 ${dx},${dy}Z`} fill={COLORS[i]} />
                <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" fill={i === 4 ? "#0c0808" : "#f5f0e8"}>
                  {seg.a}–{seg.b}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="ws-hand" style={{ transform: `rotate(${((s.a + s.b) / 2 / 120) * 360 + 180}deg)` }} aria-hidden />
        <div className="ws-center" aria-hidden>
          <div>
            <b>{s.b}</b>
            <span>minuta</span>
          </div>
        </div>
      </div>

      <div className="order-1">
        {intro}
        <div className="mt-10 border-t border-gold/35 pt-5 min-h-[170px]" aria-live="polite">
          <p className="font-sans text-[13px] uppercase tracking-[0.14em] text-gold tabular-nums">
            {s.a}–{s.b} min
          </p>
          <h2 className="font-serif text-cream text-3xl mt-1.5 mb-2">{s.title}</h2>
          <p className="font-sans text-cream/80 max-w-md">{s.text}</p>
        </div>
        {actions}
      </div>
    </div>
  );
}
