import { getServerSession } from "next-auth";
import { authOptions } from "@backend/lib/auth";
import { redirect } from "next/navigation";
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

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
