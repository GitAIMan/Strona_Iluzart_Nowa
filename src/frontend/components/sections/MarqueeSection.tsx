"use client";

const ITEMS = [
  "Wesela",
  "Eventy firmowe",
  "Mentalizm",
  "Urodziny",
  "Close-up Magic",
  "Warsztaty",
  "Festiwale",
  "Gale",
  "Konferencje",
  "Pokazy sceniczne",
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  // Duplicate items for seamless loop
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={`inline-flex items-center gap-6 md:gap-10 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 md:gap-10">
            <span className="text-2xl md:text-4xl lg:text-5xl font-serif text-cream/10 uppercase tracking-wider select-none">
              {item}
            </span>
            <span className="text-gold/30 text-sm select-none">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  return (
    <section className="relative py-10 md:py-14 overflow-hidden border-y border-white/5">
      {/* Gradient fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="space-y-4 md:space-y-6">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </section>
  );
}
