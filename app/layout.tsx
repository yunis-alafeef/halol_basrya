import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
export const metadata: Metadata = { title: { default: "حلول بصرية | دعاية وإعلان وطباعة", template: "%s | حلول بصرية" }, description: "حلول متكاملة للدعاية والإعلان: لوحات، حروف بارزة، كلادينج، طباعة، دروع، هدايا دعائية وأختام.", metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined, openGraph: { type: "website", locale: "ar_SA", siteName: "حلول بصرية", title: "حلول بصرية — نصنع حضورك", description: "من الفكرة إلى التنفيذ، حلول بصرية متكاملة لهوية تترك أثرًا." } };
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) { return <html lang="ar" dir="rtl"><body><Header/><main>{children}</main><Footer/></body></html>; }