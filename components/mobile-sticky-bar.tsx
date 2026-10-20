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
      className="mobile-sticky-bar md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0B1426]/95 backdrop-blur-md border-t border-white/10 shadow-[0_-8px_24px_rgba(0,0,0,0.3)] px-3 pt-2 pb-[max(8px,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto text-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 active:scale-95 transition-all"
        >
          <MessageCircle size={19} className="text-[#25D366] mb-0.5" />
          <span className="text-[11px] font-bold leading-tight">واتساب</span>
        </a>

        <a
          href={`tel:${settings.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-white/5 text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <Phone size={19} className="text-gold mb-0.5" />
          <span className="text-[11px] font-bold leading-tight">اتصال</span>
        </a>

        <Link
          href="/#quote-calculator"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-gold/20 text-gold hover:bg-gold/30 active:scale-95 transition-all"
        >
          <Calculator size={19} className="text-gold mb-0.5" />
          <span className="text-[11px] font-bold leading-tight">حاسبة السعر</span>
        </Link>

        <Link
          href="/portfolio"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 active:scale-95 transition-all"
        >
          <ImageIcon size={19} className="text-slate-300 mb-0.5" />
          <span className="text-[11px] font-semibold leading-tight">أعمالنا</span>
        </Link>
      </div>
    </aside>
  );
}
