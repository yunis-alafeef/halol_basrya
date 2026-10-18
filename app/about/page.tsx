import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Eye, HeartHandshake, Target, ShieldCheck, Factory, Award, Wrench, CheckCircle2, MessageCircle } from "lucide-react";
import { CoverImage } from "@/components/cover-image";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "من نحن | خبرة وإتقان في صناعة الحضور الإعلاني",
  description: "تعرف على حلول بصير، شريكك الإبداعي والهندسي المتخصص في تصنيع اللوحات الإعلانية والواجهات والطباعة بمواصفات عالمية وضمانات معتمدة."
};

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const cleanWhatsapp = (settings.whatsapp || "").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("مرحبًا، أود التعرف أكثر على حلولكم والتعاون في مشروع إعلاني.")}`;

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow"><i /> قصة نجاح وشغف بالإتقان</span>
          <h1>
            نصنع حضورًا<br />
            <em>يُرى ويُذكر ويبقى.</em>
          </h1>
          <p>
            في <b>{settings.brandName}</b>، نؤمن بأن الواجهة الإعلانية ليست مجرد لوحة مثبتة، بل هي بطاقة التعارف الأولى بين مشروعك وجمهورك. نحوّل الرؤى الإبداعية إلى واقع هندسي متقن يدوم طويلاً.
          </p>

          <div className="about-stats-grid mt-10">
            <div className="about-stat-card">
              <b>+12</b>
              <span>عامًا من الخبرة في السوق السعودي</span>
            </div>
            <div className="about-stat-card">
              <b>+500</b>
              <span>مشروع وواجهة تجارية منجزة</span>
            </div>
            <div className="about-stat-card">
              <b>99.4%</b>
              <span>نسبة تسليم في الموعد المحدد</span>
            </div>
            <div className="about-stat-card">
              <b>100%</b>
              <span>ضمان معتمد على الخامات والتثبيت</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="section section-white">
        <div className="container about-grid">
          <div className="about-photo">
            <CoverImage
              src="/images/signage_cladding_workshop.jpg"
              alt="مهندسون وفنيون يعملون في مصنع اللوحات الإعلانية"
              priority
            />
            <span className="photo-note">الفكرة الجيدة تستحق تصنيعًا لا يقبل المساومة.</span>
          </div>

          <div className="about-copy">
            <span className="eyebrow">من نحن</span>
            <h2>إبداع هندسي يلتقي<br /><em>بالتنفيذ الحرفي الدقيق.</em></h2>
            <p>
              تأسست <b>{settings.brandName}</b> لتكون الوجهة المتكاملة لكل ما يخص الدعاية والإعلان والطباعة والتجهيزات الإعلانية بالمملكة العربية السعودية. نمتلك مصانعنا المجهزة بأحدث تقنيات القص بالليزر وثني المعادن الآلي وأفران الدهان الحراري.
            </p>
            <p>
              لا نعتمد على الوسطاء؛ ندير سلسلة القيمة بالكامل من الرفع المساحي الهندسي، مرورًا بالتصميم ثلاثي الأبعاد 3D واعتماده من العميل والبلدية، وحتى التصنيع والتركيب بأيدي فنيين متمرسين ومعدات رفع متطورة.
            </p>

            <div className="about-features-list my-6">
              <div className="flex items-center gap-2 mb-2 font-semibold text-navy">
                <CheckCircle2 size={16} className="text-gold" />
                <span>مصانع وطنية مجهزة بأحدث آلات الـ CNC والليزر</span>
              </div>
              <div className="flex items-center gap-2 mb-2 font-semibold text-navy">
                <CheckCircle2 size={16} className="text-gold" />
                <span>مطابقة تامة لاشتراطات كود البناء والدفاع المدني</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-navy">
                <CheckCircle2 size={16} className="text-gold" />
                <span>خدمة صيانة دورية سريعة ودعم فني متواصل</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button button-gold">
                <MessageCircle size={16} />
                <span>تحدث مباشرة مع مستشارنا</span>
              </a>
              <Link href="/portfolio" className="button button-outline">
                <span>استعرض سابقة أعمالنا</span>
                <ArrowLeft size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Capabilities & Machinery */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-heading centered-heading">
            <div>
              <span className="eyebrow">إمكانياتنا التصنيعية</span>
              <h2>بنية تحتية متطورة <em>تضمن الجودة والسرعة</em></h2>
            </div>
          </div>

          <div className="capabilities-grid">
            <div className="cap-card">
              <span className="cap-icon"><Factory size={24} /></span>
              <h3>قص وثني ليزر CNC آلي</h3>
              <p>دقة متناهية بالمليمتر في قص الأكريليك والاستيل والزنكور لتوفير حروف ثلاثية الأبعاد دون لحامات ظاهرة.</p>
            </div>

            <div className="cap-card">
              <span className="cap-icon"><Wrench size={24} /></span>
              <h3>خطوط تكسيات الكلادينج</h3>
              <p>مكابس تفريز وتشكيل ألواح الألومنيوم المقاومة للحريق مع هياكل تيوبات حديد مجلفنة مطابقة للاشتراطات.</p>
            </div>

            <div className="cap-card">
              <span className="cap-icon"><ShieldCheck size={24} /></span>
              <h3>مختبر تجميع واختبار الإنارة</h3>
              <p>فحص شدة اللومن وتوزيع الحرارة واختبار عزل الماء والرطوبة (IP67/IP68) لجميع شبكات LED قبل الخروج للتركيب.</p>
            </div>

            <div className="cap-card">
              <span className="cap-icon"><Award size={24} /></span>
              <h3>مطابع رقمية يابانية عريضة</h3>
              <p>طابعات UV وطابعات Eco-Solvent تنتج ألوانًا زاهية ومطابقة لكود Pantone ومقاومة لأشعة الشمس.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="section section-white">
        <div className="container">
          <div className="section-heading centered-heading">
            <div>
              <span className="eyebrow">ركائز عملنا</span>
              <h2>رؤية واضحة، <em>وقيم راسخة في كل مشروع</em></h2>
            </div>
          </div>

          <div className="values-grid">
            <article className="value-card">
              <span className="icon-box"><Eye size={22} /></span>
              <h3>رؤيتنا</h3>
              <p>أن نكون الخيار الأول والرائد في المملكة لتصنيع وتنفيذ الهويات والواجهات الإعلانية بأعلى معايير الإبداع والموثوقية الهندسية.</p>
            </article>

            <article className="value-card">
              <span className="icon-box"><Target size={22} /></span>
              <h3>رسالتنا</h3>
              <p>تمكين أصحاب العلامات التجارية والمشاريع من الظهور الاستثنائي الذي يليق بهم عبر حلول متكاملة تجمع جمال التصميم ومتانة التصنيع.</p>
            </article>

            <article className="value-card">
              <span className="icon-box"><HeartHandshake size={22} /></span>
              <h3>قيمنا الجوهرية</h3>
              <p>الإتقان التام، الصدق في المواعيد والمواصفات، الشفافية في التسعير، وخدمة ما بعد البيع التي تجعل عميلنا شريكًا دائمًا.</p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="container cta-content">
          <div>
            <span className="eyebrow eyebrow-gold">ابدأ معنا الآن</span>
            <h2>جاهزون لتحويل واجهتك<br /><em>إلى علامة تلفت الأنظار؟</em></h2>
            <p className="text-white/80 max-w-lg mt-2 text-sm">
              يسعدنا استقبالك في معرضنا أو إرسال فريق هندسي لموقع مشروعك لتقديم استشارة ومعاينة مجانية.
            </p>
          </div>
          <div className="cta-actions flex flex-wrap gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button button-gold">
              <MessageCircle size={17} />
              <span>محادثة استشارية فورية</span>
            </a>
            <Link href="/contact" className="button button-outline !border-white !text-white hover:!bg-white hover:!text-navy">
              <span>تواصل معنا عبر النموذج</span>
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}