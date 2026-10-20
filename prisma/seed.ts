import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

function resolveDatabaseUrl(): string {
  if (process.env.SQL_HOST && process.env.SQL_USER && process.env.SQL_DB_NAME) {
    const user = process.env.SQL_USER;
    const password = encodeURIComponent(process.env.SQL_PASSWORD || "");
    const dbName = process.env.SQL_DB_NAME;
    const host = encodeURIComponent(process.env.SQL_HOST);
    return `postgresql://${user}:${password}@localhost/${dbName}?host=${host}`;
  }
  return process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/halol_basrya";
}

const db = new PrismaClient({
  datasources: {
    db: { url: resolveDatabaseUrl() }
  }
});

const services = [
  {
    title: "اللوحات والحروف البارزة",
    slug: "signage",
    imageUrl: "/images/hero_commercial_signage.jpg",
    description: "تصنيع حروف بارزة مضيئة (أكريليك، زنكور، ستانلس ستيل) وشاشات ليد بأعلى معايير كود البناء السعودي مع ضمان معتمد حتى 5 سنوات.",
    sortOrder: 1,
    featured: true
  },
  {
    title: "الطباعة بمختلف أنواعها",
    slug: "printing",
    imageUrl: "/images/digital_printing_facility.jpg",
    description: "مطابع رقمية يابانية وأوفست لإنتاج البنرات، الفليكس، الاستيكرات، البروشورات، والكتالوجات بألوان مطابقة لكود Pantone ومقاومة لأشعة الشمس.",
    sortOrder: 2,
    featured: true
  },
  {
    title: "الدروع التكريمية والتذكارية",
    slug: "awards",
    imageUrl: "/images/luxury_awards_gifts.jpg",
    description: "تصميم وتنفيذ أفخم الدروع التذكارية من الكريستال النقي، الخشب الطبيعي، والأكريليك الشفاف المحفور بالليزر للمناسبات الرسمية والتكريم.",
    sortOrder: 3,
    featured: true
  },
  {
    title: "الهدايا الدعائية والترويجية",
    slug: "promotional-gifts",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    description: "باقات هدايا فاخرة تحمل هوية علامتك وتمنحك حضورًا استثنائيًا لدى شركائك وعملائك، من الأقلام والمفكرات إلى الأجهزة الذكية والأطقم الترويجية.",
    sortOrder: 4,
    featured: true
  },
  {
    title: "الأختام الرسمية والتجارية",
    slug: "stamps",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    description: "أختام كريستال وأوتوماتيكية سريعة بجميع المقاسات والأشكال، بدقة نقش متناهية بالليزر تدوم لآلاف الطبعات الواضحة والمنضبطة.",
    sortOrder: 5,
    featured: false
  },
  {
    title: "الاستندات وحوامل المعارض",
    slug: "display-stands",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    description: "رول اب، بوب اب، كاونترات استقبال، واستندات مخصصة للمعارض والمؤتمرات والفعاليات سهلة الحمل والتركيب وذات مظهر احترافي فخم.",
    sortOrder: 6,
    featured: true
  },
  {
    title: "لوحات المشاريع والمواقع",
    slug: "project-boards",
    imageUrl: "/images/signage_cladding_workshop.jpg",
    description: "لوحات تعريفية وإرشادية ضخمة للمواقع الإنشائية والمشاريع الحكومية والخاصة بهياكل تيوبات مجلفنة مقاومة للرياح والعواصف الترابية.",
    sortOrder: 7,
    featured: false
  },
  {
    title: "واجهات الكلادينج والهياكل الإعلانية",
    slug: "cladding-facades",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "تكسية واجهات المباني والمتاجر بألواح الألمنيوم (الكلادينج) المقاومة للحريق بتشكيلات عصرية وتشطيبات هندسية دقيقة.",
    sortOrder: 8,
    featured: true
  }
];

