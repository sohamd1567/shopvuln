import type { Metadata } from "next";
import Link from "next/link";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShopVuln",
  description: "Deliberately vulnerable e-commerce app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header className="border-b bg-white">
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
              <Link href="/dashboard" className="text-xl font-bold">
                ShopVuln
              </Link>
              <div className="flex items-center gap-4 text-sm">
                <Link href="/dashboard" className="text-slate-700 hover:text-slate-950">
                  Dashboard
                </Link>
                <Link href="/profile" className="text-slate-700 hover:text-slate-950">
                  Profile
                </Link>
              </div>
            </nav>
          </header>
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
