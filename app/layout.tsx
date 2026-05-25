import type { Metadata, Viewport } from "next";
import { FirebaseAnalytics } from "../components/FirebaseAnalytics";
import "./globals.css";

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
    url: "https://it-champs.vercel.app/",
    siteName: "ITChamps Software",
    type: "website"
  },
  alternates: {
    canonical: "https://it-champs.vercel.app/"
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