const projects = [
  {
    title: "واجهة تجارية بهوية معاصرة - برج الملز",
    slug: "modern-storefront-malaz",
    category: "لوحات وحروف بارزة",
    description: "تنفيذ واجهة متكاملة بحروف ثلاثية الأبعاد بارزة مع إضاءة ليد كورية سامسونج وتكسيات كلادينج فاخرة مقاومة للحرارة.",
    imageUrl: "/images/hero_commercial_signage.jpg",
    featured: true
  },
  {
    title: "هوية وتجهيز جناح معرض الرياض الدولي",
    slug: "riyadh-expo-pavilion",
    category: "استندات وفعاليات",
    description: "تصميم وإنتاج كامل لجناح المعرض متضمناً منصات العرض، الإضاءات، الاستندات وبوسترات المطبوعات عالية الدقة.",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85",
    featured: true
  },
  {
    title: "حملة مطبوعات وهوية شركة الأفق القابضة",
    slug: "alofoq-corporate-print",
    category: "طباعة",
    description: "طباعة رقمية وأوفست لأكثر من 50 ألف مادة دعائية وتسويقية وبطاقات أعمال فاخرة بورق قطني وتشطيب سبوت يو في.",
    imageUrl: "/images/digital_printing_facility.jpg",
    featured: true
  },
  {
    title: "دروع تكريمية سنوية - مجموعة السبيعي",
    slug: "subaie-luxury-trophies",
    category: "دروع وهدايا",
    description: "تصنيع 120 درعًا كريستاليًا محفورًا بتقنية الليزر ثلاثي الأبعاد مع قواعد من الخشب الملكي وعلب قطيفة فاخرة.",
    imageUrl: "/images/luxury_awards_gifts.jpg",
    featured: true
  },
  {
    title: "واجهة كلادينج وحروف زنكور - كافيه أروما",
    slug: "aroma-cafe-signage",
    category: "لوحات وحروف بارزة",
    description: "تجهيز واجهة فرع جديد بنظام إنارة خلفية هالو وحروف زنكور مطفية وتشطيب ألمنيوم معزول ضد الرطوبة.",
    imageUrl: "/images/signage_cladding_workshop.jpg",
    featured: false
  }
];

