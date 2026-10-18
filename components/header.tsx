"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Clock, MapPin, MessageCircle, Menu, X, ArrowLeft, Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";
import type { SiteSettings } from "@/lib/settings";

const links = [
  { label: "الرئيسية", href: "/" },
  { label: "خدماتنا", href: "/services" },
  { label: "أعمالنا", href: "/portfolio" },
  { label: "حاسبة الأسعار", href: "/#quote-calculator" },
  { label: "من نحن", href: "/about" },
  { label: "المدونة", href: "/blog" },
  { label: "تواصل معنا", href: "/contact" }
];

export function Header({ settings }: { settings: SiteSettings }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const cleanWhatsapp = (settings.whatsapp || "").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("مرحبًا، أرغب في الاستفسار عن خدمات الدعاية والإعلان واللوحات.")}`;

  return (
    <>
      {/* Top info & announcement bar */}
      {settings.announcementEnabled && settings.announcementText && (
        <div className="top-announcement-bar">
          <div className="container announcement-inner">
            <span className="announcement-badge">
              <Sparkles size={13} className="text-gold" /> جديد
            </span>
            <p className="announcement-text">{settings.announcementText}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="announcement-link"
            >
              استشرنا الآن عبر واتساب ←
            </a>
          </div>
        </div>
      )}

      {/* Secondary Quick Contact Strip */}
      <div className="top-contact-strip">
        <div className="container contact-strip-inner">
          <div className="strip-group">
            <a href={`tel:${settings.phone}`} className="strip-item">
              <Phone size={13} className="strip-icon" />
              <span>{settings.phone}</span>
            </a>
            <span className="strip-divider" aria-hidden="true">|</span>
            <span className="strip-item hidden-mobile">
              <Clock size={13} className="strip-icon" />
              <span>{settings.workingHours}</span>
            </span>
            <span className="strip-divider hidden-mobile" aria-hidden="true">|</span>
            <span className="strip-item hidden-tablet">
              <MapPin size={13} className="strip-icon" />
              <span>{settings.address}</span>
            </span>
          </div>

          <div className="strip-group">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="strip-whatsapp"
            >
              <MessageCircle size={14} />
              <span>تواصل عبر واتساب</span>
            </a>
            {settings.commercialRecord && (
              <span className="strip-cr hidden-mobile">{settings.commercialRecord}</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="site-header sticky top-0 z-50">
        <div className="container nav-wrap">
          <Logo
            brandName={settings.brandShortName || settings.brandName}
            tagline={settings.tagline}
            logoUrl={settings.logoUrl}
          />

          <nav className="desktop-nav" aria-label="التنقل الرئيسي">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  {link.label}
                  {isActive && <span className="nav-active-pill" />}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <Link href="/contact" className="button button-gold button-small desktop-only-btn">
              <span>اطلب عرض سعر</span>
              <ArrowLeft size={15} />
            </Link>

            <button
              type="button"
              className="mobile-menu-trigger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)}>
            <div
              className="mobile-drawer-content"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="mobile-drawer-header">
                <Logo
                  brandName={settings.brandShortName || settings.brandName}
                  tagline={settings.tagline}
                  logoUrl={settings.logoUrl}
                />
                <button
                  type="button"
                  className="close-drawer-btn"
                  onClick={() => setMobileOpen(false)}
                  aria-label="إغلاق"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mobile-drawer-links">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`mobile-nav-link ${isActive ? "active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{link.label}</span>
                      <ArrowLeft size={16} />
                    </Link>
                  );
                })}
              </div>

              <div className="mobile-drawer-footer">
                <Link
                  href="/contact"
                  className="button button-gold w-full text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  اطلب عرض سعر فوري <ArrowLeft size={16} />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-outline w-full text-center mt-2 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  <span>محادثة واتساب مباشرة</span>
                </a>

                <div className="drawer-contact-info mt-4">
                  <small className="block text-gray-500">{settings.phone}</small>
                  <small className="block text-gray-400 mt-1">{settings.workingHours}</small>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}