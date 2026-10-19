import "server-only";
import { db, type ServiceItem, type ProjectItem, type PostItem } from "@/lib/db";

export async function getServices(): Promise<ServiceItem[]> {
  return db.service.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
}

export async function getProjects(): Promise<ProjectItem[]> {
  return db.project.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getPosts(publishedOnly = true): Promise<PostItem[]> {
  return db.post.findMany({
    where: publishedOnly ? { published: true } : {},
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }]
  });
}

export async function getPostBySlug(slug: string): Promise<PostItem | null> {
  return db.post.findFirst({ where: { slug } });
}

export function formatDate(date: Date | null | undefined): string {
  if (!date) return "قريبًا";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("ar-SA", { year: "numeric", month: "long", day: "numeric" }).format(d);
}