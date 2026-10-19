# دليل التشغيل الكامل من الهاتف (Vercel + Neon + Resend + Blob)

هذا الملف يساعدك على تشغيل الموقع بالكامل من الهاتف بدون جهاز محلي.

## 1) أنشئ قاعدة بيانات PostgreSQL حقيقية

استخدم أحد الخيارين:

- Neon: https://neon.tech
- Vercel Postgres داخل Vercel Dashboard

بعد إنشاء قاعدة البيانات انسخ `DATABASE_URL`.

مثال:

```env
DATABASE_URL=postgresql://username:password@ep-xxxxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## 2) أنشئ مشروع على Vercel

1. افتح https://vercel.com
2. اختر `Add New Project`
3. استورد هذا الريبو: `yunis-alafeef/halol_basrya`
4. استخدم إعدادات البناء الافتراضية
5. تأكد أن build command هو:

```bash
npm run build
```

## 3) أضف متغيرات البيئة في Vercel

اذهب إلى:
Project → Settings → Environment Variables

وأضف القيم التالية:

```env
DATABASE_URL=postgresql://username:password@host:5432/dbname?schema=public
SESSION_SECRET=ضع_سلسلة_عشوائية_طويلة_لا_قل_32_حرف
NEXT_PUBLIC_SITE_URL=https://اسم-الموقع.vercel.app
BLOB_READ_WRITE_TOKEN=
RESEND_API_KEY=
RESEND_FROM_EMAIL=contact@yourdomain.com
CONTACT_TO_EMAIL=info@yourdomain.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=StrongPassword123!
```

### ملاحظات هامة
- `SESSION_SECRET` يجب أن يكون طويلًا وأعشوائيًا.
- `ADMIN_USERNAME` و `ADMIN_PASSWORD` تستخدمان فقط لإنشاء أول مدير.
- لا تضع `.env` في GitHub.

## 4) استخدم GitHub Codespaces من الهاتف

إذا لا تملك جهازًا محليًا أو تريد كل شيء من المتصفح:

1. افتح هذا الريبو في GitHub
2. اضغط `Code`
3. اختر `Codespaces`
4. أنشئ Codespace جديد
5. بعد فتحه، استخدم terminal داخل المتصفح

## 5) شغّل Prisma داخل Codespace

في terminal داخل Codespace، نفّذ:

```bash
cp .env.example .env
```

ثم افتح ملف `.env` من editor داخل Codespace وعدّل القيم:

```env
DATABASE_URL=postgresql://username:password@host:5432/dbname?schema=public
SESSION_SECRET=your_long_random_session_secret_here
NEXT_PUBLIC_SITE_URL=https://your-vercel-app.vercel.app
BLOB_READ_WRITE_TOKEN=
RESEND_API_KEY=
RESEND_FROM_EMAIL=contact@yourdomain.com
CONTACT_TO_EMAIL=info@yourdomain.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=StrongPassword123!
```

ثم نفذ:

```bash
npm install
npx prisma generate
npx prisma db push
```

إذا كان المشروع يحتاج migrations:

```bash
npx prisma migrate deploy
```

## 6) أنشئ أول مدير

```bash
npm run admin:create
```

سيسألك عن:
- اسم المستخدم
- كلمة المرور

استخدم نفس القيم أو سجلها جيدًا.

## 7) ابدأ المشروع محليًا داخل Codespace

```bash
npm run dev
```

ثم افتح:

- http://localhost:3000/admin/login

## 8) إعداد Resend

1. افتح https://resend.com
2. أنشئ API Key جديد
3. أضف بريدًا تم التحقق عليه
4. ضع القيم في Vercel:

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=contact@yourdomain.com
CONTACT_TO_EMAIL=info@yourdomain.com
```

## 9) إعداد Vercel Blob (اختياري لكن مهم للصور)

إذا تريد رفع صور من لوحة الإدارة:

1. في Vercel Project → Storage
2. أنشئ Blob Store جديد
3. انسخ token
4. ضع في:

```env
BLOB_READ_WRITE_TOKEN=...
```

## 10) اختبار الموقع بعد النشر

اختبر هذه الروابط بعد deployment:

- الرئيسية
- `/admin/login`
- إنشاء خدمة أو مشروع أو مقال
- رفع صورة
- نموذج التواصل

## 11) إذا ظهرت مشكلة

في Vercel:

- Project → Deployments
- اختر آخر deployment
- Open Logs

محليًا داخل Codespace:

```bash
npm run build
```

أو:

```bash
npx prisma validate
```

## 12) الخلاصة

أفضل خطة من الهاتف هي:

1. انشئ قاعدة بيانات على Neon
2. استورد المشروع إلى Vercel
3. أضف المتغيرات في Vercel
4. استخدم GitHub Codespaces للتنفيذ
5. شغّل Prisma
6. أنشئ أول مدير
7. اختبر لوحة الإدارة
8. أضف Resend + Blob

هذا يضمن أن الموقع يعمل بشكل كامل من الهاتف دون جهاز محلي.
