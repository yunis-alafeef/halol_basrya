import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AdminPanel } from "@/components/admin-panel";
export default async function AdminPage() { const user = await getCurrentUser(); if (!user) redirect("/admin/login"); return <AdminPanel name={user.name} username={user.username} role={user.role}/>; }