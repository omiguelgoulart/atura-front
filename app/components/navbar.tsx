// No seu arquivo Navbar.tsx
"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { SearchBar } from "../components/search-bar"
import { ProdutoItf } from "../utils/types/ProdutoItf"
import { useEffect, useState } from "react";
import LoginButton from "./LoginButton";

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const [, setProduto] = useState<ProdutoItf[]>([]);

  const pathname = usePathname();
  const hideMainElementsRoutes = ['/login', '/cadastro', '/senha'];
  const showMainNavbarElements = !hideMainElementsRoutes.includes(pathname);

  // useEffect(() => { /* ... */ }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div 
        className={`container h-16 flex items-center ${showMainNavbarElements ? 'justify-between gap-4' : 'justify-center'}`}
      >
        
        {/* Logo */}
        {showMainNavbarElements ? (
          // Estrutura do Logo para quando outros elementos estão visíveis
          <div className="flex-1 flex justify-start md:justify-center">
            <Link href="/" className="font-bold text-xl">
              Atura
            </Link>
          </div>
        ) : (
          // Estrutura SUPER SIMPLIFICADA para o logo quando SÓ ele é visível
          // O Link "Atura" é renderizado diretamente dentro do container que já está com "justify-center"
          <Link href="/" className="font-bold text-xl">
            Atura
          </Link>
        )}

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