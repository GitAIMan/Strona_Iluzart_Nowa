"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@shared/utils";

const navLinks = [
  {
    label: "Wpisy",
    href: "/admin",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
  {
    label: "Wiadomości",
    href: "/admin/contacts",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

function SidebarContent({
  unreadCount,
  pathname,
  onNavigate,
}: {
  unreadCount: number;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-xl font-serif text-cream">IluzArt</span>
          <span className="px-2 py-0.5 text-xs font-medium bg-navy/50 text-cream/70 rounded-md border border-navy-light/30">
            Admin
          </span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-navy text-cream"
                  : "text-cream/50 hover:text-cream hover:bg-white/5"
              )}
            >
              {link.icon}
              {link.label}
              {link.href === "/admin/contacts" && unreadCount > 0 && (
                <span className="ml-auto flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold bg-gold text-background rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-1">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-cream/50 hover:text-cream hover:bg-white/5 transition-all duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12,19 5,12 12,5" />
          </svg>
          Wróć na stronę
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-cream/50 hover:text-red-400 hover:bg-white/5 transition-all duration-200 w-full text-left"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Wyloguj
        </button>
      </div>
    </>
  );
}

export default function AdminSidebar({ unreadCount = 0 }: { unreadCount?: number }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile topbar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-surface border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-lg font-serif text-cream">IluzArt</span>
          <span className="px-2 py-0.5 text-xs font-medium bg-navy/50 text-cream/70 rounded-md border border-navy-light/30">
            Admin
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 -mr-2 text-cream/70 hover:text-cream relative"
          aria-label="Otwórz menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-semibold bg-gold text-background rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-64 max-w-[80vw] bg-surface border-r border-white/5 flex flex-col h-full">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 text-cream/50 hover:text-cream"
              aria-label="Zamknij menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <SidebarContent
              unreadCount={unreadCount}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-surface border-r border-white/5 flex-col min-h-screen">
        <SidebarContent unreadCount={unreadCount} pathname={pathname} />
      </aside>
    </>
  );
}
