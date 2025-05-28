// No seu arquivo Navbar.tsx (ex: app/components/Navbar.tsx ou similar)
"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider" // Verifique este caminho
import { SearchBar } from "../components/search-bar" // Verifique este caminho
import { ProdutoItf } from "../utils/types/ProdutoItf" // Verifique este caminho
import { useEffect, useState } from "react";
import LoginButton from "./LoginButton"; // Verifique este caminho

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { cart } = useCart() // Certifique-se que useCart está configurado para lidar com o estado inicial
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const [, setProduto] = useState<ProdutoItf[]>([])

  const pathname = usePathname();

  // Defina as rotas onde os elementos principais da Navbar (Search, Cart, Login) NÃO devem aparecer
  const hideMainElementsRoutes = ['/login', '/cadastro', '/senha']; // ATUALIZADO AQUI

  // Verifique se a rota atual NÃO está na lista de hideMainElementsRoutes
  const showMainNavbarElements = !hideMainElementsRoutes.includes(pathname);

  async function buscaDados() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`)
      const dados = await response.json()
      console.log(dados)
      setProduto(dados)
  }
  useEffect(() => {
    // buscaDados() // Comentado para evitar erros se a API não estiver pronta/necessária aqui
  }
  , [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex-1 flex justify-start md:justify-center">
          <Link href="/" className="font-bold text-xl">
            Atura
          </Link>
        </div>

        {/* Search (renderização condicional) */}
        {showMainNavbarElements && (
          <div className="hidden md:flex flex-[2] justify-center">
            <SearchBar />
          </div>
        )}

        {/* Carrinho e Login (renderização condicional) */}
        {showMainNavbarElements && (
          <div className="flex-1 flex justify-end items-center gap-2 mr-4 md:mr-6">
            <Button variant="outline" size="icon" asChild>
              <Link href="/carrinho" className="relative">
                <ShoppingCart className="h-5 w-5" />
                
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Carrinho</span>
              </Link>
            </Button>
           <LoginButton />
          </div>
        )}
        
      </div>
    </header>
  )
}