"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Badge from "@frontend/components/ui/Badge";
import { formatDate } from "@shared/utils";
import { cn } from "@shared/utils";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  eventType: string | null;
  eventDate: string | null;
  createdAt: string;
  isRead: boolean;
}

interface ContactsTableProps {
  submissions: Submission[];
}

export default function ContactsTable({ submissions }: ContactsTableProps) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    const res = await fetch("/api/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isRead }),
    });

    if (res.ok) {
      router.refresh();
    }
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-cream/40 text-lg">Brak wiadomości</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left px-6 py-4 text-sm font-medium text-cream/50">
              Imię
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-cream/50">
              Email
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-cream/50">
              Typ wydarzenia
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-cream/50">
              Data
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-cream/50">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <>
              <tr
                key={sub.id}
                onClick={() => handleToggle(sub.id)}
                className={cn(
                  "border-b border-white/5 cursor-pointer transition-colors",
                  expandedId === sub.id
                    ? "bg-white/[0.03]"
                    : "hover:bg-white/[0.02]",
                  !sub.isRead && "bg-navy/5"
                )}
              >
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "font-medium",
                      sub.isRead ? "text-cream/70" : "text-cream"
                    )}
                  >
                    {sub.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-cream/50">
                  {sub.email}
                </td>
                <td className="px-6 py-4 text-sm text-cream/50">
                  {sub.eventType || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-cream/50">
                  {formatDate(sub.createdAt)}
                </td>
                <td className="px-6 py-4">
                  {sub.isRead ? (
                    <Badge variant="draft">Przeczytane</Badge>
                  ) : (
                    <Badge variant="unread">Nowe</Badge>
                  )}
                </td>
              </tr>
              {expandedId === sub.id && (
                <tr key={`${sub.id}-expanded`} className="bg-white/[0.02]">
                  <td colSpan={5} className="px-6 py-5">
                    <div className="space-y-3 max-w-2xl">
                      {sub.phone && (
                        <div>
                          <span className="text-xs font-medium text-cream/40 uppercase tracking-wider">
                            Telefon
                          </span>
                          <p className="text-sm text-cream/70 mt-1">
                            {sub.phone}
                          </p>
                        </div>
                      )}
                      {sub.eventDate && (
                        <div>
                          <span className="text-xs font-medium text-cream/40 uppercase tracking-wider">
                            Data wydarzenia
                          </span>
                          <p className="text-sm text-cream/70 mt-1">
                            {formatDate(sub.eventDate)}
                          </p>
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-medium text-cream/40 uppercase tracking-wider">
                          Wiadomość
                        </span>
                        <p className="text-sm text-cream/70 mt-1 whitespace-pre-wrap leading-relaxed">
                          {sub.message}
                        </p>
                      </div>
                      {!sub.isRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(sub.id, true);
                          }}
                          className="mt-2 px-4 py-2 text-sm bg-navy hover:bg-navy-light text-cream rounded-lg transition-colors"
                        >
                          Oznacz jako przeczytane
                        </button>
                      )}
                      {sub.isRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(sub.id, false);
                          }}
                          className="mt-2 px-4 py-2 text-sm bg-surface-light hover:bg-white/10 text-cream/50 rounded-lg transition-colors"
                        >
                          Oznacz jako nieprzeczytane
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
