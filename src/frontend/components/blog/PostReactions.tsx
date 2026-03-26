"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getVisitorId } from "@shared/visitor";

const REACTIONS = [
  { key: "fire", emoji: "\uD83D\uDD25", label: "Super!" },
  { key: "heart", emoji: "\u2764\uFE0F", label: "Uwielbiam" },
  { key: "clap", emoji: "\uD83D\uDC4F", label: "Brawo" },
  { key: "wow", emoji: "\uD83E\uDD2F", label: "Wow" },
  { key: "magic", emoji: "\u2728", label: "Magia" },
];

interface PostReactionsProps {
  postId: string;
}

export default function PostReactions({ postId }: PostReactionsProps) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [animating, setAnimating] = useState<string | null>(null);
  const [visitorId, setVisitorId] = useState<string>("");

  useEffect(() => {
    const vid = getVisitorId();
    setVisitorId(vid);

    // Load counts + user's past reactions from server
    fetch(`/api/posts/${postId}/reactions?visitorId=${vid}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.counts) setCounts(data.counts);
        if (data.userReactions && data.userReactions.length > 0) setUserReaction(data.userReactions[0]);
      })
      .catch(() => {});
  }, [postId]);

  const handleReact = useCallback(
    async (emoji: string) => {
      if (userReaction || !visitorId) return;

      // Optimistic update
      setCounts((prev) => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }));
      setUserReaction(emoji);

      // Float animation
      setAnimating(emoji);
      setTimeout(() => setAnimating(null), 800);

      // Save to server
      const res = await fetch(`/api/posts/${postId}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emoji, visitorId }),
      }).catch(() => null);

      // If conflict (already reacted) — revert optimistic update
      if (res && res.status === 409) {
        setCounts((prev) => ({
          ...prev,
          [emoji]: Math.max(0, (prev[emoji] || 1) - 1),
        }));
      }
    },
    [userReaction, visitorId, postId]
  );

  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <p className="text-sm text-cream/40 font-sans">
        Jak oceniasz ten wpis?
      </p>
      <div className="flex items-center gap-3">
        {REACTIONS.map(({ key, emoji, label }) => (
          <div key={key} className="relative">
            <button
              onClick={() => handleReact(key)}
              disabled={!!userReaction}
              title={label}
              className={`
                relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300
                ${
                  userReaction === key
                    ? "bg-navy/30 border border-navy/40 scale-105 cursor-default"
                    : userReaction
                      ? "bg-surface/50 border border-white/5 opacity-40 cursor-default"
                      : "bg-surface border border-white/5 hover:border-navy/30 hover:bg-navy/10 hover:scale-110 cursor-pointer"
                }
              `}
            >
              <span className="text-xl md:text-2xl select-none">{emoji}</span>
              <span className="text-xs text-cream/40 font-sans tabular-nums">
                {counts[key] || 0}
              </span>
            </button>

            <AnimatePresence>
              {animating === key && (
                <motion.span
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -30 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-gold text-sm font-semibold pointer-events-none"
                >
                  +1
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
