"use client";

import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Palette,
  Layers,
  Briefcase,
  FileText,
  Users,
  Save,
  RotateCcw,
  Sparkles,
  Eye,
  Upload,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  LogOut,
  Plus,
  Trash2
} from "lucide-react";
import type { SiteSettings } from "@/lib/settings";

type Row = { id?: string; [key: string]: any };
type Field = { key: string; label: string; type?: "text" | "textarea" | "boolean" | "number" | "image"; wide?: boolean };

const fields: Record<string, Field[]> = {
  services: [
    { key: "title", label: "اسم الخدمة" },
    { key: "slug", label: "الرابط المختصر (slug)" },
    { key: "description", label: "الوصف التفصيلي للخدمة", type: "textarea", wide: true },
    { key: "imageUrl", label: "صورة الخدمة (رابط أو رفع)", type: "image", wide: true },
    { key: "featured", label: "إبراز الخدمة في الرئيسية", type: "boolean" },
    { key: "sortOrder", label: "ترتيب العرض (رقم)", type: "number" }
  ],
  projects: [
    { key: "title", label: "اسم العمل / المشروع" },
    { key: "slug", label: "الرابط المختصر (slug)" },
    { key: "category", label: "التصنيف (مثال: لوحات وحروف بارزة، طباعة، دروع)" },
    { key: "description", label: "وصف المشروع والمواصفات المنفذة", type: "textarea", wide: true },
    { key: "imageUrl", label: "صورة العمل (رابط أو رفع)", type: "image", wide: true },
    { key: "featured", label: "إظهار في المشاريع المميزة بالرئيسية", type: "boolean" }
  ],
  posts: [
    { key: "title", label: "عنوان المقال" },
    { key: "slug", label: "الرابط المختصر (slug)" },
    { key: "excerpt", label: "ملخص المقال للمعاينة", type: "textarea", wide: true },
    { key: "content", label: "المحتوى الكامل للمقال", type: "textarea", wide: true },
    { key: "imageUrl", label: "صورة المقال (رابط أو رفع)", type: "image", wide: true },
    { key: "published", label: "نشر المقال للزوار", type: "boolean" }
  ]
};

const labels: Record<string, string> = {
  settings: "الهوية والثيم والإعدادات",
  services: "الخدمات",
  projects: "معرض الأعمال",
  posts: "المقالات",
  users: "المستخدمون"
};

const blanks: Record<string, Row> = {
  services: { title: "", slug: "", description: "", imageUrl: "", featured: false, sortOrder: 0 },
  projects: { title: "", slug: "", category: "لوحات وحروف بارزة", description: "", imageUrl: "", featured: false },
  posts: { title: "", slug: "", excerpt: "", content: "", imageUrl: "", published: true }
};

