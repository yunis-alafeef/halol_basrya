import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { getProjects } from "@/lib/content";
import { getSiteSettings } from "@/lib/settings";
import { PortfolioGallery } from "@/components/portfolio-gallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "معرض أعمالنا ومشاريعنا المنفذة",
  description: "استعرض نماذج ومشاريع حقيقية تم تصميمها وتنفيذها لعملائنا في مجالات اللوحات الإعلانية، الحروف البارزة، الكلادينج، الطباعة، وأجنحة المعارض."
};

export default async function PortfolioPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSiteSettings()]);

  const cleanWhatsapp = (settings.whatsapp || "").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("مرحبًا، أود الاطلاع على نماذج أعمالكم وطلب تسعيرة لمشروعي.")}`;

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow"><i /> سابقة أعمال نفتخر بها</span>
          <h1>
            أفكارٌ تحوّلت<br />
            <em>إلى واقع ملموس.</em>
          </h1>
          <p>
            مجموعة مختارة من الواجهات التجارية، لوحات الحروف البارزة، الحملات المطبوعة، وأجنحة المعارض التي قمنا بإنتاجها وتركيبها بأعلى درجات الإتقان.
          </p>

          <div className="portfolio-hero-stats mt-8">
            <div className="p-stat">
              <b>+500</b>
              <span>مشروع منفذ بنجاح</span>
            </div>
            <div className="p-stat">
              <b>100%</b>
              <span>تطابق مع التصاميم ثلاثية الأبعاد</span>
            </div>
            <div className="p-stat">
              <b>3-5</b>
              <span>سنوات ضمان معتمد على الواجهات والإنارة</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section with Category Filter */}
      <section className="section section-white">
        <div className="container">
          <PortfolioGallery projects={projects} settings={settings} />
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="cta-band">
        <div className="container cta-content">
          <div>
            <span className="eyebrow eyebrow-gold">هل ترغب في حضور مماثل لعلامتك؟</span>
            <h2>مشروعك القادم<br /><em>يستحق جودة تليق بطموحك.</em></h2>
            <p className="text-white/80 max-w-lg mt-2 text-sm">
              نوفر لك معاينة ميدانية مجانية، ورفعًا مساحيًا دقيقًا، وتصميمًا ثلاثي الأبعاد يُريك النتيجة النهائية قبل بدء التصنيع.
            </p>
          </div>
          <div className="cta-actions flex flex-wrap gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button button-gold">
              <MessageCircle size={17} />
              <span>تواصل مع استشاري المشاريع</span>
            </a>
            <Link href="/contact" className="button button-outline !border-white !text-white hover:!bg-white hover:!text-navy">
              <span>طلب عرض سعر رسمي</span>
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}