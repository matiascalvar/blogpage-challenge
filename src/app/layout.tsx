import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const monserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Bytes - Blog Page",
  description: "REACT BYTES - BLOG PAGE",
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
