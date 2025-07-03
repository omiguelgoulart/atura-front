import { create } from "zustand";
import { toast } from "sonner";
import  Produto  from "../utils/types/ProdutoItf";

type ProdutoStore = {
  produtos: Produto[];
  todosProdutos?: Produto[];
  produto?: Produto;
  loading: boolean;
  erro: string | null;

  carregarProdutos: () => Promise<void>;
  carregarProdutoPorId: (id: number) => Promise<void>;
  filtrarProdutos: (filtros: {
    marcaId?: string;
    categoria?: string;
    precoMin?: string;
    precoMax?: string;
  }) => void;
  produtoSelecionado: (produtoId: number) => Produto | undefined;
};

export const useProdutos = create<ProdutoStore>((set, get) => ({
  produtos: [],
  todosProdutos: [],
  produto: undefined,
  loading: false,
  erro: null,

  carregarProdutos: async () => {
    set({ loading: true, erro: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao carregar produtos");

      const data = await res.json();

      set({
        produtos: data,
        todosProdutos: data,
      });
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      set({ erro: "Erro ao carregar produtos" });
      toast.error("Erro ao carregar produtos");
    } finally {
      set({ loading: false });
    }
  },

  carregarProdutoPorId: async (id: number) => {
    set({ loading: true, erro: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos/${id}`);
      if (!res.ok) throw new Error("Erro ao carregar produto");
      const data = await res.json();
      set({ produto: data });
    } catch (error) {
      console.error("Erro ao carregar produto:", error);
      set({ erro: "Erro ao carregar produto" });
    } finally {
      set({ loading: false });
    }
  },

  filtrarProdutos: (filtros) => {
    const { todosProdutos } = get();
    const produtosFiltrados = (todosProdutos ?? []).filter((produto) => {
      const marcaMatch = filtros.marcaId
        ? produto.marca?.id === Number(filtros.marcaId)
        : true;
      const categoriaMatch = filtros.categoria
        ? produto.categoria === filtros.categoria
        : true;
      const precoMinMatch = filtros.precoMin
        ? produto.preco >= Number(filtros.precoMin)
        : true;
      const precoMaxMatch = filtros.precoMax
        ? produto.preco <= Number(filtros.precoMax)
        : true;

      return marcaMatch && categoriaMatch && precoMinMatch && precoMaxMatch;
    });

    set({ produtos: produtosFiltrados });
  },

  produtoSelecionado: (produtoId) => {
    const { produtos } = get();
    return produtos.find((produto) => produto.id === produtoId);
  },
}));
