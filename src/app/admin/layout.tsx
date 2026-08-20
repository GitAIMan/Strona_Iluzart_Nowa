import { getServerSession } from "next-auth";
import { authOptions } from "@backend/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@backend/lib/prisma";
import AdminSidebar from "@frontend/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const unreadCount = await prisma.contactSubmission.count({
    where: { isRead: false },
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <AdminSidebar unreadCount={unreadCount} />
      <main className="flex-1 p-4 md:p-8 min-w-0">{children}</main>
    </div>
  );
}
