import Image from "next/image";
import Link from "next/link";
import { cardFace } from "@shared/data/blogCards";
import { formatDate } from "@shared/utils";

export interface DeckPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: Date | string | null;
  minutes: number;
  /** Zajawka albo początek treści */
  snippet: string;
}

/* Rogi karty: figura + kolor (np. A ♠) */
function Corners({ rank, suit }: { rank: string; suit: string }) {
  return (
    <>
      <span className="bcard-corner bcard-tl" aria-hidden>{rank}<small>{suit}</small></span>
      <span className="bcard-corner bcard-br" aria-hidden>{rank}<small>{suit}</small></span>
    </>
  );
}

function Cover({ post, sizes, suit }: { post: DeckPost; sizes: string; suit: string }) {
  if (post.coverImageUrl) {
    return <Image src={post.coverImageUrl} alt="" fill sizes={sizes} quality={80} className="object-cover" />;
  }
  return <span className="bcard-noimg" aria-hidden>{suit}</span>;
}

export default function BlogDeck({ posts }: { posts: DeckPost[] }) {
  const [first, ...rest] = posts;

  return (
    <>
      {/* Najnowszy wpis: duża karta na całą szerokość */}
      {first && (() => {
        const face = cardFace(0);
        return (
          <Link href={`/blog/${first.slug}`} className={`bcard bcard-feature group ${face.red ? "is-red" : ""}`}>
            <Corners rank={face.rank} suit={face.suit} />
            <div className="bcard-feature-pic">
              <Cover post={first} sizes="(max-width: 860px) 100vw, 60vw" suit={face.suit} />
            </div>
            <div className="flex flex-col justify-center gap-4 p-7 md:p-12 min-w-0">
              <p className="font-sans text-[13px] text-cream/45 flex flex-wrap gap-x-4 gap-y-1">
                <span className="text-gold">Najnowszy wpis</span>
                {first.publishedAt && <span>{formatDate(first.publishedAt)}</span>}
                <span>{first.minutes} min czytania</span>
              </p>
              <h2 className="font-serif text-cream text-3xl md:text-5xl leading-[1.08] group-hover:text-gold-light transition-colors">
                {first.title}
              </h2>
              {first.excerpt && <p className="font-sans text-cream/65 text-lg leading-relaxed">{first.excerpt}</p>}
              <span className="mt-2 self-start font-sans text-cream border-b border-cream/40 pb-0.5 group-hover:border-gold transition-colors">
                Czytaj wpis
              </span>
            </div>
          </Link>
        );
      })()}

      {/* Reszta talii */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-9 mt-12">
          {rest.map((p, i) => {
            const face = cardFace(i + 1);
            return (
              <Link key={p.id} href={`/blog/${p.slug}`} className={`bcard bcard-small group ${face.red ? "is-red" : ""}`}>
                <Corners rank={face.rank} suit={face.suit} />
                <div className="bcard-small-pic">
                  <Cover post={p} sizes="(max-width: 640px) 90vw, 360px" suit={face.suit} />
                </div>
                <div className="flex flex-col gap-2 px-5 pt-4 pb-7 flex-1">
                  <h3 className="font-serif text-cream text-[22px] leading-[1.2] group-hover:text-gold-light transition-colors">
                    {p.title}
                  </h3>
                  {p.snippet && (
                    <p className="font-sans text-[15px] leading-relaxed text-cream/60 line-clamp-4">{p.snippet}</p>
                  )}
                  <div className="mt-auto pt-4 flex items-end justify-between gap-3">
                    <span className="font-sans text-xs text-cream/40">
                      {p.publishedAt ? `${formatDate(p.publishedAt)} · ` : ""}{p.minutes} min
                    </span>
                    <span className="mr-6 font-sans text-sm text-cream border-b border-cream/40 pb-0.5 group-hover:border-gold transition-colors">
                      Czytaj wpis →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
