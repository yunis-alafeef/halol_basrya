import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeCheck,
  CheckCircle2,
  Layers3,
  MessageCircle,
  Printer,
  Sparkles,
  Star,
  Trophy
} from "lucide-react";
import { CoverImage } from "@/components/cover-image";
import { FastQuoteEstimator } from "@/components/fast-quote-estimator";
import { getPosts, getProjects, getServices, formatDate } from "@/lib/content";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

const icons = [Layers3, Printer, Trophy, Sparkles, BadgeCheck, Award];

const clientReviews = [
  {
    name: "م. فهد السبيعي",
    company: "مجموعة السبيعي القابضة — الرياض",
    rating: 5,
    text: "نفذوا لنا واجهة الكلادينج والحروف البارزة لفرعنا الرئيسي في الرياض، الدقة في التركيب وجودة الإنارة الكورية تفوقت على توقعاتنا، والتسليم كان قبل الموعد المحدد."
  },
  {
    name: "أ. ريم الشمري",
    company: "سلسلة كافيهات أروما",
    rating: 5,
    text: "تعامل راقٍ وشفافية في الأسعار. أعدوا لنا محاكاة 3D للوحة قبل التصنيع، وكان الشكل النهائي مطابقًا تمامًا بنسبة 100%. الضمان والمتابعة بعد التركيب ممتازة."
  },
  {
    name: "م. خالد باوزير",
    company: "شركة الأفق للمعارض والمؤتمرات",
    rating: 5,
    text: "أنقذوا مشاركتنا في معرض الرياض الدولي بتجهيز جناح المعرض والاستندات المطبوعة خلال 48 ساعة فقط بخامات فاخرة وتشطيب احترافي."
  }
];

const faqs = [
  {
    q: "كم تستغرق مدة تصنيع وتركيب اللوحات الإعلانية عادةً؟",
    a: "تتراوح مدة تصنيع لوحات الحروف البارزة والكلادينج بين 3 إلى 7 أيام عمل بحسب حجم المشروع وتعقيد التفاصيل الهندسية، مع توفير خيار التنفيذ السريع العاجل للمشاريع الطارئة."
  },
  {
    q: "هل تقدمون خدمة المعاينة الميدانية والرفع المساحي مجانًا؟",
    a: "نعم، نوفر خدمة المعاينة الهندسية ورفع المقاسات وفحص نقاط الكهرباء مجانًا داخل مدينة الرياض، مع تقديم تصميم استرشادي أولي قبل اعتماد العقد."
  },
  {
    q: "ما هي فترة الضمان التي تقدمونها على اللوحات والإنارة؟",
    a: "نقدم ضمانًا معتمدًا يتراوح بين 3 إلى 5 سنوات يشمل محولات الكهرباء ووحدات LED وثبات الحروف وهيكل التثبيت، مع توفير صيانة دورية سريعة."
  },
  {
    q: "هل تقومون بالتوريد والتركيب خارج مدينة الرياض؟",
    a: "نعم، فريقنا الهندسي ينفذ مشاريع كبرى في جميع مناطق المملكة العربية السعودية (جدة، مكة، الدمام، القصيم، المدينة، والجنوب) بأسطول تركيب متخصص."
  }
];

