import type { Metadata, Viewport } from "next";
import { FirebaseAnalytics } from "../components/FirebaseAnalytics";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://itchamps.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "SAP Consulting & S/4HANA Migration | ITChamps (Two Decades, 100% Success)",
    template: "%s | ITChamps Software"
  },
  description:
    "Global SAP consulting partner for S/4HANA migration, AMS, payroll, and SuccessFactors. Two decades of expertise, 120+ certified consultants, and delivery across 45+ countries.",
  keywords: [
    "SAP consulting",
    "S/4HANA migration",
    "AMS support",
    "global payroll",
    "SuccessFactors",
    "enterprise transformation"
  ],
  openGraph: {
    title: "Transform Your SAP Landscape With ITChamps",
    description: "Two decades of proven expertise. 100% project success rate. Let's build your digital future.",
    url: SITE_URL,
    siteName: "ITChamps Software",
    type: "website"
  },
  alternates: {
    canonical: SITE_URL
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <FirebaseAnalytics />
      </body>
    </html>
  );
}
