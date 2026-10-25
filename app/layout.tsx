import type { Metadata } from "next";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Fiza Eman — Full-Stack Software Engineer",
  description:
    "Full-stack software engineer building production MERN and Next.js applications — e-commerce platforms, POS systems, real estate marketplaces, and business dashboards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <noscript>
          <style>{".reveal,.rise,.term-line,.char{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
