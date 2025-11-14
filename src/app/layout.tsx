// src/app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Suraaj | Personal Site",
  description: "My personal website and tools dashboard.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <div className="max-w-5xl mx-auto min-h-screen flex flex-col px-4 py-6">
          {/* Top navbar */}
          <header className="flex items-center justify-between mb-8">
            <a href="/" className="text-lg font-semibold">
              ssharm
            </a>

            <nav className="flex gap-4 text-sm">
              <a href="/" className="hover:underline">
                Home
              </a>
              <a href="/tools" className="hover:underline">
                Tools
              </a>
            </nav>
          </header>

          {/* Main page content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="mt-8 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
            Built by SuraajN • {new Date().getFullYear()}
          </footer>
        </div>
      </body>
    </html>
  );
}