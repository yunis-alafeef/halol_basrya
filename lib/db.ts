import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

// Types matching Prisma schema
export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  imageUrl: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserItem {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Global in-memory storage for AI Studio development container
const globalStore = globalThis as unknown as {
  __mock_services?: ServiceItem[];
  __mock_projects?: ProjectItem[];
  __mock_posts?: PostItem[];
  __mock_users?: UserItem[];
};

if (!globalStore.__mock_services) {
  globalStore.__mock_services = [
    { id: "srv-1", title: "اللوحات والحروف البارزة", slug: "signage", imageUrl: "/images/hero_commercial_signage.jpg", description: "حروف بارزة مضيئة وغير مضيئة، وواجهات كلادينج وإسمنت بورد ولوحات المشاريع، من المعاينة إلى التركيب.", sortOrder: 1, featured: true, createdAt: new Date("2025-01-01"), updatedAt: new Date("2025-01-01") },
    { id: "srv-2", title: "الطباعة بمختلف أنواعها", slug: "printing", imageUrl: "/images/digital_printing_facility.jpg", description: "حلول طباعة بأحجام وخامات متنوعة للملصقات والمطبوعات والمواد التسويقية، مع عناية بالألوان والتشطيب.", sortOrder: 2, featured: true, createdAt: new Date("2025-01-02"), updatedAt: new Date("2025-01-02") },
    { id: "srv-3", title: "الدروع التكريمية والتذكارية", slug: "awards", imageUrl: "/images/luxury_awards_gifts.jpg", description: "دروع وهدايا تذكارية بتصاميم راقية وتخصيص يناسب التكريم والاحتفاء بالمناسبات والإنجازات.", sortOrder: 3, featured: true, createdAt: new Date("2025-01-03"), updatedAt: new Date("2025-01-03") },
    { id: "srv-4", title: "الهدايا الدعائية", slug: "promotional-gifts", imageUrl: "/images/luxury_awards_gifts.jpg", description: "هدايا عملية تحمل هويتك وتمنح علامتك حضورًا قريبًا من العملاء والشركاء.", sortOrder: 4, featured: true, createdAt: new Date("2025-01-04"), updatedAt: new Date("2025-01-04") },
    { id: "srv-5", title: "الأختام", slug: "stamps", imageUrl: "/images/luxury_awards_gifts.jpg", description: "أختام عملية بمقاسات وتصاميم متعددة، مناسبة للاستخدام المكتبي والتجاري.", sortOrder: 5, featured: false, createdAt: new Date("2025-01-05"), updatedAt: new Date("2025-01-05") },
    { id: "srv-6", title: "الاستندات والحوامل الدعائية", slug: "display-stands", imageUrl: "/images/digital_printing_facility.jpg", description: "حوامل واستندات للمعارض ونقاط البيع والفعاليات، بتصميم يسهل عرض رسالتك بوضوح.", sortOrder: 6, featured: true, createdAt: new Date("2025-01-06"), updatedAt: new Date("2025-01-06") },
    { id: "srv-7", title: "لوحات المشاريع والمواقع", slug: "project-boards", imageUrl: "/images/signage_cladding_workshop.jpg", description: "لوحات تعريفية وإرشادية للمشاريع، مصممة لمراعاة وضوح المعلومات وجودة المواد للاستخدام الداخلي والخارجي.", sortOrder: 7, featured: false, createdAt: new Date("2025-01-07"), updatedAt: new Date("2025-01-07") },
    { id: "srv-8", title: "تصميم الهوية والمواد الإعلانية", slug: "visual-identity", imageUrl: "/images/hero_commercial_signage.jpg", description: "تصميم بصري متناسق للمواد الإعلانية والمطبوعات يساعد على إبراز شخصية علامتك.", sortOrder: 8, featured: false, createdAt: new Date("2025-01-08"), updatedAt: new Date("2025-01-08") }
  ];
}

if (!globalStore.__mock_projects) {
  globalStore.__mock_projects = [
    { id: "proj-1", title: "واجهة تجارية بهوية معاصرة", slug: "modern-storefront", category: "لوحات وحروف بارزة", description: "واجهة متكاملة من ألواح الكلادينج المقاوم للحريق مع حروف بارزة مضيئة بوحدات LED كورية وضمان 5 سنوات.", imageUrl: "/images/hero_commercial_signage.jpg", featured: true, createdAt: new Date("2025-01-10"), updatedAt: new Date("2025-01-10") },
    { id: "proj-2", title: "هوية معرض ومساحة عرض تفاعلية", slug: "exhibition-display", category: "استندات وفعاليات", description: "تصميم وتجهيز منصة جناح معرض دولي مع استندات رول أب وطباعة فليكس فائقة الدقة خلال 48 ساعة.", imageUrl: "/images/digital_printing_facility.jpg", featured: true, createdAt: new Date("2025-01-12"), updatedAt: new Date("2025-01-12") },
    { id: "proj-3", title: "مواد مطبوعة للعلامة التجارية والشركات", slug: "brand-print-materials", category: "طباعة", description: "حزم مطبوعات تجارية فاخرة تشمل فولدرات معالجة بالحرارة وبطاقات أعمال وسجلات رسمية بجودة طباعة ديجيتال.", imageUrl: "/images/digital_printing_facility.jpg", featured: true, createdAt: new Date("2025-01-14"), updatedAt: new Date("2025-01-14") },
    { id: "proj-4", title: "دروع تذكارية وهدايا تكريمية VIP", slug: "commemorative-awards", category: "دروع وهدايا", description: "دروع كريستال ونحاس مذهب مع حفر ليزر مخصص وعلب قطيفة فاخرة لملتقى رواد الأعمال السنوي.", imageUrl: "/images/luxury_awards_gifts.jpg", featured: false, createdAt: new Date("2025-01-16"), updatedAt: new Date("2025-01-16") }
  ];
}

if (!globalStore.__mock_posts) {
  globalStore.__mock_posts = [
    {
      id: "post-1",
      title: "كيف تختار اللوحة المناسبة لواجهة مشروعك التجاري؟",
      slug: "choose-the-right-sign",
      excerpt: "عوامل عملية وهندسية تساعدك على اختيار خامة اللوحة وحجمها ونوع الإضاءة بما يحقق أفضل جاذبية بصرية.",
      content: "ابدأ من موقع اللوحة والمسافة التي سيشاهدها منها جمهورك. ارتفاع الواجهة، اتجاه الإضاءة، وحركة المرور كلها عوامل تؤثر في حجم الخط وتباين الألوان.\n\nاختر الخامة بحسب طبيعة المكان والظروف المحيطة. تختلف احتياجات الواجهة الخارجية عن المساحة الداخلية أو لوحة موقع إنشائي، لذلك اطلب عينة أو تصورًا 3D قبل اعتماد التنفيذ.\n\nاجعل الرسالة مختصرة وواضحة، وتأكد من أن الشعار والألوان ينسجمان مع هوية مشروعك. التصميم الجيد يوازن بين سهولة القراءة وشخصية العلامة.",
      imageUrl: "/images/hero_commercial_signage.jpg",
      published: true,
      publishedAt: new Date("2025-01-10T09:00:00Z"),
      createdAt: new Date("2025-01-10T09:00:00Z"),
      updatedAt: new Date("2025-01-10T09:00:00Z")
    },
    {
      id: "post-2",
      title: "الطباعة الإعلانية الناجحة تبدأ من تجهيز الملف الهندسي",
      slug: "print-ready-artwork",
      excerpt: "قبل إرسال تصميمك إلى ماكينات الطباعة، راجع هذه المعايير الفنية لتقليل الأخطاء وضمان دقة الألوان بنسبة 100%.",
      content: "دقة الصور ومقاس الملف من أول ما يجب التحقق منه. صمم على المقاس النهائي أو وضح نسبة التكبير المطلوبة، واستخدم صورًا بدقة لا تقل عن 300 DPI للطباعة المقربة و150 DPI للوحات الضخمة.\n\nانتبه إلى الهوامش ومناطق القص، واترك مساحة آمنة للنصوص والشعارات قرب حواف التصميم. عند استخدام ألوان خاصة، اعتمد على نظام CMYK وبانتون المعتمد.\n\nاطلب معاينة أو بروفة لونية عند تنفيذ كميات كبيرة أو خامات جديدة لضمان النتيجة المأمولة.",
      imageUrl: "/images/digital_printing_facility.jpg",
      published: true,
      publishedAt: new Date("2025-02-18T09:00:00Z"),
      createdAt: new Date("2025-02-18T09:00:00Z"),
      updatedAt: new Date("2025-02-18T09:00:00Z")
    },
    {
      id: "post-3",
      title: "الهدايا والدروع التكريمية: كيف تختار ما يعكس قيمة علامتك؟",
      slug: "meaningful-brand-gifts",
      excerpt: "دروع وهدايا تذكارية مختارة بعناية تعزز ولاء العملاء وتخلد لحظات التكريم برقي وفخامة.",
      content: "ابدأ بالتفكير في القيمة المعنوية والوظيفية للهدية: ما الذي سيحتفظ به العميل على مكتبه أو في منزله؟ القطع المصنوعة من الكريستال المصقول أو النحاس المعالج تمنح شعورًا فورياً بالفخامة.\n\nاجعل تخصيص الاسم والشعار أنيقًا ومتوازنًا عبر الحفر بالليزر عالي الدقة بدلاً من الطباعة العادية التي قد تتلاشى مع الوقت.\n\nخطط لمواعيد الإنتاج والتغليف الفاخر مبكرًا لضمان الجاهزية التامة للمناسبة التكريمية.",
      imageUrl: "/images/luxury_awards_gifts.jpg",
      published: true,
      publishedAt: new Date("2025-03-05T09:00:00Z"),
      createdAt: new Date("2025-03-05T09:00:00Z"),
      updatedAt: new Date("2025-03-05T09:00:00Z")
    }
  ];
}

if (!globalStore.__mock_users) {
  const adminPass = process.env.ADMIN_PASSWORD || "AdminPassword123!";
  const adminUser = process.env.ADMIN_USERNAME || "admin";
  const passwordHash = bcrypt.hashSync(adminPass, 10);
  globalStore.__mock_users = [
    {
      id: "user-admin-default",
      username: adminUser,
      name: "مدير الموقع",
      passwordHash,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
}

function matchesWhere<T extends Record<string, any>>(item: T, where?: Record<string, any>): boolean {
  if (!where) return true;
  for (const [key, val] of Object.entries(where)) {
    if (val === undefined) continue;
    if (key === "published" && typeof val === "boolean") {
      if (item.published !== val) return false;
    } else if (item[key] !== val) {
      return false;
    }
  }
  return true;
}

function projectSelect<T extends Record<string, any>>(item: T, select?: Record<string, boolean>): any {
  if (!select) return item;
  const res: Record<string, any> = {};
  for (const [key, enabled] of Object.entries(select)) {
    if (enabled && key in item) {
      res[key] = item[key];
    }
  }
  return res;
}

function sortItems<T extends Record<string, any>>(items: T[], orderBy?: any): T[] {
  if (!orderBy) return items;
  const list = [...items];
  const orderList = Array.isArray(orderBy) ? orderBy : [orderBy];

  list.sort((a, b) => {
    for (const rule of orderList) {
      const [key, dir] = Object.entries(rule)[0] as [string, "asc" | "desc"];
      const valA = a[key];
      const valB = b[key];
      if (valA === valB) continue;
      if (valA === null || valA === undefined) return dir === "asc" ? -1 : 1;
      if (valB === null || valB === undefined) return dir === "asc" ? 1 : -1;
      const cmp = valA > valB ? 1 : -1;
      return dir === "asc" ? cmp : -cmp;
    }
    return 0;
  });
  return list;
}

function createDelegate<T extends { id: string }>(getItems: () => T[], name: string) {
  return {
    async findMany(args: { where?: any; orderBy?: any; select?: any } = {}): Promise<T[]> {
      const filtered = getItems().filter((item) => matchesWhere(item, args.where));
      const sorted = sortItems(filtered, args.orderBy);
      return sorted.map((item) => projectSelect(item, args.select)) as T[];
    },
    async findUnique(args: { where: any; select?: any }): Promise<T | null> {
      const item = getItems().find((item) => matchesWhere(item, args.where));
      return item ? (projectSelect(item, args.select) as T) : null;
    },
    async findFirst(args: { where?: any; select?: any } = {}): Promise<T | null> {
      const item = getItems().find((item) => matchesWhere(item, args.where));
      return item ? (projectSelect(item, args.select) as T) : null;
    },
    async create(args: { data: any; select?: any }): Promise<T> {
      const items = getItems();
      const id = args.data.id || `${name.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const now = new Date();
      const newItem = {
        ...args.data,
        id,
        createdAt: now,
        updatedAt: now
      };
      items.unshift(newItem as T);
      return projectSelect(newItem, args.select) as T;
    },
    async update(args: { where: any; data: any; select?: any }): Promise<T> {
      const items = getItems();
      const index = items.findIndex((item) => matchesWhere(item, args.where));
      if (index === -1) throw new Error(`Item in ${name} not found`);
      const updated = {
        ...items[index],
        ...args.data,
        updatedAt: new Date()
      };
      items[index] = updated;
      return projectSelect(updated, args.select) as T;
    },
    async delete(args: { where: any }): Promise<T> {
      const items = getItems();
      const index = items.findIndex((item) => matchesWhere(item, args.where));
      if (index === -1) throw new Error(`Item in ${name} not found`);
      const removed = items.splice(index, 1)[0];
      return removed;
    },
    async count(args: { where?: any } = {}): Promise<number> {
      return getItems().filter((item) => matchesWhere(item, args.where)).length;
    },
    async upsert(args: { where: any; create: any; update: any }): Promise<T> {
      const items = getItems();
      const existing = items.find((item) => matchesWhere(item, args.where));
      if (existing) {
        return this.update({ where: args.where, data: args.update });
      } else {
        return this.create({ data: args.create });
      }
    }
  };
}

export const inMemoryDb = {
  service: createDelegate(() => globalStore.__mock_services!, "service"),
  project: createDelegate(() => globalStore.__mock_projects!, "project"),
  post: createDelegate(() => globalStore.__mock_posts!, "post"),
  user: createDelegate(() => globalStore.__mock_users!, "user"),
  async $disconnect() {
    // No-op for mock store
  }
};

let activeDb: any = inMemoryDb;

// If DATABASE_URL is explicitly set and not mock, PrismaClient can be used
if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost/mock")) {
  try {
    const prismaClient = new PrismaClient();
    activeDb = new Proxy(inMemoryDb, {
      get(target: any, prop: string) {
        if (prop in prismaClient) {
          return (prismaClient as any)[prop];
        }
        return target[prop];
      }
    });
  } catch (err) {
    console.warn("[AI Studio] Prisma initialization failed, using in-memory mock store:", err);
    activeDb = inMemoryDb;
  }
}

export const db: typeof inMemoryDb = activeDb;