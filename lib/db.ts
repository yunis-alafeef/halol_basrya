import "server-only";
import { PrismaClient } from "@prisma/client";

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

// Initial seed data with authentic imagery for immediate resilience
const initialServices: ServiceItem[] = [
  {
    id: "srv-1",
    title: "اللوحات والحروف البارزة",
    slug: "signage",
    imageUrl: "/images/hero_commercial_signage.jpg",
    description: "تصنيع حروف بارزة مضيئة (أكريليك، زنكور، ستانلس ستيل) وشاشات ليد بأعلى معايير كود البناء السعودي مع ضمان معتمد حتى 5 سنوات.",
    sortOrder: 1,
    featured: true,
    createdAt: new Date("2025-01-01T00:00:00Z"),
    updatedAt: new Date("2025-01-01T00:00:00Z")
  },
  {
    id: "srv-2",
    title: "الطباعة بمختلف أنواعها",
    slug: "printing",
    imageUrl: "/images/digital_printing_facility.jpg",
    description: "مطابع رقمية يابانية وأوفست لإنتاج البنرات، الفليكس، الاستيكرات، البروشورات، والكتالوجات بألوان مطابقة لكود Pantone ومقاومة لأشعة الشمس.",
    sortOrder: 2,
    featured: true,
    createdAt: new Date("2025-01-02T00:00:00Z"),
    updatedAt: new Date("2025-01-02T00:00:00Z")
  },
  {
    id: "srv-3",
    title: "الدروع التكريمية والتذكارية",
    slug: "awards",
    imageUrl: "/images/luxury_awards_gifts.jpg",
    description: "تصميم وتنفيذ أفخم الدروع التذكارية من الكريستال النقي، الخشب الطبيعي، والأكريليك الشفاف المحفور بالليزر للمناسبات الرسمية والتكريم.",
    sortOrder: 3,
    featured: true,
    createdAt: new Date("2025-01-03T00:00:00Z"),
    updatedAt: new Date("2025-01-03T00:00:00Z")
  },
  {
    id: "srv-4",
    title: "الهدايا الدعائية والترويجية",
    slug: "promotional-gifts",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    description: "باقات هدايا فاخرة تحمل هوية علامتك وتمنحك حضورًا استثنائيًا لدى شركائك وعملائك، من الأقلام والمفكرات إلى الأجهزة الذكية والأطقم الترويجية.",
    sortOrder: 4,
    featured: true,
    createdAt: new Date("2025-01-04T00:00:00Z"),
    updatedAt: new Date("2025-01-04T00:00:00Z")
  },
  {
    id: "srv-5",
    title: "الأختام الرسمية والتجارية",
    slug: "stamps",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    description: "أختام كريستال وأوتوماتيكية سريعة بجميع المقاسات والأشكال، بدقة نقش متناهية بالليزر تدوم لآلاف الطبعات الواضحة والمنضبطة.",
    sortOrder: 5,
    featured: false,
    createdAt: new Date("2025-01-05T00:00:00Z"),
    updatedAt: new Date("2025-01-05T00:00:00Z")
  },
  {
    id: "srv-6",
    title: "الاستندات وحوامل المعارض",
    slug: "display-stands",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    description: "رول اب، بوب اب، كاونترات استقبال، واستندات مخصصة للمعارض والمؤتمرات والفعاليات سهلة الحمل والتركيب وذات مظهر احترافي فخم.",
    sortOrder: 6,
    featured: true,
    createdAt: new Date("2025-01-06T00:00:00Z"),
    updatedAt: new Date("2025-01-06T00:00:00Z")
  },
  {
    id: "srv-7",
    title: "لوحات المشاريع والمواقع",
    slug: "project-boards",
    imageUrl: "/images/signage_cladding_workshop.jpg",
    description: "لوحات تعريفية وإرشادية ضخمة للمواقع الإنشائية والمشاريع الحكومية والخاصة بهياكل تيوبات مجلفنة مقاومة للرياح والعواصف الترابية.",
    sortOrder: 7,
    featured: false,
    createdAt: new Date("2025-01-07T00:00:00Z"),
    updatedAt: new Date("2025-01-07T00:00:00Z")
  },
  {
    id: "srv-8",
    title: "واجهات الكلادينج والهياكل الإعلانية",
    slug: "cladding-facades",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "تكسية واجهات المباني والمتاجر بألواح الألمنيوم (الكلادينج) المقاومة للحريق بتشكيلات عصرية وتشطيبات هندسية دقيقة.",
    sortOrder: 8,
    featured: true,
    createdAt: new Date("2025-01-08T00:00:00Z"),
    updatedAt: new Date("2025-01-08T00:00:00Z")
  }
];

