"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputPesquisa } from "./InputPesquisa";
import { useAuthStore } from "../login/stores/authStore";
import { UserNav } from "./UseNav";

type CarrinhoItem = {
  produtoId: number;
  quantidade: number;
  preco_unitario: number;
  clienteId: string;
  produto: {
    id: number;
    nome: string;
    preco: number;
    foto?: string | null;
  };
};

export default function Header() {
  const pathname = usePathname();
  const hideMainElementsRoutes = ["/login", "/cadastro", "/senha"];
  const showMainNavbarElements = !hideMainElementsRoutes.includes(pathname);

  const { clienteLogado, deslogaCliente } = useAuthStore();
  const isLoggedIn = clienteLogado();

  const [totalItems, setTotalItems] = useState(0);

  const calcularTotal = () => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]") as CarrinhoItem[];
    const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    setTotalItems(total);
  };

  useEffect(() => {
    calcularTotal();

    // Atualiza ao disparar evento personalizado
    window.addEventListener("carrinhoAtualizado", calcularTotal);
    return () => {
      window.removeEventListener("carrinhoAtualizado", calcularTotal);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div
        className={`container h-16 flex items-center px-6 md:px-6 ${
          showMainNavbarElements ? "justify-between" : "justify-center"
        }`}
      >
        <div className="flex-1 flex justify-start">
          <Link href="/" className="font-bold text-xl">
            Atura
          </Link>
        </div>

        {showMainNavbarElements && (
          <>
            <div className="hidden md:flex flex-[2] justify-center max-w-md">
              <InputPesquisa />
            </div>

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

              <UserNav isLoggedIn={isLoggedIn} onLogout={deslogaCliente} />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
