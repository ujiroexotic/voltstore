import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header"
import Footer from "../components/Footer"

export const metadata: Metadata = {
  title: "VoltStore",
  description: "An E-Commerce App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
