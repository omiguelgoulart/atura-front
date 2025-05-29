// app/components/navbar.tsx (Nova versão unificada)
"use client"

import Link from "next/link";
import { Search, ShoppingCart, ChevronRight, Star, UserCircle, LogOut, LogIn } from "lucide-react"; // Adicionei ícones do UserNav
import { Button } from "@/components/ui/button";
import { useCart } from "./cart-provider"; // Verifique o caminho
import { UserNav } from "./UserNav"; // Nosso componente para login/avatar (verifique o caminho)
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react"; // Adicionado useEffect se necessário

export default function Navbar() {
  const { cart } = useCart(); // Certifique-se que o provider está funcionando
  const totalItems = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  const pathname = usePathname();
  const hideMainElementsRoutes = ['/login', '/cadastro', '/senha', '/perfil']; // Adicione /perfil se quiser um header mínimo lá também
  
  // Se showMainNavbarElements for true, significa que NÃO estamos em uma página de auth/perfil simples.
  // Se for false, estamos em uma dessas páginas e o layout do header é simplificado/centralizado.
  const showComplexHeaderLayout = !hideMainElementsRoutes.includes(pathname);

  // Estado para simular login (eventualmente virá de um contexto global)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSimulateLogin = () => setIsLoggedIn(true);
  const handleSimulateLogout = () => setIsLoggedIn(false);

  // Links de navegação do novo design
  const navLinks = [
    { href: "#", label: "Novidades" },
    { href: "#", label: "Masculinos" },
    { href: "#", label: "Femininos" },
    { href: "#", label: "Marcas" },
    { href: "#", label: "Ofertas" },
  ];

  return (
    <header className="border-b border-gray-800 bg-black text-white sticky top-0 z-50">
      <div 
        className={`container mx-auto px-4 py-4 flex items-center ${showComplexHeaderLayout ? 'justify-between' : 'justify-center'}`}
      >
        {/* Logo e Navegação Principal (ou apenas Logo Centralizado) */}
        {showComplexHeaderLayout ? (
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              Atura
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : (
          // Logo centralizado para páginas de auth/perfil simples
          <div className="flex justify-center items-center w-full"> {/* Necessário para centralizar o Link em alguns casos */}
             <Link href="/" className="text-xl font-bold">
                Atura
             </Link>
          </div>
        )}

        {/* Elementos da Direita: Busca, Carrinho, UserNav (condicionais) */}
        {showComplexHeaderLayout && (
          <div className="flex items-center gap-3 md:gap-4">
            {/* Botão de Simulação (Temporário - apenas para teste) */}
            {/* Posicionado aqui para melhor visibilidade durante o desenvolvimento do header */}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
              {!isLoggedIn ? (
                <Button size="sm" onClick={handleSimulateLogin} variant="outline" className="bg-green-500 hover:bg-green-600 text-white border-green-700">
                  Simular Login
                </Button>
              ) : (
                 <Button size="sm" onClick={handleSimulateLogout} variant="outline" className="bg-red-500 hover:bg-red-600 text-white border-red-700">
                  Simular Logout
                </Button>
              )}
            </div>
            
            {/* Search Input do Novo Design */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar perfumes..."
                className="bg-gray-900 border border-gray-800 rounded-full py-2 pl-10 pr-4 text-sm w-48 lg:w-64 focus:outline-none focus:border-gray-700 transition-all duration-300 ease-in-out focus:w-56 lg:focus:w-72"
              />
            </div>
            
            {/* Carrinho */}
            <Button variant="ghost" size="icon" className="relative hover:bg-gray-800 p-2" asChild>
              <Link href="/carrinho">                          
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Carrinho</span>
              </Link>
            </Button>

            {/* UserNav (Login/Avatar) */}
            <UserNav isLoggedIn={isLoggedIn} onLogout={handleSimulateLogout} />
          </div>
        )}
      </div>
    </header>
  );
}