export default async function HomePage() {
  const [services, projects, posts, settings] = await Promise.all([
    getServices(),
    getProjects(),
    getPosts(),
    getSiteSettings()
  ]);

  const featured = projects.filter((item) => item.featured).slice(0, 4);
  const cleanWhatsapp = (settings.whatsapp || "").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("مرحبًا، أود الاستفسار عن تنفيذ لوحة إعلانية لمشروعي.")}`;

  return (
    <>
      {/* Hero Section */}
      <section className="section section-dark hero-luxury" aria-label="الرئيسية">
        <div className="container hero-luxury-grid">
          <div className="hero-luxury-copy">
            <div className="hero-kicker">
              {settings.brandName} — صُنّاع الحضور الإعلاني والواجهات الفاخرة
            </div>

            <h1>
              حضور علامتك يبدأ<br />
              <em>من واجهة تصنع الفارق</em><br />
              وتترك أثرًا راسخًا.
            </h1>

            <p className="hero-lead">
              نصمم وننفذ هويتك على أرض الواقع بأحدث ماكينات الليزر وتقنيات
              الكلادينج والحروف البارزة ثلاثية الأبعاد، بمواصفات عالمية وضمان
              معتمد.
            </p>

            <div className="hero-actions">
              <Link href="/contact" className="button button-primary button-lg">
                <span>اطلب عرض سعر</span>
                <ArrowRight size={17} />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-outline button-lg"
              >
                <MessageCircle size={17} />
                <span>محادثة واتساب مباشرة</span>
              </a>
            </div>

            <div className="hero-proof">
              <div className="proof-item">
                <b>+500</b>
                <span>مشروع منفذ بنجاح</span>
              </div>
              <div className="proof-divider" />
              <div className="proof-item">
                <b>حتى 5 سنوات</b>
                <span>ضمان معتمد على الإنارة والتثبيت</span>
              </div>
              <div className="proof-divider" />
              <div className="proof-item">
                <b>مجاني</b>
                <span>معاينة وتصميم استرشادي أولي</span>
              </div>
            </div>
          </div>

          <div className="hero-luxury-visual">
            <div className="hero-image-wrap">
              <CoverImage
                src="/images/hero_commercial_signage.jpg"
                alt="واجهة تجارية فاخرة بحروف بارزة ثلاثية الأبعاد وإنارة ليد كورية"
                priority
                sizes="(max-width: 900px) 100vw, 60vw"
              />
              <div className="hero-image-overlay" />
              <div className="hero-floating-badge">
                <Sparkles size={18} className="text-gold" />
                <div>
                  <b>+500 مشروع منجز</b>
                  <small>بمختلف مدن المملكة</small>
                </div>
              </div>
            </div>
            <div className="hero-caption">
              <span>01 / معايير عالمية</span>
              <b>خامات معتمدة لمقاومة حرارة وشمس الخليج</b>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="section section-white" id="services">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow"><i /> ما نقدمه لعملائنا</span>
              <h2>حلول إعلانية متكاملة<br /><em>تحت سقف واحد.</em></h2>
            </div>
            <p>من اللوحة المضيئة الخارجية إلى الهدايا التذكارية والمطبوعات الإعلانية، نصنع لعلامتك حضورًا متناسقًا ومؤثرًا.</p>
          </div>

          <div className="service-grid reveal-on-scroll">
            {services.slice(0, 6).map((service, index) => {
              const Icon = icons[index % icons.length];
              return (
                <Link href={`/services/${service.slug}`} className="service-card group" key={service.id}>
                  <div className="service-card-top flex items-center justify-between">
                    <span className="icon-box"><Icon size={21} /></span>
                    <span className="card-number">0{index + 1}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="text-link mt-4 inline-flex items-center gap-1 text-gold group-hover:text-navy transition-colors">
                    تفاصيل الخدمة والمواصفات <ArrowLeft size={15} />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="center-link">
            <Link href="/services" className="button button-outline">
              استكشف كافة الخدمات والمواصفات التقنية <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Fast Quote Estimator Section */}
      <section className="section section-tint">
        <div className="container">
          <FastQuoteEstimator settings={settings} />
        </div>
      </section>

      {/* Manufacturing & Craftsmanship (Dark Luxury Section) */}
      <section className="section section-navy">
        <div className="container story-grid">
          <div className="story-art">
            <CoverImage
              src="/images/signage_cladding_workshop.jpg"
              alt="مصنع تصنيع اللوحات الإعلانية والكلادينج"
            />
            <div className="story-badge">
              <b>دقة تصنيع</b>
              <span>بتقنيات الليزر وCNC</span>
            </div>
          </div>

          <div className="story-copy">
            <span className="eyebrow eyebrow-gold">قوتنا التصنيعية</span>
            <h2>لا نعتمد على الوسطاء،<br />نمتلك <em>خطوط الإنتاج كاملة.</em></h2>
            <p>
              من مصانعنا المجهزة في الرياض، نتحكم في كل مرحلة من مراحل تصنيع واجهتك الإعلانية. نختار أجود سبائك الألومنيوم، وصفائح الأكريليك المقاومة للأشعة فوق البنفسجية، وشبكات الإنارة الكورية لضمان أداء يدوم لسنوات طويلة دون بهتان أو تلف.
            </p>

            <div className="factory-specs-grid my-6">
              <div className="spec-item">
                <CheckCircle2 size={16} className="text-gold" />
                <span>قص وثني ليزر دقيق بدون نتوءات</span>
              </div>
              <div className="spec-item">
                <CheckCircle2 size={16} className="text-gold" />
                <span>دهان حراري كهروساكن ثابت لا يتقشر</span>
              </div>
              <div className="spec-item">
                <CheckCircle2 size={16} className="text-gold" />
                <span>عزل مائي متكامل IP67 للإنارة والمحولات</span>
              </div>
              <div className="spec-item">
                <CheckCircle2 size={16} className="text-gold" />
                <span>فريق تركيب ميداني مجهز بروافع وسقالات أمان</span>
              </div>
            </div>

            <Link href="/about" className="button button-gold mt-2">
              <span>تعرف على مصنعنا وإمكانياتنا</span>
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="section section-white">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow"><i /> سابقة أعمال حديثة</span>
              <h2>أعمال نفخر بها،<br /><em>تتحدث عن جودتنا.</em></h2>
            </div>
            <Link href="/portfolio" className="text-link">
              استعراض كافة الأعمال والمشاريع <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="portfolio-grid-modern reveal-on-scroll">
            {featured.map((item) => (
              <Link href="/portfolio" className="modern-project-card group" key={item.id}>
                <div className="card-image-box">
                  <CoverImage src={item.imageUrl} alt={item.title} />
                  <div className="card-hover-overlay">
                    <span className="hover-view-btn">
                      <span>مشاهدة تفاصيل المشروع</span>
                      <ArrowLeft size={15} />
                    </span>
                  </div>
                </div>
                <div className="card-info-box">
                  <span className="card-category-tag">{item.category}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-heading centered-heading">
            <div>
              <span className="eyebrow">آراء شركاء النجاح</span>
              <h2>ثقة عملائنا هي <em>أكبر إنجازاتنا</em></h2>
            </div>
          </div>

          <div className="reviews-grid reveal-on-scroll">
            {clientReviews.map((review, i) => (
              <div className="review-card" key={i}>
                <div className="review-stars flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, rIdx) => (
                    <Star key={rIdx} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="review-text">«{review.text}»</p>
                <div className="review-author mt-4 pt-3 border-t border-gray-100">
                  <b>{review.name}</b>
                  <small className="block text-gray-500">{review.company}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-white">
        <div className="container max-w-4xl">
          <div className="section-heading centered-heading">
            <div>
              <span className="eyebrow">الأسئلة الشائعة</span>
              <h2>كل ما ترغب بمعرفته <em>عن خدماتنا وإجراءات العمل</em></h2>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <details className="faq-accordion-item" key={idx}>
                <summary className="faq-question">
                  <span>{faq.q}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">+</span>
                </summary>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Articles */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">أفكار وخبرات</span>
              <h2>من مدونتنا الإعلانية،<br /><em>إرشادات تفيدك في مشروعك.</em></h2>
            </div>
            <Link href="/blog" className="text-link">
              كل المقالات <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="post-grid reveal-on-scroll">
            {posts.slice(0, 3).map((post) => (
              <Link href={"/blog/" + post.slug} className="post-card group" key={post.id}>
                <div className="overflow-hidden rounded-sm">
                  <CoverImage src={post.imageUrl} alt={post.title} />
                </div>
                <span className="post-date">{formatDate(post.publishedAt || post.createdAt)}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="text-link group-hover:text-gold transition-colors">
                  اقرأ المقال بالكامل <ArrowLeft size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Final Band */}
      <section className="cta-band">
        <div className="container cta-content">
          <div>
            <span className="eyebrow eyebrow-gold">جاهز للانطلاق؟</span>
            <h2>لديك مشروع أو واجهة جديدة؟<br /><em>دعنا نحولها إلى علامة فارقة.</em></h2>
            <p className="text-white/80 max-w-lg mt-2 text-sm">
              اتصل بنا أو تواصل مباشرة عبر واتساب للحصول على استشارة هندسية ودراسة تسعيرية مجانية لمشروعك.
            </p>
          </div>
          <div className="cta-actions flex flex-wrap gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button button-gold">
              <MessageCircle size={18} />
              <span>محادثة واتساب مباشرة</span>
            </a>
            <Link href="/contact" className="button button-outline !border-white !text-white hover:!bg-white hover:!text-navy">
              <span>طلب عرض سعر رسمي</span>
              <ArrowLeft size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}