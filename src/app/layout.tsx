import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const monserrat = Montserrat({ subsets: ["latin"] });

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
      <body className={monserrat.className + " h-[100vh] overflow-hidden"}>
        <div
          className="flex justify-between h-72 relative items-start pt-11 shadow-md"
          style={{
            backgroundImage: "url(/porto.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-white/75 to-white"
            style={{
              pointerEvents: "none", // Ensures this overlay doesn't interfere with any content
            }}
          ></div> */}
          <div
            className="min-w-[300px] text-left text-lg text-red-600 text-3xl font-extrabold tracking-widest relative pl-36"
            id="logo"
          >
            <Link href="/">
              BRIDGE IN<br></br>CHALLENGE
            </Link>
          </div>
          <div className="flex min-w-[300px] justify-between relative pr-36">
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
