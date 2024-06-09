import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bridge In Challenge",
  description: "Bridge In Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + "h-[100vh]"}>
        <div className="flex justify-between items-center min-h-[70px] border border-red-500">
          <div className="min-w-[300px] text-center text-lg text-red-600">
            <Link href="/">BRIDGE IN CHALLENGE</Link>
          </div>
          <div className="flex min-w-[300px] justify-around">
            <div>
              <Link href="/">Home</Link>
            </div>
            <div>
              <Link href="/about">About</Link>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
