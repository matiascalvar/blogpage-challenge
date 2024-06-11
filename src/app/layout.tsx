import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <body className={monserrat.className + " h-[100vh]"}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