const initialProjects: ProjectItem[] = [
  {
    id: "prj-1",
    title: "واجهة تجارية بهوية معاصرة - برج الملز",
    slug: "modern-storefront-malaz",
    category: "لوحات وحروف بارزة",
    description: "تنفيذ واجهة متكاملة بحروف ثلاثية الأبعاد بارزة مع إضاءة ليد كورية سامسونج وتكسيات كلادينج فاخرة مقاومة للحرارة.",
    imageUrl: "/images/hero_commercial_signage.jpg",
    featured: true,
    createdAt: new Date("2025-01-10T00:00:00Z"),
    updatedAt: new Date("2025-01-10T00:00:00Z")
  },
  {
    id: "prj-2",
    title: "هوية وتجهيز جناح معرض الرياض الدولي",
    slug: "riyadh-expo-pavilion",
    category: "استندات وفعاليات",
    description: "تصميم وإنتاج كامل لجناح المعرض متضمناً منصات العرض، الإضاءات، الاستندات وبوسترات المطبوعات عالية الدقة.",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85",
    featured: true,
    createdAt: new Date("2025-01-12T00:00:00Z"),
    updatedAt: new Date("2025-01-12T00:00:00Z")
  },
  {
    id: "prj-3",
    title: "حملة مطبوعات وهوية شركة الأفق القابضة",
    slug: "alofoq-corporate-print",
    category: "طباعة",
    description: "طباعة رقمية وأوفست لأكثر من 50 ألف مادة دعائية وتسويقية وبطاقات أعمال فاخرة بورق قطني وتشطيب سبوت يو في.",
    imageUrl: "/images/digital_printing_facility.jpg",
    featured: true,
    createdAt: new Date("2025-01-15T00:00:00Z"),
    updatedAt: new Date("2025-01-15T00:00:00Z")
  },
  {
    id: "prj-4",
    title: "دروع تكريمية سنوية - مجموعة السبيعي",
    slug: "subaie-luxury-trophies",
    category: "دروع وهدايا",
    description: "تصنيع 120 درعًا كريستاليًا محفورًا بتقنية الليزر ثلاثي الأبعاد مع قواعد من الخشب الملكي وعلب قطيفة فاخرة.",
    imageUrl: "/images/luxury_awards_gifts.jpg",
    featured: true,
    createdAt: new Date("2025-01-18T00:00:00Z"),
    updatedAt: new Date("2025-01-18T00:00:00Z")
  },
  {
    id: "prj-5",
    title: "واجهة كلادينج وحروف زنكور - كافيه أروما",
    slug: "aroma-cafe-signage",
    category: "لوحات وحروف بارزة",
    description: "تجهيز واجهة فرع جديد بنظام إنارة خلفية هالو وحروف زنكور مطفية وتشطيب ألمنيوم معزول ضد الرطوبة.",
    imageUrl: "/images/signage_cladding_workshop.jpg",
    featured: false,
    createdAt: new Date("2025-01-20T00:00:00Z"),
    updatedAt: new Date("2025-01-20T00:00:00Z")
  }
];

