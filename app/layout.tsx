import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./components/theme-provider" // Assumindo que este é o ThemeProvider do next-themes via shadcn
import Navbar from "./components/navbar"
import CartProvider from "./components/cart-provider"
import { Toaster } from "@/components/ui/sonner" // Import para o Toaster do shadcn/ui (que usa Sonner)

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Atura Perfumes",
  description: "Exclusive perfumes for all occasions",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6 md:py-8">
                <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © {new Date().getFullYear()} Atura Perfumes. Todos os direitos reservados. {/* Ano dinâmico */}
                  </p>
                </div>
              </footer>
            </div>
          </CartProvider>
          <Toaster richColors position="top-right" /> {/* Toaster movido para dentro do ThemeProvider */}
          {/* Você pode ajustar as props do Toaster aqui, como 'position', 'richColors', 'theme', 'duration', etc. */}
          {/* Ex: <Toaster theme="system" position="bottom-center" richColors closeButton /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}