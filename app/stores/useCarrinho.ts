import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Carrinho } from "../utils/types/CarrinhoItf";

type CarrinhoStore = {
  itens: Carrinho[];
  adicionar: (item: Carrinho) => void;
  remover: (produtoId: number) => void;
  limpar: () => void;
  atualizarQuantidade: (produtoId: number, novaQtd: number) => void;
};

export const useCarrinhoStore = create<CarrinhoStore>()(
  persist(
    (set, get) => ({
      itens: [],
      adicionar: (item) => {
        const existente = get().itens.find(i => i.produtoId === item.produtoId);
        if (existente) {
          set({
            itens: get().itens.map(i =>
              i.produtoId === item.produtoId
                ? { ...i, quantidade: i.quantidade + item.quantidade }
                : i
            ),
          });
        } else {
          set({ itens: [...get().itens, item] });
        }
      },
      remover: (produtoId) => {
        set({ itens: get().itens.filter(i => i.produtoId !== produtoId) });
      },
      limpar: () => {
        set({ itens: [] });
      },
      atualizarQuantidade: (produtoId, novaQtd) => {
        set({
          itens: get().itens.map(i =>
            i.produtoId === produtoId ? { ...i, quantidade: novaQtd } : i
          ),
        });
      },
    }),
    {
      name: "carrinho-store", // chave no localStorage
    }
  )
);