const initialPosts: PostItem[] = [
  {
    id: "pst-1",
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
    publishedAt: new Date("2025-01-10T09:00:00Z"),
    createdAt: new Date("2025-01-10T09:00:00Z"),
    updatedAt: new Date("2025-01-10T09:00:00Z")
  },
  {
    id: "pst-2",
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
    publishedAt: new Date("2025-02-18T09:00:00Z"),
    createdAt: new Date("2025-02-18T09:00:00Z"),
    updatedAt: new Date("2025-02-18T09:00:00Z")
  },
  {
    id: "pst-3",
    title: "أهمية الهدايا الدعائية والدروع في تعزيز ولاء العملاء",
    slug: "meaningful-brand-gifts-impact",
    excerpt: "كيف تحول الهدية الترويجية من مجرد غرض يحمل شعارًا إلى أداة تسويقية تترك انطباعًا فاخرًا وطويل الأمد.",
    content: `الهدية الدعائية هي سفير علامتك اليومي على مكاتب عملائك وشركائك. الهدية العملية والمصنوعة من مواد عالية الجودة (مثل الجلود الطبيعية، الخشب المعالج، أو أدوات التكنولوجيا اللاسلكية) يتم الاحتفاظ بها واستخدامها يوميًا.

أما في حفلات التخرج والتكريم السنوي، فإن الدروع المصممة خصيصًا بهندسة عصرية وتداخل بين الكريستال والأكريليك الشفاف والخشب تعكس المكانة والتقدير الحقيقيين للشخص المكرم.

تجنب المبالغة في حجم الشعار، واجعل التخصيص راقيًا وهادئًا يبرز جودة المنتج.`,
    imageUrl: "/images/luxury_awards_gifts.jpg",
    published: true,
    publishedAt: new Date("2025-03-05T09:00:00Z"),
    createdAt: new Date("2025-03-05T09:00:00Z"),
    updatedAt: new Date("2025-03-05T09:00:00Z")
  }
];

const initialUsers: UserItem[] = [
  {
    id: "admin-user",
    username: "admin",
    name: "مدير الموقع",
    passwordHash: "$2b$10$/X2vxrfHq9wa7pSmTN.eEO5bYhMvE14lxNWjGW9zC5QM4C2fn2vAi", // AdminPassword123!
    role: "admin",
    createdAt: new Date("2025-01-01T00:00:00Z"),
    updatedAt: new Date("2025-01-01T00:00:00Z")
  }
];

interface MockDataStore {
  services: ServiceItem[];
  projects: ProjectItem[];
  posts: PostItem[];
  users: UserItem[];
}

const globalForStore = globalThis as unknown as { __hb_mock_db?: MockDataStore };

if (!globalForStore.__hb_mock_db) {
  globalForStore.__hb_mock_db = {
    services: [...initialServices],
    projects: [...initialProjects],
    posts: [...initialPosts],
    users: [...initialUsers]
  };
}

function matchWhere(item: any, where?: Record<string, any>): boolean {
  if (!where) return true;
  for (const [key, val] of Object.entries(where)) {
    if (val === undefined) continue;
    if (item[key] !== val) return false;
  }
  return true;
}

function applySelect(item: any, select?: Record<string, boolean>): any {
  if (!select) return { ...item };
  const res: any = {};
  for (const [key, enabled] of Object.entries(select)) {
    if (enabled && key in item) {
      res[key] = item[key];
    }
  }
  return res;
}

function sortItems<T>(items: T[], orderBy?: any): T[] {
  if (!orderBy) return items;
  const sortDefs = Array.isArray(orderBy) ? orderBy : [orderBy];
  return [...items].sort((a: any, b: any) => {
    for (const def of sortDefs) {
      for (const [key, dir] of Object.entries(def)) {
        const valA = a[key] instanceof Date ? a[key].getTime() : a[key];
        const valB = b[key] instanceof Date ? b[key].getTime() : b[key];
        if (valA < valB) return dir === "asc" ? -1 : 1;
        if (valA > valB) return dir === "asc" ? 1 : -1;
      }
    }
    return 0;
  });
}

