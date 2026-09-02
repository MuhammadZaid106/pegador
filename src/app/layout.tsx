import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/component/ThemeProvider";
import { AuthProvider } from "@/component/AuthProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Official Website — PEGADOR®",
  description:
    "PEGADOR® is a brand that specializes in high-quality products and services. Explore our offerings and learn more about our commitment to excellence.",
};

import ReduxProvider from "@/component/redux/ReduxProvider";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ReduxProvider>
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
            <Script
              defer
              src="https://cloud.umami.is/script.js"
              data-website-id="7a8ba992-0ddc-48d7-bd18-c4e809a9ad0e"
              strategy="afterInteractive"
            />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
