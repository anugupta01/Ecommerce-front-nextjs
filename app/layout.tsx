import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: { default: "Ecommerce Front", template: "%s | Ecommerce Front" },
  description: "Ecommerce Storefront built with Next.js",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <CartProvider>
          <NavBar categories={categories} />
          <main className="min-vh-100">{children}</main>
          <Footer />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
