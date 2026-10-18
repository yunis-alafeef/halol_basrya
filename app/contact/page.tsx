import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "تواصل معنا | طلب معاينة وعرض سعر فوري",
  description: "تواصل مع فريق مبيعات ومشاريع حلول بصير في الرياض. نوفر لك معاينات ميدانية واستشارات إعلانية متخصصة وتصاميم ثلاثية الأبعاد."
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const cleanWhatsapp = (settings.whatsapp || "").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("مرحبًا، أود حجز موعد معاينة ميدانية لمشروعي الإعلاني.")}`;

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow"><i /> قنوات تواصل مفتوحة ومباشرة</span>
          <h1>
            فكرتك تستحق<br />
            <em>بداية هندسية موثوقة.</em>
          </h1>
          <p>
            سواء كنت تخطط لافتتاح متجر جديد، أو تجديد واجهة فرعك، أو إطلاق حملة مطبوعات ضخمة — فريقنا الفني والاستشاري جاهز لخدمتك على مدار الأسبوع.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section section-tint">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="eyebrow">يسعدنا خدمتك دائمًا</span>
            <h2>تحدث مباشرة<br /><em>مع فريق المشاريع.</em></h2>
            <p>
              نستقبل اتصالاتكم وزياراتكم في معرضنا، كما نوفر خدمة المعاينة الميدانية السريعة داخل الرياض ومختلف مناطق المملكة.
            </p>

            <div className="contact-methods-list mt-8">
              <a href={`tel:${settings.phone}`} className="contact-method-card">
                <span className="icon-box"><Phone size={20} /></span>
                <div>
                  <small>الاتصال الهاتفي المباشر</small>
                  <b>{settings.phone}</b>
                </div>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method-card whatsapp-highlight"
              >
                <span className="icon-box whatsapp-box"><MessageCircle size={20} /></span>
                <div>
                  <small>محادثة واتساب الفورية (أسرع استجابة)</small>
                  <b>{settings.whatsapp}</b>
                </div>
              </a>

              <a href={`mailto:${settings.email}`} className="contact-method-card">
                <span className="icon-box"><Mail size={20} /></span>
                <div>
                  <small>البريد الإلكتروني الرسمي</small>
                  <b>{settings.email}</b>
                </div>
              </a>

              <div className="contact-method-card">
                <span className="icon-box"><MapPin size={20} /></span>
                <div>
                  <small>المعرض والورشة الرئيسية</small>
                  <b>{settings.address}</b>
                </div>
              </div>

              <div className="contact-method-card">
                <span className="icon-box"><Clock size={20} /></span>
                <div>
                  <small>أوقات العمل الرسمية</small>
                  <b>{settings.workingHours}</b>
                </div>
              </div>
            </div>

            {/* Reassurance badge */}
            <div className="contact-reassurance-box mt-6">
              <ShieldCheck size={20} className="text-gold shrink-0" />
              <div>
                <b>معاينة مجانية بدون أي التزام</b>
                <p>فريقنا يزور موقعك، يقيس المساحة، ويقدم لك دراسة هندسية وتصميمًا أوليًا قبل اعتماد العقد.</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map & Location Section */}
      <section className="section section-white">
        <div className="container">
          <div className="section-heading centered-heading">
            <div>
              <span className="eyebrow">موقعنا في الرياض</span>
              <h2>مرحبًا بك في <em>معرضنا ومصنعنا</em></h2>
            </div>
          </div>

          <div className="showroom-location-card">
            <div className="location-info-bar">
              <div className="flex items-center gap-3">
                <span className="icon-box"><MapPin size={22} /></span>
                <div>
                  <b>معرض {settings.brandName}</b>
                  <p className="text-sm text-gray-500">{settings.address}</p>
                </div>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-gold button-small"
              >
                فتح الموقع عبر خرائط Google ↗
              </a>
            </div>

            <div className="map-placeholder-box">
              <div className="map-overlay-content">
                <MapPin size={36} className="text-gold mx-auto mb-2 animate-bounce" />
                <b>حي الملز — قلب العاصمة الرياض</b>
                <p>سهولة الوصول، مواقف متوفرة، ومستشارونا جاهزون لاستعراض العينات والخامات أمامك مباشرة.</p>
                <div className="flex justify-center gap-4 mt-3 text-xs text-gray-600">
                  <span>✦ عينات أكريليك وزنكور طبيعية</span>
                  <span>✦ تجربة أنظمة الإنارة LED</span>
                  <span>✦ نماذج واجهات كلادينج حقيقية</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}