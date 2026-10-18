"use client";

import { useState } from "react";
import { Calculator, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import type { SiteSettings } from "@/lib/settings";

interface FastQuoteEstimatorProps {
  settings: SiteSettings;
}

const serviceOptions = [
  { id: "channel-letters", name: "حروف بارزة مضيئة (3D)", baseRate: 450, unit: "حرف / متر طولي", desc: "أكريليك، زنكور، استيل ذهبي أو فضي مع LED كوري عالي الكفاءة" },
  { id: "cladding", name: "واجهات وتكسيات كلادينج", baseRate: 260, unit: "متر مربع", desc: "ألواح ألومنيوم معالجة ومقاومة للحريق والعوامل الجوية مع ضمان" },
  { id: "printing", name: "طباعة ديجيتال وبنر وفليكس", baseRate: 45, unit: "متر مربع", desc: "طباعة فائقة الدقة للملصقات والمعارض واللوحات الإعلانية" },
  { id: "stands", name: "استندات وحوامل معارض", baseRate: 350, unit: "قطعة", desc: "رول أب، بوب أب، طاولات ترويجية للمعارض والمؤتمرات" },
  { id: "awards", name: "دروع تكريمية وهدايا دعائية", baseRate: 120, unit: "قطعة", desc: "دروع كريستال وأكريليك وخشب مع حفر ليزر وعلب فاخرة" },
  { id: "project-boards", name: "لوحات مشاريع ومواقع إنشائية", baseRate: 180, unit: "متر مربع", desc: "لوحات أمان ولوحات تعريفية للمشاريع مع هياكل حديد متينة" }
];

const materialMultipliers: Record<string, { label: string; mult: number }> = {
  acrylic: { label: "أكريليك عالي النقاء مستورد", mult: 1.0 },
  zinc: { label: "زنكور مع دهان حراري كهروساكن", mult: 1.15 },
  steel: { label: "استيل ذهبي / فضي مقاوم للصدأ (304)", mult: 1.35 },
  composite: { label: "ألواح كلادينج معتمدة ومقاومة للحريق", mult: 1.1 }
};

const lightingOptions: Record<string, { label: string; add: number }> = {
  led_korean: { label: "إضاءة LED كوري Samsung أصلي مع محولات MeanWell", add: 80 },
  neon_flex: { label: "نيون فليكس بتأثير عصري وجذاب", add: 60 },
  none: { label: "بدون إضاءة (لوحة نهارية عادية)", add: 0 }
};

export function FastQuoteEstimator({ settings }: FastQuoteEstimatorProps) {
  const [selectedService, setSelectedService] = useState(serviceOptions[0].id);
  const [quantity, setQuantity] = useState(3);
  const [selectedMaterial, setSelectedMaterial] = useState("acrylic");
  const [selectedLighting, setSelectedLighting] = useState("led_korean");
  const [includeInstallation, setIncludeInstallation] = useState(true);

  const currentService = serviceOptions.find((s) => s.id === selectedService) || serviceOptions[0];
  const mat = materialMultipliers[selectedMaterial] || materialMultipliers.acrylic;
  const light = lightingOptions[selectedLighting] || lightingOptions.none;

  const basePricePerUnit = (currentService.baseRate * mat.mult) + light.add;
  const subtotal = basePricePerUnit * quantity;
  const installationFee = includeInstallation ? Math.max(250, subtotal * 0.15) : 0;
  const totalMin = Math.round((subtotal + installationFee) * 0.95);
  const totalMax = Math.round((subtotal + installationFee) * 1.15);

  const cleanWhatsapp = (settings.whatsapp || "").replace(/[^0-9]/g, "");
  const specsMessage = `طلب تسعير فوري من الموقع الإلكتروني:
- نوع الخدمة: ${currentService.name}
- الكمية / المقاس التقريبي: ${quantity} ${currentService.unit}
- نوع الخامة: ${mat.label}
- نوع الإضاءة: ${light.label}
- التوريد والتركيب: ${includeInstallation ? "شامل التوريد والتركيب الميداني" : "توريد فقط بدون تركيب"}
- التكلفة التقديرية: بين ${totalMin} و ${totalMax} ر.س تقريبًا
أرجو تزويدي بعرض السعر الرسمي وموعد المعاينة الميدانية.`;

  const whatsappHref = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(specsMessage)}`;

  return (
    <div className="quote-calculator-card" id="quote-calculator">
      <div className="calculator-header">
        <div className="calc-title-badge">
          <Calculator size={18} />
          <span>حاسبة التسعير التقديري الفوري</span>
        </div>
        <h3>احسب التكلفة المبدئية لمشروعك خلال لحظات</h3>
        <p>اختر نوع الخدمة والمواصفات المطلوبة لتحصل على تقدير فوري للتكلفة وإمكانية حجز المعاينة الميدانية.</p>
      </div>

      <div className="calculator-grid">
        {/* Left Inputs Column */}
        <div className="calculator-inputs">
          <div className="calc-field">
            <label className="calc-label">1. اختر الخدمة أو المنتج:</label>
            <div className="service-radio-grid">
              {serviceOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  className={`service-select-btn ${selectedService === opt.id ? "selected" : ""}`}
                  onClick={() => setSelectedService(opt.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="radio-dot" />
                    <b>{opt.name}</b>
                  </div>
                  <small>{opt.desc}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="calc-row-dual">
            <div className="calc-field">
              <label className="calc-label">2. الكمية أو المقاس ({currentService.unit}):</label>
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="qty-btn"
                  aria-label="إنقاص"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="qty-input"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="qty-btn"
                  aria-label="زيادة"
                >
                  +
                </button>
                <span className="qty-unit-label">{currentService.unit}</span>
              </div>
            </div>

            <div className="calc-field">
              <label className="calc-label">3. نوع الخامة المعتمدة:</label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="calc-select"
              >
                {Object.entries(materialMultipliers).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="calc-row-dual">
            <div className="calc-field">
              <label className="calc-label">4. نظام الإضاءة:</label>
              <select
                value={selectedLighting}
                onChange={(e) => setSelectedLighting(e.target.value)}
                className="calc-select"
              >
                {Object.entries(lightingOptions).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="calc-field flex-center-checkbox">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={includeInstallation}
                  onChange={(e) => setIncludeInstallation(e.target.checked)}
                />
                <span>شامل التوريد والمعاينة والتركيب الميداني بالضمان</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="calculator-result-panel">
          <div className="result-badge">
            <Sparkles size={14} /> تقدير تقريبي فوري
          </div>
          <span className="result-label">التكلفة التقديرية للمشروع:</span>
          <div className="result-price-wrap">
            <b className="result-price">
              {totalMin.toLocaleString("ar-SA")} - {totalMax.toLocaleString("ar-SA")}
            </b>
            <span className="result-currency">ريال سعودي</span>
          </div>
          <small className="result-notice">
            * هذا السعر تقريبي استرشادي بناءً على المواصفات المحددة، ويتم تأكيد السعر النهائي بدقة بعد المعاينة الهندسية المجانية للموقع واختيار التفاصيل الدقيقة.
          </small>

          <div className="result-specs-summary">
            <div className="spec-row">
              <span>الخدمة المحددة:</span>
              <b>{currentService.name}</b>
            </div>
            <div className="spec-row">
              <span>الخامة:</span>
              <b>{mat.label.split(" ")[0]}</b>
            </div>
            <div className="spec-row">
              <span>التركيب والضمان:</span>
              <b>{includeInstallation ? "شامل التركيب والضمان 3 سنوات" : "توريد فقط"}</b>
            </div>
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-gold result-cta-btn"
          >
            <MessageCircle size={18} />
            <span>طلب تسعيرة دقيقة عبر واتساب</span>
          </a>

          <div className="guarantees-strip">
            <div className="g-item">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>معاينة وتصميم مبدئي مجاني</span>
            </div>
            <div className="g-item">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>ضمان شامل على المحولات والـ LED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
