import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/content";
import { CoverImage } from "@/components/cover-image";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const post = await db.post.findFirst({ where: { slug, published: true }, select: { title: true, excerpt: true } }); return post ? { title: post.title, description: post.excerpt } : { title: "المقال غير موجود" }; }
export default async function PostPage({ params }: Props) { const { slug } = await params; const post = await db.post.findFirst({ where: { slug, published: true } }); if (!post) notFound(); return <article className="article-page"><div className="container article-container"><span className="eyebrow">مدونة حلول بصرية</span><h1>{post.title}</h1><p className="article-excerpt">{post.excerpt}</p><span className="post-date">{formatDate(post.publishedAt || post.createdAt)}</span><div className="article-cover"><CoverImage src={post.imageUrl} alt={post.title}/></div><div className="article-body">{(post.content || "").split(/\n{2,}/).map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}</div></div></article>; }