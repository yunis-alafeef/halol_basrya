import Link from "next/link";
import { Logo } from "@/components/logo";
const links = [["الرئيسية", "/"], ["من نحن", "/about"], ["خدماتنا", "/services"], ["أعمالنا", "/portfolio"], ["المدونة", "/blog"]];
export function Header() {
 return <header className="site-header"><div className="container nav-wrap"><Logo/><nav aria-label="التنقل الرئيسي">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav><Link href="/contact" className="button button-small">اطلب عرض سعر <span aria-hidden="true">←</span></Link></div></header>;
}