import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Center for Bereaved Mothers",
  description: "Supporting mothers through grief with compassion, dignity, hope and community.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate-600">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span>© {new Date().getFullYear()} Center for Bereaved Mothers</span>
              <span>Compassion · Dignity · Hope · Community</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
