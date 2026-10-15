import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CoverImage } from "@/components/cover-image";
import { formatDate, getPosts } from "@/lib/content";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "المدونة" };
export default async function BlogPage() { const posts = await getPosts(); return <><section className="page-hero"><div className="container"><span className="eyebrow">مدونة حلول بصرية</span><h1>أفكار وخبرات<br/><em>تستحق القراءة.</em></h1><p>نشاركك أفكارًا عملية عن التصميم والطباعة والهوية البصرية وصناعة الحضور.</p></div></section><section className="section section-white"><div className="container post-grid post-grid-page">{posts.map(post => <Link href={"/blog/" + post.slug} className="post-card" key={post.id}><CoverImage src={post.imageUrl} alt={post.title}/><span className="post-date">{formatDate(post.publishedAt || post.createdAt)}</span><h2>{post.title}</h2><p>{post.excerpt}</p><span className="text-link">اقرأ المقال <ArrowLeft size={15}/></span></Link>)}</div>{posts.length === 0 && <div className="empty-state"><h2>مقالات قادمة</h2><p>ستظهر مقالاتنا الجديدة هنا قريبًا.</p></div>}</section></>; }