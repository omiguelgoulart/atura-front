import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./components/theme-provider" 
import Navbar from "./components/navbar"
import CartProvider from "./components/cart-provider"
import { Toaster } from "@/components/ui/sonner"
import WhatsAppFab from "./components/zap"
import Link from "next/link"



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
               {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Atura Perfumes</h3>
              <p className="text-gray-400 text-sm">
                Fragrâncias exclusivas que contam histórias e despertam emoções. Encontre o perfume que combina com
                você.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Categorias</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Perfumes Masculinos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Perfumes Femininos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Kits e Presentes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Lançamentos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Ofertas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Institucional</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Trocas e Devoluções
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Fale Conosco
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Atendimento</h4>
              <p className="text-gray-400 text-sm mb-2">contato@atura.com.br</p>
              <p className="text-gray-400 text-sm mb-4">(11) 99999-9999</p>
              <p className="text-gray-400 text-sm">
                Horário de atendimento: <br />
                Segunda a Sexta, das 9h às 18h
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Atura Perfumes. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
            </div>
          </CartProvider>
          <Toaster richColors position="top-right" /> 
          <WhatsAppFab  />
         
        </ThemeProvider>
      </body>
    </html>
  )
}