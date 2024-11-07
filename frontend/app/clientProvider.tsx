"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { CartProvider } from "@/components/CartContext";
import { AuthProvider } from "@/context/AuthContext";
export function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}
