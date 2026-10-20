import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Clock, Layers, MessageCircle } from "lucide-react";
import { db } from "@/lib/db";
import { getSiteSettings } from "@/lib/settings";
import { CoverImage } from "@/components/cover-image";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await db.service.findFirst({ where: { slug } });
  if (!service) return { title: "الخدمة غير موجودة" };

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | تفاصيل الخدمة والتنفيذ`,
      description: service.description,
      images: service.imageUrl ? [{ url: service.imageUrl }] : []
    }
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, settings, allServices] = await Promise.all([
    db.service.findFirst({ where: { slug } }),
    getSiteSettings(),
    db.service.findMany({ orderBy: { sortOrder: "asc" } })
  ]);

  if (!service) notFound();

  const cleanWhatsapp = (settings.whatsapp || "").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`مرحبًا، أود طلب استشارة وعرض سعر لخدمة: ${service.title}`)}`;

  const otherServices = allServices.filter((s: { slug: string }) => s.slug !== slug).slice(0, 4);

  return (
    <>
      {/* Service Hero */}
      <section className="service-detail-hero">
        <div className="container">
          <div className="breadcrumbs mb-4">
            <Link href="/" className="crumb-link">الرئيسية</Link>
            <span className="crumb-sep">/</span>
            <Link href="/services" className="crumb-link">خدماتنا</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">{service.title}</span>
          </div>

          <div className="service-hero-grid">
            <div className="service-hero-copy">
              <span className="eyebrow eyebrow-gold">خدمة إعلانية معتمدة</span>
              <h1>{service.title}</h1>
              <p className="service-hero-desc">{service.description}</p>

              <div className="service-highlights-row">
                <div className="highlight-pill">
                  <ShieldCheck size={16} className="text-gold" />
                  <span>ضمان شامل يصل إلى 5 سنوات</span>
                </div>
                <div className="highlight-pill">
                  <Clock size={16} className="text-gold" />
                  <span>سرعة تصنيع ودقة في المواعيد</span>
                </div>
                <div className="highlight-pill">
                  <Layers size={16} className="text-gold" />
                  <span>خامات أوروبية ومحولات كورية أصلية</span>
                </div>
              </div>

              <div className="service-actions-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-gold"
                >
                  <MessageCircle size={17} />
                  <span>اطلب تسعيرة ومعاينة مجانية</span>
                </a>
                <Link href="/contact" className="button button-outline">
                  <span>تواصل عبر النموذج الرسمي</span>
                  <ArrowLeft size={16} />
                </Link>
              </div>
            </div>

            <div className="service-hero-image-wrap">
              <CoverImage
                src={service.imageUrl}
                alt={service.title}
                priority
                className="service-featured-cover"
              />
              <div className="service-guarantee-badge">
                <b>100%</b>
                <span>مطابقة للمواصفات الهندسية</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications & Process */}
      <section className="section section-white">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">المواصفات ومراحل العمل</span>
              <h2>كيف ننفذ خدمتك <em>بأعلى دقة واحترافية؟</em></h2>
            </div>
            <p>من أول فكرة وتصميم وحتى تسليم اللوحة أو المطبوعات مركبة وجاهزة، نتبع أسلوب عمل منضبط.</p>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <span className="process-num">01</span>
              <h3>المعاينة والرفع المساحي</h3>
              <p>فريقنا الفني يقوم بزيارة الموقع وأخذ القياسات الدقيقة ودراسة زوايا الرؤية والارتفاعات ونقاط الكهرباء.</p>
            </div>
            <div className="process-card">
              <span className="process-num">02</span>
              <h3>التصميم والمخطط الثلاثي</h3>
              <p>نعد تصورًا ثلاثي الأبعاد 3D يوضح شكل اللوحة أو المواد على واجهتك قبل بدء التصنيع الفعلي.</p>
            </div>
            <div className="process-card">
              <span className="process-num">03</span>
              <h3>التصنيع في مصانعنا</h3>
              <p>قص ليزر CNC، ثني وتجميع آلي، لحام ألومنيوم واستيل، وتركيب شبكات LED بمعايير السلامة.</p>
            </div>
            <div className="process-card">
              <span className="process-num">04</span>
              <h3>التركيب والاختبار والضمان</h3>
              <p>تركيب هندسي آمن بواسطة فنيين متخصصين، مع اختبار كامل لشدة الإضاءة وتسليم شهادة الضمان الرسمية.</p>
            </div>
          </div>

          {/* Quick Specifications Checklist */}
          <div className="specs-checklist-box mt-12">
            <h3>أهم المزايا التقنية لهذه الخدمة</h3>
            <div className="checklist-grid">
              <div className="check-item">
                <CheckCircle2 size={18} className="text-gold" />
                <div>
                  <b>مقاومة كاملة للعوامل الجوية:</b>
                  <p>معالجة لمقاومة درجات الحرارة العالية والغبار والأمطار وأشعة الشمس فوق البنفسجية.</p>
                </div>
              </div>
              <div className="check-item">
                <CheckCircle2 size={18} className="text-gold" />
                <div>
                  <b>إضاءة اقتصادية عالية السطوع:</b>
                  <p>استخدام وحدات LED موفرة للطاقة مع توزيع متجانس يمنع ظهور البقع المظلمة.</p>
                </div>
              </div>
              <div className="check-item">
                <CheckCircle2 size={18} className="text-gold" />
                <div>
                  <b>هياكل حديدية معالجة ضد الصدأ:</b>
                  <p>تيوبات حديد ثقيلة مع دهان برايمر مقاوم للتآكل وضمان متانة التثبيت في الواجهات العالية.</p>
                </div>
              </div>
              <div className="check-item">
                <CheckCircle2 size={18} className="text-gold" />
                <div>
                  <b>شهادات ضمان معتمدة:</b>
                  <p>ضمان موثق يشمل الإضاءة والمحولات وهيكل اللوحة مع خدمة صيانة دورية سريعة.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services Navigation */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">خدمات أخرى</span>
              <h2>استكشف المزيد من <em>حلولنا المتكاملة</em></h2>
            </div>
            <Link href="/services" className="text-link">
              شاهد كل الخدمات <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="service-grid">
            {otherServices.map((item, index) => (
              <Link href={`/services/${item.slug}`} className="service-card" key={item.id}>
                <span className="card-number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="text-link mt-4">
                  تفاصيل الخدمة <ArrowLeft size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="container cta-content">
          <div>
            <span className="eyebrow eyebrow-gold">هل ترغب في تنفيذ هذا المشروع؟</span>
            <h2>جاهزون لرفع المقاسات<br /><em>وتنفيذ واجهتك باحترافية.</em></h2>
            <p className="text-white/80 max-w-lg mt-2 text-sm">
              تواصل مع فريقنا الهندسي الآن وسنقوم بتقديم دراسة تسعيرية مفصلة وتصميم استرشادي خلال 24 ساعة فقط.
            </p>
          </div>
          <div className="cta-buttons flex flex-wrap gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button button-gold">
              <MessageCircle size={17} />
              <span>محادثة واتساب سريعة</span>
            </a>
            <Link href="/contact" className="button button-outline !border-white !text-white hover:!bg-white hover:!text-navy">
              <span>طلب موعد معاينة</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
