import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Award, BadgeCheck, Gift, Layers3, Printer, Stamp, Trophy, ShieldCheck, CheckCircle2, MessageCircle } from "lucide-react";
import { getServices } from "@/lib/content";
import { getSiteSettings } from "@/lib/settings";
import { CoverImage } from "@/components/cover-image";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "خدماتنا الإعلانية والطباعية المتكاملة",
  description: "استكشف خدمات حلول بصير في تصنيع اللوحات الإعلانية، الحروف البارزة، واجهات الكلادينج، الطباعة بمختلف أنواعها، الدروع التذكارية والهدايا الدعائية."
};

const icons = [Layers3, Printer, Trophy, Gift, Stamp, BadgeCheck, Award];

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()]);

  const cleanWhatsapp = (settings.whatsapp || "").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("مرحبًا، أرغب في الاستفسار عن باقات الخدمات الإعلانية والطباعة.")}`;

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow"><i /> خدمات متكاملة للدعاية والإعلان</span>
          <h1>
            حلول متكاملة،<br />
            <em>تصنع الفارق الحقيقي.</em>
          </h1>
          <p>
            من واجهة متاجرك ومشاريعك الإعلانية الكبرى وحتى أدق تفاصيل هداياك الدعائية ومطبوعاتك الورقية — نمتلك خطوط إنتاج متطورة وخبرة هندسية تُخرج أفكارك بأعلى معايير الإتقان.
          </p>

          <div className="services-top-stats mt-8">
            <div className="top-stat-item">
              <ShieldCheck size={18} className="text-gold" />
              <span>ضمان شامل حتى 5 سنوات</span>
            </div>
            <div className="top-stat-item">
              <CheckCircle2 size={18} className="text-gold" />
              <span>معاينة ورفع مساحي مجاني</span>
            </div>
            <div className="top-stat-item">
              <BadgeCheck size={18} className="text-gold" />
              <span>مطابقة لاشتراطات البلديات والدفاع المدني</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="section section-white">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">دليل الخدمات</span>
              <h2>خدماتنا المتخصصة <em>لجميع الأنشطة التجارية</em></h2>
            </div>
            <p>اضغط على أي خدمة لاستعراض المواصفات التقنية، خيارات الخامات، ومعرض النماذج المنفذة.</p>
          </div>

          <div className="service-grid service-grid-large">
            {services.map((service, index) => {
              const Icon = icons[index % icons.length];
              return (
                <article className="service-card service-card-expanded group" key={service.id}>
                  <div className="service-card-image">
                    <CoverImage src={service.imageUrl} alt={service.title} />
                  </div>
                  <div className="service-card-meta">
                    <span className="icon-box"><Icon size={22} /></span>
                    <span className="card-number">0{index + 1}</span>
                  </div>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <div className="service-card-footer mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link className="text-link font-bold text-navy hover:text-gold transition-colors inline-flex items-center gap-1.5" href={`/services/${service.slug}`}>
                      <span>التفاصيل والمواصفات</span>
                      <ArrowLeft size={15} />
                    </Link>
                    <Link className="button button-small button-outline" href="/contact">
                      طلب تسعيرة
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Production Quality Strip */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-heading centered-heading">
            <div>
              <span className="eyebrow">معايير التصنيع والجودة</span>
              <h2>لماذا يفضل العملاء <em>تنفيذ أعمالهم معنا؟</em></h2>
            </div>
          </div>

          <div className="values-grid">
            <article className="value-card">
              <span className="icon-box"><Layers3 /></span>
              <h3>ماكينات ليزر وCNC يابانية وأوروبية</h3>
              <p>دقة متناهية في قص الأكريليك، الزنكور، الكلادينج، والألومنيوم بدون أي زوائد أو تشوهات.</p>
            </article>

            <article className="value-card">
              <span className="icon-box"><BadgeCheck /></span>
              <h3>أنظمة إضاءة LED كورية معتمدة</h3>
              <p>نعتمد حصريًا وحدات سامسونج الأصلية ومحولات مين ويل المقاومة للحرارة والماء مع ترشيد الاستهلاك.</p>
            </article>

            <article className="value-card">
              <span className="icon-box"><ShieldCheck /></span>
              <h3>فريق تركيب هندسي ومعدات سلامة</h3>
              <p>رافعات وسقالات متخصصة وتركيب احترافي يضمن ثبات اللوحات في أصعب الظروف المناخية والرياح.</p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="container cta-content">
          <div>
            <span className="eyebrow eyebrow-gold">مشروع مخصص؟</span>
            <h2>لديك فكرة أو تصميم خاص؟<br /><em>فريقنا ينفذها بدقة هندسية.</em></h2>
            <p className="text-white/80 max-w-md mt-2 text-sm">
              أرسل لنا مخططك أو فكرتك وسنقوم بدراستها وتقديم نموذج ثلاثي الأبعاد وعرض سعر تنافسي.
            </p>
          </div>
          <div className="cta-actions flex flex-wrap gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button button-gold">
              <MessageCircle size={17} />
              <span>استشارة فورية عبر واتساب</span>
            </a>
            <Link href="/contact" className="button button-outline !border-white !text-white hover:!bg-white hover:!text-navy">
              <span>طلب زيارة ميدانية</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}