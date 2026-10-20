import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="section section-white min-h-[70vh] flex items-center justify-center text-center">
      <div className="container max-w-lg py-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold/10 text-gold flex items-center justify-center">
          <Search size={32} />
        </div>
        <span className="eyebrow">خطأ 404</span>
        <h1 className="text-3xl font-extrabold text-navy mt-2 mb-4">
          الصفحة المطلوبة غير موجودة
        </h1>
        <p className="text-muted text-sm leading-relaxed mb-8">
          عذرًا، يبدو أن الرابط الذي تحاول الوصول إليه تم نقله أو حذفه، أو قد تكون كتبت العنوان بشكل غير دقيق.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="button button-gold">
            <Home size={16} />
            <span>العودة للرئيسية</span>
          </Link>
          <Link href="/services" className="button button-outline">
            <span>استعراض الخدمات</span>
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
