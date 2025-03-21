import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { TanstackQueryProvider } from "@/lib/tanstack-query/provider";

// Using a variable font for optimal performance
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouLearn - Learn at your own pace",
  description: "A modern AI-powered learning platform for everyone",
  // Added cache headers for better SEO and performance
  other: {
    'cache-control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=31536000',
  }
};

/**
 * Root layout uses React Server Components for optimal performance
 * - ThemeProvider is a client component (has 'use client' directive)
 * - Main layout is server rendered for faster initial load
 * - TanstackQueryProvider handles client-side state and caching
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackQueryProvider>
            {children}
          </TanstackQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
