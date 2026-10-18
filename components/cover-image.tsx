import Image from "next/image";
export function CoverImage({ src, alt, className = "", priority = false, sizes = "(max-width: 800px) 100vw, 50vw" }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
 if (!src) return <div className={"cover-placeholder " + className} role="img" aria-label={alt}><span>حلول بصرية</span></div>;
 return <div className={"cover-image " + className}><Image src={src} alt={alt} fill priority={priority} sizes={sizes} style={{ objectFit: "cover" }} unoptimized={src.startsWith("data:")} referrerPolicy="no-referrer"/></div>;
}