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
import { AuthProvider } from "@/components/AuthContext";
import { CartProvider } from "@/components/CartContext";
import AuthModal from "@/components/AuthModal";
import WelcomePopup from "@/components/WelcomePopup";
import { Toaster } from "sonner";

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

import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const fontVars = [
    geistSans.variable, geistMono.variable,
    inter.variable, outfit.variable, grotesk.variable, playfair.variable,
    poppins.variable, syne.variable, jakarta.variable, bricolage.variable, nunito.variable,
  ].join(" ");

  return (
    <html lang={locale} suppressHydrationWarning className={fontVars}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <Toaster richColors position="top-right" />
            <SearchProvider>
              <AuthProvider>
                <CartProvider>
                  <FontProvider>
                    {children}
                    <AuthModal />
                    <WelcomePopup />
                  </FontProvider>
                </CartProvider>
              </AuthProvider>
            </SearchProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
