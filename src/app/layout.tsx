import type { Metadata } from "next";

import { CustomCursor } from "@/components/custom-cursor";
import { PageLoader } from "@/components/page-loader";
import { PageTransition } from "@/components/page-transition";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollRestorationFix } from "@/components/scroll-restoration-fix";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { fontBody, fontDisplay } from "@/app/fonts";
import { siteConfig } from "@/lib/siteConfig";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontBody.variable} ${fontDisplay.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-background text-foreground font-semibold"
        suppressHydrationWarning
      >
        <ScrollRestorationFix />
        <PageLoader />
        <ScrollProgress />
        <CustomCursor />
        <SiteHeader />
        <PageTransition>
          <main className="flex-1 pt-[var(--header-height)]">{children}</main>
        </PageTransition>
        <SiteFooter />
      </body>
    </html>
  );
}
