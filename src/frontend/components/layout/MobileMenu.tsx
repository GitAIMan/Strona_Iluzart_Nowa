"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NAV_LINKS, CONTACT } from "@shared/constants";
import Button from "@frontend/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg lg:hidden"
    >
      <div className="flex flex-col items-center justify-center h-full gap-8">
        {NAV_LINKS.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="text-2xl font-serif text-cream/80 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="mt-4"
        >
          <Button variant="primary" size="lg" href={CONTACT.whatsapp}>
            Sprawdź dostępność
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