function createMockCollection<T extends { id: string }>(getCollection: () => T[]) {
  return {
    async findMany(args?: { where?: any; orderBy?: any; select?: any }) {
      const filtered = getCollection().filter((item) => matchWhere(item, args?.where));
      const sorted = sortItems(filtered, args?.orderBy);
      return sorted.map((item) => applySelect(item, args?.select));
    },
    async findFirst(args?: { where?: any; select?: any }) {
      const item = getCollection().find((i) => matchWhere(i, args?.where));
      return item ? applySelect(item, args?.select) : null;
    },
    async findUnique(args?: { where?: any; select?: any }) {
      const item = getCollection().find((i) => matchWhere(i, args?.where));
      return item ? applySelect(item, args?.select) : null;
    },
    async count(args?: { where?: any }) {
      return getCollection().filter((item) => matchWhere(item, args?.where)).length;
    },
    async create(args: { data: any; select?: any }) {
      const now = new Date();
      const newItem: any = {
        id: args.data.id || `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        createdAt: now,
        updatedAt: now,
        ...args.data
      };
      getCollection().unshift(newItem);
      return applySelect(newItem, args?.select);
    },
    async update(args: { where: any; data: any; select?: any }) {
      const items = getCollection();
      const idx = items.findIndex((i) => matchWhere(i, args.where));
      if (idx === -1) throw new Error("Item not found");
      const updated = {
        ...items[idx],
        ...args.data,
        updatedAt: new Date()
      };
      items[idx] = updated;
      return applySelect(updated, args?.select);
    },
    async delete(args: { where: any }) {
      const items = getCollection();
      const idx = items.findIndex((i) => matchWhere(i, args.where));
      if (idx === -1) throw new Error("Item not found");
      const [removed] = items.splice(idx, 1);
      return removed;
    },
    async upsert(args: { where: any; create: any; update: any }) {
      const items = getCollection();
      const idx = items.findIndex((i) => matchWhere(i, args.where));
      if (idx >= 0) {
        items[idx] = { ...items[idx], ...args.update, updatedAt: new Date() };
        return items[idx];
      } else {
        const now = new Date();
        const created: any = {
          id: args.create.id || `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          createdAt: now,
          updatedAt: now,
          ...args.create
        };
        items.push(created);
        return created;
      }
    }
  };
}

const store = globalForStore.__hb_mock_db!;

const mockDb = {
  service: createMockCollection(() => store.services),
  project: createMockCollection(() => store.projects),
  post: createMockCollection(() => store.posts),
  user: createMockCollection(() => store.users),
  $connect: async () => {},
  $disconnect: async () => {}
};

/**
 * Determine dynamic database URL:
 * 1. AI Studio Cloud SQL Unix Socket (europe-west2)
 * 2. Vercel Postgres / Supabase / Neon via DATABASE_URL
 */
function resolveDatabaseUrl(): string | null {
  if (process.env.SQL_HOST && process.env.SQL_USER && process.env.SQL_DB_NAME) {
    const user = process.env.SQL_USER;
    const password = encodeURIComponent(process.env.SQL_PASSWORD || "");
    const dbName = process.env.SQL_DB_NAME;
    const host = encodeURIComponent(process.env.SQL_HOST);
    return `postgresql://${user}:${password}@localhost/${dbName}?host=${host}`;
  }

  const directUrl = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL_NON_POOLING;
  if (directUrl && !directUrl.includes("placeholder") && !directUrl.includes("build-only.invalid")) {
    return directUrl;
  }

  return null;
}

const activeDbUrl = resolveDatabaseUrl();

let realPrisma: PrismaClient | null = null;
if (activeDbUrl) {
  try {
    realPrisma = new PrismaClient({
      datasources: {
        db: { url: activeDbUrl }
      }
    });
  } catch (err) {
    console.warn("[AI Studio] PrismaClient initialization error — fallback to mock store", err);
    realPrisma = null;
  }
}

