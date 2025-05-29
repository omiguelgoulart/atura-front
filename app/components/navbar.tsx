<<<<<<< HEAD
// No seu arquivo Navbar.tsx
"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button"; // Usado para carrinho e botões de simulação
import { useCart } from "./cart-provider"; // Verifique este caminho
import { SearchBar } from "../components/search-bar"; // Verifique este caminho - pode ser "./search-bar" se na mesma pasta que UserNav
import { useState } from "react";
import { UserNav } from "./UserNav";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { cart } = useCart(); // Certifique-se que useCart está configurado
  const totalItems = cart
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;
=======
"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button" 
import { useCart } from "./cart-provider"
import { SearchBar } from "../components/search-bar" 
import { ProdutoItf } from "../utils/types/ProdutoItf"
import { useEffect, useState } from "react";
import { UserNav } from "./UserNav";

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { cart } = useCart(); 
  const totalItems = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  const [, setProduto] = useState<ProdutoItf[]>([]);
>>>>>>> 5745a66e91d226803c18c8558283e81c0aa65443

  const pathname = usePathname();
  const hideMainElementsRoutes = ["/login", "/cadastro", "/senha"];
  const showMainNavbarElements = !hideMainElementsRoutes.includes(pathname);


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSimulateLogout = () => {
    setIsLoggedIn(false);
  };

  

  return (
<<<<<<< HEAD
   <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div
  className={`container h-16 flex items-center px-6 md:px-6 ${
    showMainNavbarElements ? "justify-between" : "justify-center"
  }`}
>
    {/* Logo */}
    {showMainNavbarElements ? (
      <div className="flex-1 flex justify-start">
        <Link href="/" className="font-bold text-xl">
          Atura
        </Link>
=======
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div 
        className={`container h-16 flex items-center ${showMainNavbarElements ? 'justify-between gap-4' : 'justify-center'}`}
      >
        
       
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

        {showMainNavbarElements && (
          <div className="hidden md:flex flex-[2] justify-center">
            
            <SearchBar /> 
          </div>
        )}
        
       
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


        {showMainNavbarElements && (
          <div className="flex-1 flex justify-end items-center gap-2"> 
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
            
            <UserNav isLoggedIn={isLoggedIn} onLogout={handleSimulateLogout} />
          </div>
        )}
        
>>>>>>> 5745a66e91d226803c18c8558283e81c0aa65443
      </div>
    ) : (
      <Link href="/" className="font-bold text-xl">
        Atura
      </Link>
    )}

    {/* Search */}
    {showMainNavbarElements && (
      <div className="hidden md:flex flex-[2] justify-center max-w-md">
        <SearchBar />
      </div>
    )}

    {/* Carrinho e usuário */}
    {showMainNavbarElements && (
      <div className="flex-1 flex justify-end items-center gap-3">
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

        <UserNav isLoggedIn={isLoggedIn} onLogout={handleSimulateLogout} />
      </div>
    )}
  </div>
</header>
  );
}
