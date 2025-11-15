import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";
import { getSession } from "@/lib/auth";

type RootLayoutProps = {
  children: ReactNode;
};

// Server component header
async function SiteHeader() {
  const session = await getSession();
  const user = session?.user as { id?: string; name?: string | null; email?: string | null };

  return (
    <header className="border-b border-neutral-800 bg-black/60 backdrop-blur">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Logo / title */}
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold text-lg">
            ssharm
          </Link>
          <span className="text-xs text-neutral-500 border border-neutral-700 px-2 py-0.5 rounded-full">
            sigma
          </span>
        </div>

        {/* Middle: Nav links */}
        <nav className="flex items-center gap-4 text-sm text-neutral-300">
          <Link href="/tools" className="hover:text-white">
            Tools
          </Link>
          <Link href="/social" className="hover:text-white">
            Social
          </Link>
        </nav>

        {/* Right: Auth area */}
        <div className="flex items-center gap-3 text-sm">
          {user?.name ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-neutral-200 text-xs">
                    {user.name}
                  </span>
                  <span className="text-neutral-500 text-[11px]">
                    {user.email}
                  </span>
                </div>
              </div>

              {/* Simple logout link using NextAuth signout URL */}
              <a
                href="/api/auth/signout?callbackUrl=/"
                className="text-xs text-red-400 hover:text-red-300 border border-red-500/40 px-3 py-1 rounded-full"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs text-neutral-300 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-xs text-black bg-neutral-100 hover:bg-white px-3 py-1 rounded-full"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="bg-black text-neutral-100">
      <body className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black">
        <SiteHeader />
        <main className="w-full max-w-6xl mx-auto px-4 lg:px-10 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
