"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
export function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
    <Header />
    <main>{children}</main>
    <Footer />
  </Provider>
  )
}