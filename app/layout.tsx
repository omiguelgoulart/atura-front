import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Navbar from "./components/header";
import { Toaster } from "@/components/ui/sonner";
import WhatsAppFab from "./components/zap";
import { CarrinhoProvider } from "./context/CarrinhoContext";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atura Perfumes",
  description: "Exclusive perfumes for all occasions",
};

// Componente de fallback para Navbar
function NavbarFallback() {
  return <div className="h-16 border-b"></div>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <body className={inter.className}>
          <CarrinhoProvider>
            <div className="flex min-h-screen flex-col">
              <Suspense fallback={<NavbarFallback />}>
                <Navbar />
              </Suspense>
              <main className="flex-1">
                <AuthProvider>{children}</AuthProvider>
              </main>
              <footer className="border-t py-6 md:py-8">
                <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © {new Date().getFullYear()} Atura Perfumes. Todos os
                    direitos reservados.
                  </p>
                </div>
              </footer>
            </div>
          </CarrinhoProvider>
          <Toaster richColors position="bottom-right" />
          <Suspense fallback={null}>
            <WhatsAppFab />
          </Suspense>
      </body>
    </html>
  );
}
