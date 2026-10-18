import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Logo } from "@/components/logo";
import type { SiteSettings } from "@/lib/settings";

export function Footer({ settings }: { settings: SiteSettings }) {
  const currentYear = new Date().getFullYear();
  const cleanWhatsapp = (settings.whatsapp || "").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("مرحبًا، أرغب في الاستفسار عن خدماتكم.")}`;

  return (
    <footer className="site-footer">
      <div className="container footer-grid-modern">
        {/* Brand info */}
        <div className="footer-col brand-col">
          <Logo
            light
            brandName={settings.brandName}
            tagline={settings.tagline}
            logoUrl={settings.logoUrl}
          />
          <p className="footer-bio mt-4">
            {settings.tagline || "نحول الأفكار إلى واقع بصري يُميز علامتك التجارية، من التصميم الهندسي المتقن حتى التصنيع والتركيب بأعلى معايير الجودة والضمان."}
          </p>

          {settings.commercialRecord && (
            <div className="footer-badge mt-4">
              <span>{settings.commercialRecord}</span>
            </div>
          )}

          {/* Social media icons */}
          <div className="footer-social-links mt-4">
            {settings.socialTwitter && (
              <a href={settings.socialTwitter} target="_blank" rel="noopener noreferrer" aria-label="منصة إكس">
                <span>𝕏</span>
              </a>
            )}
            {settings.socialInstagram && (
              <a href={settings.socialInstagram} target="_blank" rel="noopener noreferrer" aria-label="انستغرام">
                <span>📸</span>
              </a>
            )}
            {settings.socialTiktok && (
              <a href={settings.socialTiktok} target="_blank" rel="noopener noreferrer" aria-label="تيك توك">
                <span>🎵</span>
              </a>
            )}
            {settings.socialLinkedin && (
              <a href={settings.socialLinkedin} target="_blank" rel="noopener noreferrer" aria-label="لينكد إن">
                <span>in</span>
              </a>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">روابط سريعة</h4>
          <ul className="footer-links-list">
            <li><Link href="/">الرئيسية</Link></li>
            <li><Link href="/about">من نحن وقصتنا</Link></li>
            <li><Link href="/services">جميع الخدمات</Link></li>
            <li><Link href="/portfolio">معرض الأعمال والمشاريع</Link></li>
            <li><Link href="/#quote-calculator">حاسبة التكلفة التقديرية</Link></li>
            <li><Link href="/blog">المدونة والمقالات</Link></li>
            <li><Link href="/contact">طلب استشارة وعرض سعر</Link></li>
          </ul>
        </div>

        {/* Services Links */}
        <div className="footer-col">
          <h4 className="footer-heading">خدماتنا الإعلانية</h4>
          <ul className="footer-links-list">
            <li><Link href="/services/signage">اللوحات والحروف البارزة</Link></li>
            <li><Link href="/services/printing">الطباعة بمختلف أنواعها</Link></li>
            <li><Link href="/services/awards">الدروع التكريمية والتذكارية</Link></li>
            <li><Link href="/services/promotional-gifts">الهدايا الدعائية المخصصة</Link></li>
            <li><Link href="/services/display-stands">استندات وحوامل المعارض</Link></li>
            <li><Link href="/services/project-boards">لوحات المشاريع والمواقع</Link></li>
          </ul>
        </div>

        {/* Contact info card */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">معلومات التواصل المباشر</h4>
          <div className="footer-contact-items">
            <a href={`tel:${settings.phone}`} className="footer-contact-line">
              <Phone size={15} className="contact-icon text-gold" />
              <span>{settings.phone}</span>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="footer-contact-line">
              <MessageCircle size={15} className="contact-icon text-emerald-400" />
              <span>واتساب: {settings.whatsapp}</span>
            </a>
            <a href={`mailto:${settings.email}`} className="footer-contact-line">
              <Mail size={15} className="contact-icon text-gold" />
              <span>{settings.email}</span>
            </a>
            <div className="footer-contact-line">
              <MapPin size={15} className="contact-icon text-gold" />
              <span>{settings.address}</span>
            </div>
            <div className="footer-contact-line">
              <Clock size={15} className="contact-icon text-gold" />
              <span>{settings.workingHours}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom-modern">
        <div className="footer-copy">
          © {currentYear} <b>{settings.brandName}</b>. جميع الحقوق محفوظة ومسجلة في المملكة العربية السعودية.
        </div>
        <div className="footer-bottom-links">
          <Link href="/contact">سياسة الخدمة والضمان</Link>
          <span className="divider">•</span>
          <Link href="/admin/login" className="admin-link">لوحة الإدارة</Link>
        </div>
      </div>
    </footer>
  );
}