// Delegate queries to real Prisma if connected, with immediate fallback to mockDb on connection issue
function wrapDelegate(modelName: "service" | "project" | "post" | "user") {
  const mockModel = (mockDb as any)[modelName];
  return new Proxy(mockModel, {
    get(target, prop: string) {
      if (realPrisma && (realPrisma as any)[modelName] && typeof (realPrisma as any)[modelName][prop] === "function") {
        return async (...args: any[]) => {
          try {
            return await (realPrisma as any)[modelName][prop](...args);
          } catch (err) {
            console.warn(`[AI Studio] Real DB ${modelName}.${prop} failed, falling back to mock:`, err);
            return typeof target[prop] === "function" ? target[prop](...args) : undefined;
          }
        };
      }
      return target[prop];
    }
  });
}

export interface DbClient {
  service: {
    findMany(args?: { where?: Partial<ServiceItem>; orderBy?: any; select?: any }): Promise<ServiceItem[]>;
    findFirst(args?: { where?: Partial<ServiceItem>; select?: any }): Promise<ServiceItem | null>;
    findUnique(args?: { where?: Partial<ServiceItem>; select?: any }): Promise<ServiceItem | null>;
    count(args?: { where?: Partial<ServiceItem> }): Promise<number>;
    create(args: { data: any; select?: any }): Promise<ServiceItem>;
    update(args: { where: any; data: any; select?: any }): Promise<ServiceItem>;
    delete(args: { where: any }): Promise<ServiceItem>;
    upsert(args: { where: any; create: any; update: any }): Promise<ServiceItem>;
  };
  project: {
    findMany(args?: { where?: Partial<ProjectItem>; orderBy?: any; select?: any }): Promise<ProjectItem[]>;
    findFirst(args?: { where?: Partial<ProjectItem>; select?: any }): Promise<ProjectItem | null>;
    findUnique(args?: { where?: Partial<ProjectItem>; select?: any }): Promise<ProjectItem | null>;
    count(args?: { where?: Partial<ProjectItem> }): Promise<number>;
    create(args: { data: any; select?: any }): Promise<ProjectItem>;
    update(args: { where: any; data: any; select?: any }): Promise<ProjectItem>;
    delete(args: { where: any }): Promise<ProjectItem>;
    upsert(args: { where: any; create: any; update: any }): Promise<ProjectItem>;
  };
  post: {
    findMany(args?: { where?: Partial<PostItem>; orderBy?: any; select?: any }): Promise<PostItem[]>;
    findFirst(args?: { where?: Partial<PostItem>; select?: any }): Promise<PostItem | null>;
    findUnique(args?: { where?: Partial<PostItem>; select?: any }): Promise<PostItem | null>;
    count(args?: { where?: Partial<PostItem> }): Promise<number>;
    create(args: { data: any; select?: any }): Promise<PostItem>;
    update(args: { where: any; data: any; select?: any }): Promise<PostItem>;
    delete(args: { where: any }): Promise<PostItem>;
    upsert(args: { where: any; create: any; update: any }): Promise<PostItem>;
  };
  user: {
    findMany(args?: { where?: Partial<UserItem>; orderBy?: any; select?: any }): Promise<UserItem[]>;
    findFirst(args?: { where?: Partial<UserItem>; select?: any }): Promise<UserItem | null>;
    findUnique(args?: { where?: Partial<UserItem>; select?: any }): Promise<UserItem | null>;
    count(args?: { where?: Partial<UserItem> }): Promise<number>;
    create(args: { data: any; select?: any }): Promise<UserItem>;
    update(args: { where: any; data: any; select?: any }): Promise<UserItem>;
    delete(args: { where: any }): Promise<UserItem>;
    upsert(args: { where: any; create: any; update: any }): Promise<UserItem>;
  };
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
}

export const db: DbClient = {
  service: wrapDelegate("service"),
  project: wrapDelegate("project"),
  post: wrapDelegate("post"),
  user: wrapDelegate("user"),
  $connect: async () => (realPrisma ? realPrisma.$connect().catch(() => {}) : Promise.resolve()),
  $disconnect: async () => (realPrisma ? realPrisma.$disconnect().catch(() => {}) : Promise.resolve())
};

export const prisma = db;
