import { prisma } from "@backend/lib/prisma";
import ContactsTable from "@frontend/components/admin/ContactsTable";

export default async function ContactsPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-serif text-cream mb-8">Wiadomości</h1>
      <ContactsTable
        submissions={submissions.map((s) => ({
          id: s.id,
          name: s.name,
          email: s.email,
          phone: s.phone,
          message: s.message,
          eventType: s.eventType,
          eventDate: s.eventDate ? s.eventDate.toISOString() : null,
          createdAt: s.createdAt.toISOString(),
          isRead: s.isRead,
        }))}
      />
    </div>
  );
}
