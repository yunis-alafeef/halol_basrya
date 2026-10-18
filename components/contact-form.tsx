"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, AlertCircle, Send, Sparkles } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus(null);
    setBusy(true);

    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "تعذر إرسال الرسالة.");

      setStatus({
        type: "success",
        text: "تم إرسال طلبك بنجاح! سيقوم مهندسونا بالتواصل معك عبر الهاتف أو الواتساب خلال ساعات العمل لمناقشة التفاصيل وترتيب المعاينة."
      });
      formElement.reset();
    } catch (error) {
      setStatus({
        type: "error",
        text: error instanceof Error ? error.message : "تعذر إرسال الطلب حاليًا، يرجى المحاولة لاحقًا أو التواصل هاتفيًا."
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="contact-form-modern" onSubmit={submit}>
      <div className="form-header-badge">
        <Sparkles size={14} className="text-gold" />
        <span>طلب استشارة أو تسعيرة معتمدة</span>
      </div>
      <h2>ابدأ مشروعك اليوم معنا</h2>
      <p>املأ النموذج أدناه وسيقوم فريق المبيعات والمشاريع بالتواصل معك فورًا.</p>

      {status && (
        <div
          className={`form-alert-box ${status.type === "success" ? "alert-success" : "alert-error"}`}
          role="alert"
        >
          {status.type === "success" ? (
            <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle size={18} className="shrink-0 text-rose-600" />
          )}
          <span>{status.text}</span>
        </div>
      )}

      <div className="form-row-grid">
        <label>
          الاسم الكريم *
          <input
            name="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="الاسم الثلاثي أو اسم المنشأة"
          />
        </label>

        <label>
          رقم الجوال أو الواتساب *
          <input
            name="phone"
            type="tel"
            required
            maxLength={40}
            placeholder="05xxxxxxxx"
            dir="ltr"
            className="text-right"
          />
        </label>
      </div>

      <div className="form-row-grid">
        <label>
          البريد الإلكتروني *
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            placeholder="name@company.com"
          />
        </label>

        <label>
          نوع الخدمة المطلوبة *
          <select name="subject" required className="form-select-input">
            <option value="لوحات وحروف بارزة مضيئة">لوحات وحروف بارزة مضيئة (3D)</option>
            <option value="واجهات وتكسيات كلادينج">واجهات وتكسيات كلادينج</option>
            <option value="طباعة بنرات واستيكرات ومعارض">طباعة رقمية وبنرات واستيكرات</option>
            <option value="دروع تكريمية وهدايا دعائية">دروع تكريمية وهدايا دعائية</option>
            <option value="استندات وأجنحة معارض">استندات وأجنحة معارض</option>
            <option value="أختام رسمية وتجارية">أختام رسمية وتجارية</option>
            <option value="طلب معاينة ميدانية لموقع">طلب معاينة ميدانية لموقع</option>
            <option value="استفسار عام آخر">استفسار عام آخر</option>
          </select>
        </label>
      </div>

      <label>
        تفاصيل المشروع والمقاسات التقريبية *
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          placeholder="اذكر موقع المشروع، المقاسات التقريبية، رغبتك بنوع الإضاءة أو أية تفاصيل تفيدنا في تقديم التسعير الدقيق..."
        />
      </label>

      {/* Honeypot anti-spam field */}
      <input
        name="website"
        className="honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <button type="submit" className="button button-gold w-full mt-3" disabled={busy}>
        {busy ? (
          <span>جارٍ إرسال الطلب…</span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Send size={16} />
            <span>إرسال طلب التسعيرة والمعاينة</span>
          </span>
        )}
      </button>

      <div className="form-footer-notes mt-4">
        <small className="text-gray-500 block">
          * نلتزم بسرية وخصوصية بياناتك ولن يتم استخدامها إلا لغرض التواصل بخصوص مشروعك.
        </small>
      </div>
    </form>
  );
}