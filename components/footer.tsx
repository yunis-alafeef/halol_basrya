import Link from "next/link";
import { Logo } from "@/components/logo";
export function Footer() {
 return <footer className="site-footer"><div className="container footer-grid"><div><Logo light/><p>نحوّل فكرتك إلى حضور بصري يلفت الانتباه ويبقى في الذاكرة.</p></div><div><h3>روابط سريعة</h3><Link href="/about">من نحن</Link><Link href="/services">خدماتنا</Link><Link href="/portfolio">أعمالنا</Link><Link href="/blog">المدونة</Link></div><div><h3>تواصل معنا</h3><Link href="/contact">اطلب استشارة أو عرض سعر</Link><p>نرد على رسائلك في أقرب وقت</p></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} حلول بصرية. جميع الحقوق محفوظة.</span></div></footer>;
}