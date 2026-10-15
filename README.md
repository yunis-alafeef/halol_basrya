# حلول بصرية | Holol Basrya

موقع عربي متجاوب لوكالة متخصصة في الدعاية والإعلان واللوحات والطباعة والهدايا الدعائية. مبني بـ Next.js App Router وTypeScript وTailwind CSS وPrisma/PostgreSQL.

## الصفحات والميزات

- الصفحة الرئيسية، من نحن، الخدمات، معرض الأعمال، المدونة، وتواصل معنا.
- لوحة إدارة خاصة على /admin: تسجيل دخول آمن، إدارة الخدمات والمشاريع والمقالات، إدارة المستخدمين، ورفع الصور.
- جلسات JWT قصيرة العمر في Cookie من نوع HttpOnly وSameSite=Strict، تخزين كلمات المرور باستخدام bcrypt، والتحقق من صلاحية الحساب من قاعدة البيانات. لا يوجد تسجيل عام.
- الصور الجديدة تحفظ في Vercel Blob. تحسين الصور مفعّل عبر next/image.
- نموذج التواصل يرسل البريد عبر Resend.

## التشغيل محليًا

1. ثبّت Node.js 20 أو أحدث وPostgreSQL.
2. انسخ .env.example إلى .env وأضف DATABASE_URL وAUTH_SECRET عشوائيًا بطول 32 محرفًا على الأقل.
3. نفّذ npm install، ثم npx prisma generate، ثم npx prisma migrate deploy، ثم npm run db:seed.
4. أنشئ أول مدير: عيّن ADMIN_USERNAME وADMIN_PASSWORD (12 محرفًا على الأقل) في بيئة آمنة وشغّل npm run admin:create. لا تضع كلمة المرور في المستودع.
5. شغّل npm run dev وافتح /admin/login.

## البيئة الإنتاجية

أضف متغيرات البيئة في منصة الاستضافة: DATABASE_URL وAUTH_SECRET وBLOB_READ_WRITE_TOKEN وRESEND_API_KEY وRESEND_FROM_EMAIL (مرسل موثق في Resend) وCONTACT_TO_EMAIL. إعداد Blob والبريد اختياري كل على حدة؛ ميزتا رفع الصور وإرسال البريد تحتاجان القيم الخاصة بهما. تُحفظ تغييرات المخطط كملفات migration في prisma/migrations؛ أنشئها محليًا عبر prisma migrate dev، ثم احفظ ملفات prisma/migrations وشغّل prisma migrate deploy في الإنتاج. استخدم قاعدة PostgreSQL دائمة، ولا تعتمد على تخزين ملفات محلي في Vercel.

## Vercel والنشر التلقائي

ااربط هذا المستودع بمشروع Vercel من صفحة Vercel: Add New Project ثم Import Git Repository؛ هذا يفعّل النشر التلقائي عند تحديث main. يتضمن GitHub Actions فحص ESLint والبناء عند الدفع وطلبات الدمج. ويمكن بدلًا من اعتماد تكامل Git الخاص بـ Vercel استخدام خطوة النشر عبر CLI في سير العمل بإضافة أسرار المستودع VERCEL_TOKEN وVERCEL_ORG_ID وVERCEL_PROJECT_ID؛ تتخطى الخطوة نفسها إلى أن تتوفر القيم. لا تفعّل المسارين معًا كي لا تحصل على نشرين لكل تحديث. عيّن متغيرات التطبيق وقاعدة البيانات في Vercel لكل بيئة قبل الإطلاق. لم يتم ربط حساب Vercel أو إنشاء مشروع Vercel من هذا المستودع.

## أوامر مفيدة

- npm run dev — تشغيل التطوير
- npm run build — بناء الإنتاج
- npm run lint — فحص ESLint
- npm run db:push — مزامنة مخطط Prisma للتطوير فقط
- npm run db:migrate — تطبيق migrations المحفوظة
- npm run db:seed — إضافة محتوى تجريبي أولي
- npm run admin:create — إنشاء حساب مدير أولي بأمان

## ملاحظات أمنية

لا ترفع ملفات .env. احفظ الأسرار في متغيرات البيئة أو GitHub Actions Secrets. أنشئ كلمة مرور قوية وفريدة، واضبط AUTH_SECRET عشوائيًا. يحد التطبيق من أنواع الملفات وحجمها في رفع الصور. حماية محاولات الدخول داخل ذاكرة العملية مساعدة فقط؛ استخدم WAF أو خدمة تحديد معدل الطلبات لحماية أقوى في الإنتاج. بيانات المشاريع والمقالات في seed أمثلة قابلة للاستبدال من لوحة الإدارة.