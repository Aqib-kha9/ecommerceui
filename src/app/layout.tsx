import type { Metadata } from "next";
import {
  Geist, Geist_Mono,
  Inter, Outfit, Space_Grotesk, Playfair_Display,
  Poppins, Syne, Plus_Jakarta_Sans, Bricolage_Grotesque, Nunito,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SearchProvider } from "@/components/SearchContext";
import { FontProvider } from "@/components/FontProvider";

/* ─── Font Definitions ─────────────────────────── */
const geistSans  = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono  = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const inter      = Inter({ variable: "--font-inter", subsets: ["latin"] });
const outfit     = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const grotesk    = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const playfair   = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const poppins    = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["400","500","600","700","800","900"] });
const syne       = Syne({ variable: "--font-syne", subsets: ["latin"] });
const jakarta    = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const bricolage  = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const nunito     = Nunito({ variable: "--font-nunito", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayur Pooja — Premium FMCG & Daily Essentials Marketplace",
  description:
    "Experience the finest selection of farm-fresh groceries, premium personal care, and daily staples. Ayur Pooja brings quality and convenience to your doorstep with a premium touch.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const fontVars = [
    geistSans.variable, geistMono.variable,
    inter.variable, outfit.variable, grotesk.variable, playfair.variable,
    poppins.variable, syne.variable, jakarta.variable, bricolage.variable, nunito.variable,
  ].join(" ");

  return (
    <html lang="en" suppressHydrationWarning className={fontVars}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SearchProvider>
            <FontProvider>
              {children}
            </FontProvider>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
