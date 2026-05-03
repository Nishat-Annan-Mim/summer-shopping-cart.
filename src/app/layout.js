import "./globals.css";
import "animate.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { StoreProvider } from "@/lib/store";
import ToasterProvider from "@/components/shared/ToasterProvider";

export const metadata = {
  title: "SunCart – Summer Essentials Store",
  description: "Shop the best summer products online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StoreProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ToasterProvider />
        </StoreProvider>
      </body>
    </html>
  );
}
