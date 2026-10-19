"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Clock, MessageCircle, Menu, X, ArrowRight } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const cleanWhatsapp = (settings.whatsapp || "").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    "مرحبًا، أرغب في الاستفسار عن خدمات الدعاية والإعلان واللوحات."
  )}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Main Sticky Header */}
      <header className={`site-header sticky top-0 z-50 ${scrolled ? "scrolled shadow-sm" : ""}`}>
        <div className="container nav-wrap">
          <Logo
            brandName={settings.brandShortName || settings.brandName}
            tagline={settings.tagline}
            logoUrl={settings.logoUrl}
            className="brand-main"
          />

          <nav className="desktop-nav hidden-sm" aria-label="التنقل الرئيسي">
            <ul className="nav-list">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`nav-link ${
                        isActive ? "nav-link-active" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            <Link
              href="/contact"
              className="button button-primary button-sm hidden-sm"
            >
              <span>اطلب عرض سعر</span>
              <ArrowRight size={15} />
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
          <div
            className="mobile-drawer-overlay fixed inset-0 z-[60] bg-ink/90 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="mobile-drawer-content absolute right-0 top-0 bottom-0 w-full sm:w-[80%] max-w-sm bg-surface border-l border-border shadow-xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="mobile-drawer-header p-6 flex items-center justify-between border-b border-border">
                <Logo
                  brandName={settings.brandShortName || settings.brandName}
                  tagline={settings.tagline}
                  logoUrl={settings.logoUrl}
                  className="brand-mobile"
                />
                <button
                  type="button"
                  className="p-2 text-muted hover:text-text transition-colors"
                  onClick={() => setMobileOpen(false)}
                  aria-label="إغلاق"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mobile-drawer-links flex-1 p-6 space-y-1 overflow-y-auto">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`mobile-nav-link block px-4 py-3.5 text-text-light rounded-lg transition-colors ${
                        isActive
                          ? "bg-surface-alt text-text font-medium"
                          : "hover:bg-surface-hover hover:text-text"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mobile-drawer-footer p-6 border-t border-border">
                <Link
                  href="/contact"
                  className="button button-primary w-full text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  اطلب عرض سعر فوري <ArrowRight size={16} />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-outline w-full text-center mt-3 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  <span>محادثة واتساب مباشرة</span>
                </a>
                <div className="drawer-contact-info mt-6 text-muted text-sm">
                  <p className="mb-1">{settings.phone}</p>
                  <p>{settings.workingHours}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Contact details sit below the navigation on every screen size. */}
      <div className="top-contact-strip">
        <div className="container contact-strip-inner">
          <div className="strip-group">
            <a href={`tel:${settings.phone}`} className="strip-item">
              <Phone size={12} className="strip-icon" />
              <span>{settings.phone}</span>
            </a>
            <span className="strip-divider hidden-sm" aria-hidden="true">|</span>
            <span className="strip-item hidden-sm">
              <Clock size={12} className="strip-icon" />
              <span>{settings.workingHours}</span>
            </span>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="strip-whatsapp">
            <MessageCircle size={13} />
            <span>تواصل عبر واتساب</span>
          </a>
        </div>
      </div>
    </>
  );
}