const posts = [
  {
    title: "كيف تختار اللوحة المناسبة لواجهة مشروعك التجاري؟",
    slug: "choose-the-right-sign",
    excerpt: "عوامل هندسية وتسويقية تساعدك في اختيار نوع الحروف، الخامات، وزوايا الإضاءة بما يتوافق مع اشتراطات البلدية والدفاع المدني.",
    content: `الموقع وزاوية الرؤية هما العامل الأهم في تحديد حجم اللوحة وبروز الحروف. عندما تكون واجهتك على طريق سريع، ستحتاج إلى ارتفاع أحرف لا يقل عن 50 سم وإضاءة أمامية ساطعة لضمان القراءة بوضوح من مسافة لا تقل عن 100 متر.

ثانيًا، اختيار خامة الحرف:
1. حروف الأكريليك (Acrylic): ممتازة لنفاذية الضوء بألوان نقية ومناسبة للمطاعم والمتاجر الحديثة.
2. حروف الزنكور (Zinc/Metal): صلبة للغاية وتتحمل درجات الحرارة المرتفعة، ويفضل معها الإضاءة الخلفية الهادئة (Halo Effect).
3. حروف الستانلس ستيل (Stainless Steel): الفخامة المطلقة للشركات، البنوك، والمكاتب الاستشارية بلمسات ذهبية أو فضية مصقولة.

تأكد دائمًا من فحص محولات الكهرباء (Power Supplies) واعتماد تصنيف حماية IP67 لمقاومة مياه الأمطار والرطوبة والغبار في بيئة المملكة.`,
    imageUrl: "/images/hero_commercial_signage.jpg",
    published: true,
    publishedAt: new Date("2025-01-10T09:00:00Z")
  },
  {
    title: "دليلك الشامل لتجهيز ملفات الطباعة الرقمية والأوفست",
    slug: "print-ready-artwork-guide",
    excerpt: "قبل إرسال تصميمك للمطبعة، إليك أهم معايير إدارة الألوان CMYK، خطوط القص والهوامش الآمنة لتفادي الأخطاء المكلفة.",
    content: `الفرق بين الشاشة والورق المطبوع هو الفارق بين نظام ألوان RGB والطباعة بنظام CMYK. احرص دائمًا على تحويل الملف إلى وضع CMYK والتأكد من عدم وجود ألوان مشبعة قد تظهر باهتة على الورق.

معايير الجودة الأساسية:
- دقة الملف: 300 نقطة في البوصة (DPI) للبروشورات وبطاقات الأعمال، وما بين 100 إلى 150 DPI للبنرات الكبيرة التي تُرى من مسافة.
- هوامش القص (Bleed): أضف 3 مم على الأقل من كل جانب لمنع ظهور حواف بيضاء غير مرغوبة عند استخدام مقص الورق الهيدروليكي.
- تحويل النصوص إلى منحنيات (Convert to Outlines/Curves) لضمان عدم تغير الخط عند فتح الملف في أجهزة الإنتاج.

طلب عينة تجريبية واحدة (Digital Proof) قبل طباعة آلاف النسخ هو استثمار بسيط يوفر عليك الكثير.`,
    imageUrl: "/images/digital_printing_facility.jpg",
    published: true,
    publishedAt: new Date("2025-02-18T09:00:00Z")
  },
  {
    title: "أهمية الهدايا الدعائية والدروع في تعزيز ولاء العملاء",
    slug: "meaningful-brand-gifts-impact",
    excerpt: "كيف تحول الهدية الترويجية من مجرد غرض يحمل شعارًا إلى أداة تسويقية تترك انطباعًا فاخرًا وطويل الأمد.",
    content: `الهدية الدعائية هي سفير علامتك اليومي على مكاتب عملائك وشركائك. الهدية العملية والمصنوعة من مواد عالية الجودة (مثل الجلود الطبيعية، الخشب المعالج، أو أدوات التكنولوجيا اللاسلكية) يتم الاحتفاظ بها واستخدامها يوميًا.

أما في حفلات التخرج والتكريم السنوي، فإن الدروع المصممة خصيصًا بهندسة عصرية وتداخل بين الكريستال والأكريليك الشفاف والخشب تعكس المكانة والتقدير الحقيقيين للشخص المكرم.

تجنب المبالغة في حجم الشعار، واجعل التخصيص راقيًا وهادئًا يبرز جودة المنتج.`,
    imageUrl: "/images/luxury_awards_gifts.jpg",
    published: true,
    publishedAt: new Date("2025-03-05T09:00:00Z")
  }
];

async function main() {
  console.log("Seeding database...");

  // Seed default admin user
  const passwordHash = await bcrypt.hash("AdminPassword123!", 10);
  await db.user.upsert({
    where: { username: "admin" },
    create: {
      id: "admin-user",
      username: "admin",
      name: "مدير الموقع",
      passwordHash,
      role: "admin"
    },
    update: {
      passwordHash,
      role: "admin"
    }
  });
  console.log("Admin user seeded: admin / AdminPassword123!");

  for (const service of services) {
    await db.service.upsert({
      where: { slug: service.slug },
      create: { ...service },
      update: { ...service }
    });
  }

  for (const project of projects) {
    await db.project.upsert({
      where: { slug: project.slug },
      create: { ...project },
      update: { ...project }
    });
  }

  for (const post of posts) {
    await db.post.upsert({
      where: { slug: post.slug },
      create: { ...post },
      update: { ...post }
    });
  }

  console.log("Seeding completed successfully with authentic services, projects, and articles!");
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : "Seeding failed.");
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());