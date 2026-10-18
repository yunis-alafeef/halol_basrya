import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const services = [
 { title: "اللوحات والحروف البارزة", slug: "signage", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80", description: "حروف بارزة مضيئة وغير مضيئة، وواجهات كلادينج وإسمنت بورد ولوحات المشاريع، من المعاينة إلى التركيب.", sortOrder: 1, featured: true },
 { title: "الطباعة بمختلف أنواعها", slug: "printing", imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80", description: "حلول طباعة بأحجام وخامات متنوعة للملصقات والمطبوعات والمواد التسويقية، مع عناية بالألوان والتشطيب.", sortOrder: 2, featured: true },
 { title: "الدروع التكريمية والتذكارية", slug: "awards", imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80", description: "دروع وهدايا تذكارية بتصاميم راقية وتخصيص يناسب التكريم والاحتفاء بالمناسبات والإنجازات.", sortOrder: 3, featured: true },
 { title: "الهدايا الدعائية", slug: "promotional-gifts", imageUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1000&q=80", description: "هدايا عملية تحمل هويتك وتمنح علامتك حضورًا قريبًا من العملاء والشركاء.", sortOrder: 4, featured: true },
 { title: "الأختام", slug: "stamps", imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80", description: "أختام عملية بمقاسات وتصاميم متعددة، مناسبة للاستخدام المكتبي والتجاري.", sortOrder: 5, featured: false },
 { title: "الاستندات والحوامل الدعائية", slug: "display-stands", imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80", description: "حوامل واستندات للمعارض ونقاط البيع والفعاليات، بتصميم يسهل عرض رسالتك بوضوح.", sortOrder: 6, featured: true },
 { title: "لوحات المشاريع والمواقع", slug: "project-boards", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80", description: "لوحات تعريفية وإرشادية للمشاريع، مصممة لمراعاة وضوح المعلومات وجودة المواد للاستخدام الداخلي والخارجي.", sortOrder: 7, featured: false },
 { title: "تصميم الهوية والمواد الإعلانية", slug: "visual-identity", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80", description: "تصميم بصري متناسق للمواد الإعلانية والمطبوعات يساعد على إبراز شخصية علامتك.", sortOrder: 8, featured: false }
];
const projects = [
 { title: "واجهة تجارية بهوية معاصرة", slug: "modern-storefront", category: "لوحات وحروف بارزة", description: "نموذج استرشادي لواجهة تجارية بحروف بارزة وخامات عصرية.", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85", featured: true },
 { title: "هوية معرض ومساحة عرض", slug: "exhibition-display", category: "استندات وفعاليات", description: "نموذج استرشادي لمساحة عرض تبرز الهوية وتوجه الزوار.", imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85", featured: true },
 { title: "مواد مطبوعة للعلامة التجارية", slug: "brand-print-materials", category: "طباعة", description: "نموذج استرشادي لمطبوعات وهوية بصرية متناسقة.", imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85", featured: true },
 { title: "تفاصيل تذكارية للتكريم", slug: "commemorative-awards", category: "دروع وهدايا", description: "نموذج استرشادي لهدايا تكريمية بتفاصيل بسيطة وأنيقة.", imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=85", featured: false }
];
const posts = [
 { title: "كيف تختار اللوحة المناسبة لواجهة مشروعك؟", slug: "choose-the-right-sign", excerpt: "عوامل عملية تساعدك على اختيار خامة اللوحة وحجمها وإضاءتها بما يناسب واجهتك واحتياجك.", content: `ابدأ من موقع اللوحة والمسافة التي سيشاهدها منها جمهورك. ارتفاع الواجهة، اتجاه الإضاءة، وحركة المرور كلها عوامل تؤثر في حجم الخط وتباين الألوان.

اختر الخامة بحسب طبيعة المكان والظروف المحيطة. تختلف احتياجات الواجهة الخارجية عن المساحة الداخلية أو لوحة موقع إنشائي، لذلك اطلب عينة أو تصورًا قبل اعتماد التنفيذ.

اجعل الرسالة مختصرة وواضحة، وتأكد من أن الشعار والألوان ينسجمان مع هوية مشروعك. التصميم الجيد يوازن بين سهولة القراءة وشخصية العلامة.`, imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85", published: true, publishedAt: new Date("2025-01-10T09:00:00Z") },
 { title: "الطباعة الجيدة تبدأ من تجهيز الملف", slug: "print-ready-artwork", excerpt: "قبل إرسال تصميمك إلى الطباعة، راجع هذه التفاصيل لتقليل الأخطاء والحصول على نتيجة أقرب لما تتوقع.", content: `دقة الصور ومقاس الملف من أول ما يجب التحقق منه. صمم على المقاس النهائي أو وضح نسبة التكبير المطلوبة، واستخدم صورًا مناسبة لحجم الطباعة.

انتبه إلى الهوامش ومناطق القص، واترك مساحة آمنة للنصوص والشعارات قرب حواف التصميم. عند استخدام ألوان خاصة، اتفق مسبقًا على طريقة مطابقتها.

اطلب معاينة أو عينة عند تنفيذ كميات كبيرة أو خامات جديدة. مراجعة بسيطة قبل الطباعة تساعدك على اكتشاف التفاصيل مبكرًا.`, imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85", published: true, publishedAt: new Date("2025-02-18T09:00:00Z") },
 { title: "الهدايا الدعائية: كيف تجعلها أقرب إلى علامتك؟", slug: "meaningful-brand-gifts", excerpt: "هدية دعائية مفيدة ومدروسة تترك انطباعًا أفضل من شعار كبير على منتج لا يستخدمه أحد.", content: `ابدأ بالتفكير في الشخص الذي ستصله الهدية: ما الذي يستخدمه فعلًا؟ وما المناسبة التي تقدمها فيها؟ هذا يساعدك على اختيار قطعة عملية بدلًا من اختيار عشوائي.

اجعل ظهور الشعار متوازنًا مع تصميم المنتج. خامة جيدة وتخصيص أنيق عادةً يقدمان تجربة أجمل من مساحة طباعة كبيرة بلا داعٍ.

خطط للكمية وموعد التسليم مبكرًا، خصوصًا إذا كانت الهدية جزءًا من فعالية أو إطلاق منتج. عينة أولية توفر عليك مفاجآت غير مرغوبة.`, imageUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85", published: true, publishedAt: new Date("2025-03-05T09:00:00Z") }
];
async function main() { for (const service of services) await db.service.upsert({ where: { slug: service.slug }, create: { ...service }, update: { ...service } }); for (const project of projects) await db.project.upsert({ where: { slug: project.slug }, create: { ...project }, update: { ...project } }); for (const post of posts) await db.post.upsert({ where: { slug: post.slug }, create: { ...post }, update: { ...post } }); console.log("Seeded example services, portfolio items, and articles. Replace sample portfolio items with real work in the admin dashboard."); }
main().catch((error) => { console.error(error instanceof Error ? error.message : "Seeding failed."); process.exitCode = 1; }).finally(() => db.$disconnect());