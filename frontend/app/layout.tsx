import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header"
import Footer from "../components/Footer"
import { ClientProvider } from "./clientProvider";

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
      <ClientProvider>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        </ClientProvider>
      </body>
    </html>
  );
  src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrls[0]}`}
}
