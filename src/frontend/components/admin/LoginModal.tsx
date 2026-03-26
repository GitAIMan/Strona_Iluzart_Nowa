"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    const result = await signIn("credentials", {
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.ok) {
      router.push("/admin");
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={
            error
              ? {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  x: [0, -10, 10, -10, 10, 0],
                }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: 0.3 }}
          className="bg-surface border border-white/10 rounded-xl p-8 w-full max-w-sm mx-4 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-cream/30 hover:text-cream transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <h3 className="text-xl font-serif text-cream mb-6">
            Panel administracyjny
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Hasło"
                className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-cream placeholder:text-cream/30 focus:outline-none focus:border-navy-light transition-all"
                autoFocus
              />
              {error && (
                <p className="text-sm text-red-400 mt-2">
                  Nieprawidłowe hasło
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-3 bg-navy hover:bg-navy-light text-cream rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Logowanie..." : "Zaloguj się"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
