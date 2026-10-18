import Link from "next/link";

interface LogoProps {
  light?: boolean;
  brandName?: string;
  tagline?: string;
  logoUrl?: string;
  className?: string;
}

export function Logo({
  light = false,
  brandName = "حلول بصير",
  tagline = "نصنع حضورك",
  logoUrl = "",
  className = ""
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "brand-light" : ""} ${className}`.trim()}
      aria-label={`${brandName} — الصفحة الرئيسية`}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={brandName}
          className="brand-custom-img"
          style={{ height: 42, width: "auto", objectFit: "contain" }}
        />
      ) : (
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 52 52" role="img" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="52" height="52" rx="14" fill={light ? "rgba(255,255,255,0.12)" : "var(--navy)"} />
            <path d="M12 37L23 15H29L18 37H12Z" fill="var(--gold)" />
            <path d="M25 37L36 15H42L31 37H25Z" fill={light ? "#ffffff" : "var(--ink)"} />
            <circle cx="39" cy="37" r="3.5" fill="var(--gold)" />
          </svg>
        </span>
      )}
      <span className="brand-copy">
        <b className="brand-title">{brandName}</b>
        <small className="brand-tagline">{tagline}</small>
      </span>
    </Link>
  );
}