export function AdminPanel({ name, username, role }: { name: string; username: string; role: string }) {
  const router = useRouter();
  const [section, setSection] = useState("settings");
  const [rows, setRows] = useState<Row[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (current: string) => {
    if (current === "users" || current === "settings") return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/" + current, { cache: "no-store" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "تعذر تحميل المحتوى.");
      setRows(body.data || []);
    } catch (e) {
      setMessage({ type: "error", text: e instanceof Error ? e.message : "تعذر تحميل المحتوى." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (section !== "users" && section !== "settings") {
      void load(section);
    }
  }, [section, load]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  function update(index: number, key: string, value: any) {
    setRows((current) => current.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  }

  async function save(row: Row) {
    setMessage(null);
    const data: Record<string, any> = {};
    for (const field of fields[section]) {
      data[field.key] = row[field.key] ?? (field.type === "boolean" ? false : field.type === "number" ? 0 : "");
    }
    try {
      const res = await fetch(row.id ? `/api/admin/${section}/${row.id}` : `/api/admin/${section}`, {
        method: row.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "تعذر الحفظ.");
      setMessage({ type: "success", text: "تم حفظ التغييرات بنجاح." });
      await load(section);
    } catch (e) {
      setMessage({ type: "error", text: e instanceof Error ? e.message : "تعذر الحفظ." });
    }
  }

  async function remove(row: Row) {
    if (!row.id || !window.confirm("هل تريد حذف هذا العنصر نهائيًا؟")) return;
    try {
      const res = await fetch(`/api/admin/${section}/${row.id}`, { method: "DELETE" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "تعذر الحذف.");
      setMessage({ type: "success", text: "تم حذف العنصر بنجاح." });
      await load(section);
    } catch (e) {
      setMessage({ type: "error", text: e instanceof Error ? e.message : "تعذر الحذف." });
    }
  }

  async function upload(event: ChangeEvent<HTMLInputElement>, index: number) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    setMessage({ type: "success", text: "جارٍ رفع الصورة المعالجة…" });
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "تعذر رفع الصورة.");
      update(index, "imageUrl", body.url);
      setMessage({ type: "success", text: "تم رفع الصورة بنجاح! احفظ العنصر لتثبيت التغيير." });
    } catch (e) {
      setMessage({ type: "error", text: e instanceof Error ? e.message : "تعذر رفع الصورة." });
    } finally {
      input.value = "";
    }
  }

  return (
    <div className="admin-shell">
      <div className="admin-wrap">
        {/* Top Header */}
        <header className="admin-header-modern">
          <div className="admin-brand-status">
            <h1>لوحة الإدارة والتحكم الشاملة</h1>
            <p>
              مرحبًا <b>{name}</b> ({username}) · الصلاحية:{" "}
              <span className="role-tag">{role === "admin" ? "مدير النظام" : "محرر محتوى"}</span>
            </p>
          </div>
          <div className="admin-actions">
            <Link className="button button-small button-outline flex items-center gap-1.5" href="/" target="_blank">
              <span>معاينة الموقع</span>
              <ExternalLink size={14} />
            </Link>
            <button className="button button-small button-gold flex items-center gap-1.5" onClick={logout}>
              <LogOut size={14} />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </header>

        {/* Section Navigation Tabs */}
        <div className="admin-tabs-modern">
          <button
            className={`admin-tab-btn ${section === "settings" ? "active" : ""}`}
            onClick={() => setSection("settings")}
          >
            <Palette size={16} />
            <span>الهوية والثيم والإعدادات</span>
          </button>
          <button
            className={`admin-tab-btn ${section === "services" ? "active" : ""}`}
            onClick={() => setSection("services")}
          >
            <Layers size={16} />
            <span>الخدمات ({section === "services" ? rows.length : "•"})</span>
          </button>
          <button
            className={`admin-tab-btn ${section === "projects" ? "active" : ""}`}
            onClick={() => setSection("projects")}
          >
            <Briefcase size={16} />
            <span>معرض الأعمال ({section === "projects" ? rows.length : "•"})</span>
          </button>
          <button
            className={`admin-tab-btn ${section === "posts" ? "active" : ""}`}
            onClick={() => setSection("posts")}
          >
            <FileText size={16} />
            <span>المقالات والمدونة</span>
          </button>
          {role === "admin" && (
            <button
              className={`admin-tab-btn ${section === "users" ? "active" : ""}`}
              onClick={() => setSection("users")}
            >
              <Users size={16} />
              <span>المستخدمون</span>
            </button>
          )}
        </div>

        {/* Feedback Message */}
        {message && (
          <div className={`admin-alert ${message.type === "success" ? "alert-success" : "alert-error"}`}>
            {message.type === "success" ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Section Content */}
        {section === "settings" ? (
          <ThemeSettingsManager onNotice={(msg) => setMessage(msg)} />
        ) : section === "users" ? (
          <UserManager />
        ) : (
          <>
            <div className="admin-toolbar">
              <h2>إدارة {labels[section]}</h2>
              <button
                className="button button-gold button-small flex items-center gap-1"
                onClick={() => setRows((current) => [blanks[section], ...current])}
              >
                <Plus size={16} />
                <span>إضافة عنصر جديد</span>
              </button>
            </div>

            {loading ? (
              <div className="admin-empty">جارٍ تحميل البيانات…</div>
            ) : rows.length === 0 ? (
              <div className="admin-empty">لا يوجد محتوى في هذا القسم بعد. اضغط «إضافة عنصر جديد» للبدء.</div>
            ) : (
              <div className="admin-list">
                {rows.map((row, index) => (
                  <article className="admin-item" key={row.id || "new-" + index}>
                    <div className="admin-item-grid">
                      {fields[section].map((field) => (
                        <label key={field.key} className={field.wide ? "wide" : ""}>
                          {field.label}
                          {field.type === "boolean" ? (
                            <span className="check-row">
                              <input
                                type="checkbox"
                                checked={!!row[field.key]}
                                onChange={(e) => update(index, field.key, e.target.checked)}
                              />
                              تفعيل / إبراز
                            </span>
                          ) : field.type === "textarea" ? (
                            <textarea
                              value={row[field.key] ?? ""}
                              onChange={(e) => update(index, field.key, e.target.value)}
                              rows={field.key === "content" ? 8 : 3}
                              maxLength={field.key === "content" ? 30000 : 5000}
                            />
                          ) : field.type === "image" ? (
                            <div className="upload-container">
                              <input
                                value={row[field.key] ?? ""}
                                onChange={(e) => update(index, field.key, e.target.value)}
                                placeholder="https://… أو ارفع ملف من جهازك"
                              />
                              <div className="upload-control">
                                <label className="upload-file-label">
                                  <Upload size={14} />
                                  <span>رفع صورة جديدة</span>
                                  <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                                    className="hidden-file-input"
                                    onChange={(e) => void upload(e, index)}
                                  />
                                </label>
                              </div>
                              {row[field.key] && (
                                <div className="img-preview-thumbnail">
                                  <img src={row[field.key]} alt="معاينة" />
                                </div>
                              )}
                            </div>
                          ) : (
                            <input
                              type={field.type === "number" ? "number" : "text"}
                              value={row[field.key] ?? ""}
                              onChange={(e) =>
                                update(
                                  index,
                                  field.key,
                                  field.type === "number" ? Number(e.target.value) : e.target.value
                                )
                              }
                              maxLength={field.type === "number" ? undefined : 160}
                            />
                          )}
                        </label>
                      ))}
                    </div>

                    <div className="admin-item-actions">
                      <button className="button button-gold button-small flex items-center gap-1" onClick={() => void save(row)}>
                        <Save size={14} />
                        <span>حفظ التعديلات</span>
                      </button>
                      {row.id && (
                        <button className="button button-small button-outline text-rose-600 border-rose-300 hover:bg-rose-50 flex items-center gap-1" onClick={() => void remove(row)}>
                          <Trash2 size={14} />
                          <span>حذف نهائي</span>
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Visual Theme & Brand Settings Customizer Component
function ThemeSettingsManager({ onNotice }: { onNotice: (n: { type: "success" | "error"; text: string }) => void }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setSettings(data.data);
      })
      .catch(() => {
        onNotice({ type: "error", text: "تعذر تحميل إعدادات الهوية." });
      })
      .finally(() => setLoading(false));
  }, [onNotice]);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "تعذر حفظ الإعدادات.");

      // Apply dynamic CSS variables on documentElement immediately
      document.documentElement.style.setProperty("--navy", settings.primaryColor);
      document.documentElement.style.setProperty("--gold", settings.secondaryColor);
      document.documentElement.style.setProperty("--gold-accent", settings.accentColor);

      onNotice({ type: "success", text: "تم حفظ إعدادات الهوية والثيم بنجاح وتطبيقها فورًا على الموقع!" });
    } catch (e) {
      onNotice({ type: "error", text: e instanceof Error ? e.message : "تعذر حفظ الإعدادات." });
    } finally {
      setSaving(false);
    }
  }

  async function handleResetDefaults() {
    if (!window.confirm("هل أنت متأكد من رغبتك في استعادة الألوان والإعدادات الافتراضية للنظام؟")) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset: true })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "تعذر استعادة الإعدادات.");
      setSettings(data.data);
      document.documentElement.style.setProperty("--navy", data.data.primaryColor);
      document.documentElement.style.setProperty("--gold", data.data.secondaryColor);
      onNotice({ type: "success", text: "تمت استعادة الألوان والإعدادات الافتراضية بنجاح." });
    } catch (e) {
      onNotice({ type: "error", text: e instanceof Error ? e.message : "تعذر استعادة الإعدادات." });
    } finally {
      setSaving(false);
    }
  }

  async function uploadLogo(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "تعذر رفع الشعار.");
      setSettings((s) => (s ? { ...s, logoUrl: body.url } : s));
      onNotice({ type: "success", text: "تم رفع الشعار بنجاح! اضغط 'حفظ ونشر التغييرات' لاعتماده." });
    } catch (err) {
      onNotice({ type: "error", text: err instanceof Error ? err.message : "تعذر رفع الشعار." });
    } finally {
      e.target.value = "";
    }
  }

  if (loading || !settings) {
    return <div className="admin-empty">جارٍ تحميل إعدادات الهوية والثيم…</div>;
  }

  return (
    <div className="theme-settings-container">
      {/* Live Visual Preview Card */}
      <div className="theme-live-preview-box">
        <div className="preview-top-bar">
          <span className="flex items-center gap-1.5 font-bold text-navy">
            <Eye size={16} />
            <span>معاينة حية فورية للثيم والألوان المختارة (Live Preview)</span>
          </span>
          <span className="text-xs text-gray-500">التغييرات تظهر في الوقت الفعلي</span>
        </div>

        <div
          className="preview-demo-card"
          style={{
            backgroundColor: settings.primaryColor,
            fontFamily: settings.fontFamily
          }}
        >
          <div className="demo-header flex justify-between items-center text-white pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: settings.secondaryColor }}
              />
              <b>{settings.brandShortName || "اسم المنشأة"}</b>
            </div>
            <span
              className="text-xs px-2.5 py-1 rounded font-bold"
              style={{ backgroundColor: settings.secondaryColor, color: settings.primaryColor }}
            >
              عرض سعر فوري
            </span>
          </div>

          <div className="demo-content py-4 text-white">
            <h4 className="text-lg font-bold" style={{ color: settings.secondaryColor }}>
              {settings.brandName || "العنوان الرئيسي المعتمد"}
            </h4>
            <p className="text-xs text-white/80 mt-1">{settings.tagline}</p>
          </div>

          <div className="demo-footer flex justify-between items-center text-xs text-white/70 pt-2 border-t border-white/10">
            <span>هاتف: {settings.phone}</span>
            <span>الرياض، المملكة العربية السعودية</span>
          </div>
        </div>
      </div>

      {/* Main Settings Form Grid */}
      <div className="settings-form-sections">
        {/* Brand Identity */}
        <section className="settings-section-card">
          <div className="section-title-wrap">
            <Sparkles size={18} className="text-gold" />
            <h3>1. هوية المنشأة والشعار (Brand Identity)</h3>
          </div>

          <div className="settings-grid-dual">
            <label>
              اسم المنشأة الكامل (Official Brand Name)
              <input
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                placeholder="مثال: حلول بصير للدعاية والإعلان"
              />
            </label>

            <label>
              الاسم المختصر (Short Name)
              <input
                value={settings.brandShortName}
                onChange={(e) => setSettings({ ...settings, brandShortName: e.target.value })}
                placeholder="مثال: حلول بصير"
              />
            </label>
          </div>

          <label className="mt-3 block">
            الشعار اللفظي أو الوصف التعريفي (Slogan / Tagline)
            <input
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              placeholder="مثال: نصنع حضورًا بصريًا استثنائيًا يُميز علامتك"
            />
          </label>

          <div className="mt-3">
            <label>شعار المنشأة (Logo Image):</label>
            <div className="flex gap-2 items-center mt-1">
              <input
                value={settings.logoUrl}
                onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                placeholder="https://... أو ارفع صورة الشعار من جهازك"
                className="flex-1"
              />
              <label className="button button-small button-outline cursor-pointer flex items-center gap-1.5 shrink-0">
                <Upload size={14} />
                <span>رفع شعار</span>
                <input type="file" accept="image/*" className="hidden" onChange={uploadLogo} />
              </label>
            </div>
            {settings.logoUrl && (
              <div className="mt-2 p-2 bg-gray-50 border rounded inline-block">
                <img src={settings.logoUrl} alt="شعار المنشأة" className="h-10 w-auto object-contain" />
              </div>
            )}
          </div>
        </section>

        {/* Visual Theme & Colors */}
        <section className="settings-section-card">
          <div className="section-title-wrap">
            <Palette size={18} className="text-gold" />
            <h3>2. تخصيص الثيم والألوان والخطوط (Visual Theme Engine)</h3>
          </div>

          <div className="color-pickers-row">
            <div className="color-field-box">
              <label>اللون الرئيسي للواجهات (Primary Color):</label>
              <div className="color-input-group">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="color-swatch-picker"
                />
                <input
                  type="text"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="color-hex-text"
                />
              </div>
              <small>اللون الكحلي الداكن أو لون الهوية الأساسي للخلفيات والأزرار.</small>
            </div>

            <div className="color-field-box">
              <label>اللون الذهبي الثانوي (Accent Gold):</label>
              <div className="color-input-group">
                <input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  className="color-swatch-picker"
                />
                <input
                  type="text"
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  className="color-hex-text"
                />
              </div>
              <small>اللون المميز للأيقونات والأزرار التفاعلية والهايلايت.</small>
            </div>

            <div className="color-field-box">
              <label>الخط العربي المعتمد (Typography):</label>
              <select
                value={settings.fontFamily}
                onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
                className="font-select-input"
              >
                <option value="Cairo">خط القاهرة الحديث (Cairo - الافتراضي والأجمل)</option>
                <option value="Tajawal">خط تجوال العصري (Tajawal)</option>
                <option value="IBM Plex Sans Arabic">خط آي بي إم الاحترافي (IBM Plex)</option>
                <option value="Noto Sans Arabic">خط نوتو العربي (Noto Sans)</option>
              </select>
              <small>يطبق على كافة العناوين والنصوص والأزرار في الموقع.</small>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="settings-section-card">
          <div className="section-title-wrap">
            <CheckCircle2 size={18} className="text-gold" />
            <h3>3. بيانات الاتصال وروابط التواصل (Contact & Social)</h3>
          </div>

          <div className="settings-grid-dual">
            <label>
              رقم الهاتف المباشر
              <input
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+966 50 123 4567"
              />
            </label>

            <label>
              رقم الواتساب لاستقبال الطلبات (مع الرمز الدولي بدون +)
              <input
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                placeholder="966501234567"
              />
            </label>
          </div>

          <div className="settings-grid-dual mt-3">
            <label>
              البريد الإلكتروني الرسمي
              <input
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="info@halol-basrya.com"
              />
            </label>

            <label>
              أوقات وساعات العمل
              <input
                value={settings.workingHours}
                onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                placeholder="السبت - الخميس: 9:00 ص - 10:00 م"
              />
            </label>
          </div>

          <div className="settings-grid-dual mt-3">
            <label>
              عنوان المقر الرئيسي / المعرض
              <input
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="المملكة العربية السعودية، الرياض، حي الملز"
              />
            </label>

            <label>
              رقم السجل التجاري / الرقم الضريبي
              <input
                value={settings.commercialRecord}
                onChange={(e) => setSettings({ ...settings, commercialRecord: e.target.value })}
                placeholder="سجل تجاري معتمد: 1010XXXXXX"
              />
            </label>
          </div>

          <div className="social-inputs-grid mt-4 pt-3 border-t">
            <label>
              حساب منصة إكس (Twitter/X)
              <input
                value={settings.socialTwitter}
                onChange={(e) => setSettings({ ...settings, socialTwitter: e.target.value })}
                placeholder="https://x.com/..."
              />
            </label>
            <label>
              حساب إنستغرام
              <input
                value={settings.socialInstagram}
                onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })}
                placeholder="https://instagram.com/..."
              />
            </label>
            <label>
              حساب تيك توك
              <input
                value={settings.socialTiktok}
                onChange={(e) => setSettings({ ...settings, socialTiktok: e.target.value })}
                placeholder="https://tiktok.com/@..."
              />
            </label>
            <label>
              حساب لينكد إن
              <input
                value={settings.socialLinkedin}
                onChange={(e) => setSettings({ ...settings, socialLinkedin: e.target.value })}
                placeholder="https://linkedin.com/company/..."
              />
            </label>
          </div>
        </section>

        {/* Announcement Bar & SEO */}
        <section className="settings-section-card">
          <div className="section-title-wrap">
            <Sparkles size={18} className="text-gold" />
            <h3>4. شريط الإعلانات العلوي وتحسين محركات البحث (SEO & Bar)</h3>
          </div>

          <div className="announcement-controls mb-4">
            <label className="checkbox-container font-bold mb-2">
              <input
                type="checkbox"
                checked={settings.announcementEnabled}
                onChange={(e) => setSettings({ ...settings, announcementEnabled: e.target.checked })}
              />
              <span>تفعيل شريط التنبيهات الإعلاني في أعلى كل صفحات الموقع</span>
            </label>

            <input
              value={settings.announcementText}
              onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
              placeholder="نص الإشعار الترويجي (مثال: خصم خاص 15% على واجهات الكلادينج والحروف البارزة...)"
              disabled={!settings.announcementEnabled}
            />
          </div>

          <div className="settings-grid-dual mt-4 pt-4 border-t">
            <label>
              عنوان الصفحة الرئيسية في جوجل (SEO Title)
              <input
                value={settings.seoTitle}
                onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
              />
            </label>

            <label>
              الكلمات المفتاحية (Keywords مفصولة بفواصل)
              <input
                value={settings.seoKeywords}
                onChange={(e) => setSettings({ ...settings, seoKeywords: e.target.value })}
              />
            </label>
          </div>

          <label className="mt-3 block">
            الوصف التعريفي لمحركات البحث (Meta Description)
            <textarea
              value={settings.seoDescription}
              onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
              rows={3}
            />
          </label>
        </section>
      </div>

      {/* Floating Save Toolbar */}
      <div className="settings-save-toolbar">
        <button
          type="button"
          className="button button-gold flex items-center gap-2"
          onClick={handleSave}
          disabled={saving}
        >
          <Save size={18} />
          <span>{saving ? "جارٍ الحفظ والتطبيق…" : "حفظ ونشر التغييرات على الموقع"}</span>
        </button>

        <button
          type="button"
          className="button button-outline flex items-center gap-2"
          onClick={handleResetDefaults}
          disabled={saving}
        >
          <RotateCcw size={16} />
          <span>استعادة الألوان الافتراضية</span>
        </button>
      </div>
    </div>
  );
}

