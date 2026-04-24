import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ITChamps Software | SAP Consulting Services and S/4HANA Migration",
    template: "%s | ITChamps Software"
  },
  description:
    "ITChamps Software is a certified SAP partner offering S/4HANA migration services, SAP consulting services, SAP AMS services India, SAP SuccessFactors consulting, and SAP global payroll solutions.",
  keywords: [
    "S/4HANA migration services",
    "SAP implementation partner India",
    "SAP consulting services",
    "SAP AMS services India",
    "SAP SuccessFactors consulting",
    "SAP global payroll solutions",
    "SAP ECC to S/4HANA migration",
    "SAP support services"
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
