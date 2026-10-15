import "server-only";
import { db } from "@/lib/db";
export async function getServices() { return db.service.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }); }
export async function getProjects() { return db.project.findMany({ orderBy: { createdAt: "desc" } }); }
export async function getPosts(publishedOnly = true) { return db.post.findMany({ where: publishedOnly ? { published: true } : {}, orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }] }); }
export function formatDate(date: Date | null) { return date ? new Intl.DateTimeFormat("ar-SA", { year: "numeric", month: "long", day: "numeric" }).format(date) : "قريبًا"; }