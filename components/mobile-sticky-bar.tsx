"use client";

import Link from "next/link";
import { MessageCircle, Phone, Calculator, Image as ImageIcon } from "lucide-react";
import type { SiteSettings } from "@/lib/settings";

interface MobileStickyBarProps {
  settings: SiteSettings;
}

export function MobileStickyBar({ settings }: MobileStickyBarProps) {
  const cleanWhatsapp = (settings.whatsapp || "").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    "مرحبًا، أود طلب معاينة واستشارة إعلانية لمشروعي."
  )}`;

  return (
    <aside
      aria-label="شريط التواصل السريع للجوال"
      className="mobile-sticky-bar md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7E9EE] shadow-[0_-4px_16px_rgba(11,20,38,0.08)] px-3 py-2"
    >
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto text-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#25D366]/10 text-[#075E54] active:scale-95 transition-transform"
        >
          <MessageCircle size={18} className="text-[#25D366] mb-0.5" />
          <span className="text-[11px] font-bold leading-tight">واتساب</span>
        </a>

        <a
          href={`tel:${settings.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-navy/5 text-navy active:scale-95 transition-transform"
        >
          <Phone size={18} className="text-gold mb-0.5" />
          <span className="text-[11px] font-bold leading-tight">اتصال</span>
        </a>

        <Link
          href="/#quote-calculator"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-gold/15 text-navy active:scale-95 transition-transform"
        >
          <Calculator size={18} className="text-gold mb-0.5" />
          <span className="text-[11px] font-bold leading-tight">حاسبة السعر</span>
        </Link>

        <Link
          href="/portfolio"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-surface-alt text-text-light active:scale-95 transition-transform"
        >
          <ImageIcon size={18} className="text-muted mb-0.5" />
          <span className="text-[11px] font-semibold leading-tight">أعمالنا</span>
        </Link>
      </div>
    </aside>
  );
}
