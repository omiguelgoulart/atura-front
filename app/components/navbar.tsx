// No seu arquivo Navbar.tsx
"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button" // Usado para carrinho e botões de simulação
import { useCart } from "./cart-provider" // Verifique este caminho
import { SearchBar } from "../components/search-bar" // Verifique este caminho - pode ser "./search-bar" se na mesma pasta que UserNav
import { ProdutoItf } from "../utils/types/ProdutoItf" // Verifique este caminho
import { useEffect, useState } from "react";
// import LoginButton from "./LoginButton"; // SUBSTITUÍDO por UserNav

// Importe o UserNav - ajuste o caminho conforme sua estrutura de pastas.
// Se Navbar, UserNav e SearchBar estiverem todos em app/components/, por exemplo:
import { UserNav } from "./UserNav";
// Se SearchBar está em app/components/search-bar.tsx:
// import { SearchBar } from "./search-bar"; 

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { cart } = useCart(); // Certifique-se que useCart está configurado
  const totalItems = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  const [, setProduto] = useState<ProdutoItf[]>([]);

  const pathname = usePathname();
  const hideMainElementsRoutes = ['/login', '/cadastro', '/senha'];
  const showMainNavbarElements = !hideMainElementsRoutes.includes(pathname);

  // Estado para simular login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSimulateLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSimulateLogout = () => {
    setIsLoggedIn(false);
  };

  // useEffect(() => { /* Sua lógica de busca de dados, se houver */ }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div 
        className={`container h-16 flex items-center ${showMainNavbarElements ? 'justify-between gap-4' : 'justify-center'}`}
      >
        
        {/* Logo - Sua lógica de centralização atual está boa */}
        {showMainNavbarElements ? (
          <div className="flex-1 flex justify-start md:justify-center">
            <Link href="/" className="font-bold text-xl">
              Atura
            </Link>
          </div>
        ) : (
          <Link href="/" className="font-bold text-xl">
            Atura
          </Link>
        )}

        {/* Search (renderização condicional) */}
        {showMainNavbarElements && (
          <div className="hidden md:flex flex-[2] justify-center">
            {/* Certifique-se que o SearchBar está sendo importado corretamente */}
            <SearchBar /> 
          </div>
        )}
        
        {/* Botão de Simulação (Temporário - apenas para teste) */}
        {/* Posicionado para fácil acesso durante o desenvolvimento */}
        <div className="fixed bottom-4 left-4 z-[100]">
          {!isLoggedIn ? (
            <Button size="sm" onClick={handleSimulateLogin} variant="outline" className="bg-green-500 hover:bg-green-600 text-white">
              Simular Login
            </Button>
          ) : (
            <Button size="sm" onClick={handleSimulateLogout} variant="outline" className="bg-red-500 hover:bg-red-600 text-white">
              Simular Logout
            </Button>
          )}
        </div>

        {/* Carrinho e UserNav (substituindo LoginButton - renderização condicional) */}
        {showMainNavbarElements && (
          <div className="flex-1 flex justify-end items-center gap-2"> {/* Ajustei para não ter margem explícita aqui, o flex-1 cuida */}
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
            {/* Usando UserNav aqui */}
            <UserNav isLoggedIn={isLoggedIn} onLogout={handleSimulateLogout} />
          </div>
        )}
        
      </div>
    </header>
  )
}