// User accounts manager component
function UserManager() {
  const [users, setUsers] = useState<Row[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ username: "", name: "", password: "", role: "editor" });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "تعذر تحميل المستخدمين.");
      setUsers(body.data || []);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "تعذر تحميل المستخدمين.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function create() {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "تعذر إنشاء المستخدم.");
      setNewUser({ username: "", name: "", password: "", role: "editor" });
      setMessage("تم إنشاء المستخدم بنجاح.");
      await load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "تعذر إنشاء المستخدم.");
    }
  }

  async function save(user: Row) {
    try {
      const res = await fetch("/api/admin/users/" + user.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          name: user.name,
          role: user.role,
          password: user.password || ""
        })
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "تعذر تحديث المستخدم.");
      setMessage("تم تحديث المستخدم بنجاح.");
      await load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "تعذر تحديث المستخدم.");
    }
  }

  async function remove(user: Row) {
    if (!window.confirm("حذف المستخدم " + user.username + "؟")) return;
    try {
      const res = await fetch("/api/admin/users/" + user.id, { method: "DELETE" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "تعذر الحذف.");
      setMessage("تم حذف المستخدم بنجاح.");
      await load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "تعذر الحذف.");
    }
  }

  return (
    <div>
      <div className="admin-toolbar">
        <h2>إدارة المستخدمين والمشرفين</h2>
      </div>
      {message && <div className="admin-message" role="status">{message}</div>}

      <div className="admin-create">
        <h3>+ إضافة مستخدم جديد</h3>
        <div className="admin-create-grid">
          <label>
            اسم المستخدم للدخول
            <input value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
          </label>
          <label>
            الاسم الظاهر
            <input value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          </label>
          <label>
            كلمة المرور (12 محرفًا على الأقل)
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
          </label>
          <label>
            الصلاحية
            <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
              <option value="editor">محرر محتوى (تعديل الخدمات والمشاريع)</option>
              <option value="admin">مدير كامل الصلاحيات</option>
            </select>
          </label>
        </div>
        <button className="button button-gold button-small mt-3" onClick={() => void create()}>
          إنشاء المستخدم
        </button>
      </div>

      {loading ? (
        <div className="admin-empty">جارٍ التحميل…</div>
      ) : (
        users.map((user) => (
          <div className="user-row" key={user.id}>
            <label>
              اسم المستخدم
              <input
                value={user.username}
                onChange={(e) =>
                  setUsers((items) =>
                    items.map((item) => (item.id === user.id ? { ...item, username: e.target.value } : item))
                  )
                }
              />
            </label>
            <label>
              الاسم
              <input
                value={user.name}
                onChange={(e) =>
                  setUsers((items) =>
                    items.map((item) => (item.id === user.id ? { ...item, name: e.target.value } : item))
                  )
                }
              />
            </label>
            <label>
              الصلاحية
              <select
                value={user.role}
                onChange={(e) =>
                  setUsers((items) =>
                    items.map((item) => (item.id === user.id ? { ...item, role: e.target.value } : item))
                  )
                }
              >
                <option value="editor">محرر</option>
                <option value="admin">مدير</option>
              </select>
            </label>
            <label>
              كلمة مرور جديدة (اختياري)
              <input
                type="password"
                value={user.password || ""}
                onChange={(e) =>
                  setUsers((items) =>
                    items.map((item) => (item.id === user.id ? { ...item, password: e.target.value } : item))
                  )
                }
                placeholder="اتركه فارغًا للإبقاء عليها"
              />
            </label>
            <div className="flex gap-2">
              <button className="button button-gold button-small" onClick={() => void save(user)}>
                حفظ
              </button>
              <button className="button button-small button-outline text-rose-600 border-rose-300" onClick={() => void remove(user)}>
                حذف
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}