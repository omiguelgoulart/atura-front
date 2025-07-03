"use client";

import { createContext, useState } from "react";

export interface ProdutoCarrinho {
  id: string;
  nome: string;
  quantity: number;
}

interface CarrinhoContextType {
  cart: ProdutoCarrinho[];
  adicionar: (produto: ProdutoCarrinho) => void;
  remover: (id: string) => void;
  limpar: () => void;
}

export const CarrinhoContext = createContext<CarrinhoContextType | null>(null);

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ProdutoCarrinho[]>([]);

  const adicionar = (produto: ProdutoCarrinho) => {
    setCart((prev) => {
      const existente = prev.find((item) => item.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantity: item.quantity + produto.quantity }
            : item
        );
      }
      return [...prev, produto];
    });
  };

  const remover = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const limpar = () => {
    setCart([]);
  };

  return (
    <CarrinhoContext.Provider value={{ cart, adicionar, remover, limpar }}>
      {children}
    </CarrinhoContext.Provider>
  );
}
