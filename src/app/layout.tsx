import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { ToastProvider } from "@/components/ToastContext";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Student Management System",
  description: "A premium student management system built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <ToastProvider>
          <header className="app-header">
            <Link href="/" className="app-brand">
              🎓 <span>Student</span>Manager
            </Link>
            <div className="header-actions">
              <ThemeToggle />
              <Link href="/students/new" className="btn btn-primary">
                + <span>Add Student</span>
              </Link>
            </div>
          </header>
          <main className="animate-fade-in">
            {children}
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}
