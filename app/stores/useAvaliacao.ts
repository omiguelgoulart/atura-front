"use client";

import { create } from "zustand";
import { Avaliacao } from "../utils/types/AvaliacaoItf";
import { toast } from "sonner";

// Define o tipo da store
interface AvaliacaoState {
  avaliacoes: Avaliacao[];                  // Lista de avaliações
  loading: boolean;                         // Estado de carregamento
  error: string | null;                     // Mensagem de erro, se houver
  adicionarAvaliacao: (nova: Avaliacao) => void;  // Adiciona uma nova localmente
  enviarAvaliacao: (avaliacao: Omit<Avaliacao, "id">) => Promise<void>; // Envia para o backend
  limparAvaliacoes: () => void;             // Limpa o estado local
}

export const useAvaliacao = create<AvaliacaoState>((set) => ({
  avaliacoes: [],
  loading: false,
  error: null,

  // Adiciona avaliação localmente no estado
  adicionarAvaliacao: (nova) =>
    set((state) => ({
      avaliacoes: [...state.avaliacoes, nova],
    })),

  // Envia a avaliação para o backend via fetch
  enviarAvaliacao: async (avaliacao) => {
    set({ loading: true, error: null });

    try {
      // 🔍 Prepara o corpo da requisição com validação de tipo
      const body = {
        clienteId: (avaliacao.clienteId),
        produtoId: Number(avaliacao.produtoId),
        comentario: avaliacao.comentario,
        nota: Number(avaliacao.nota),
      };

      // 🔁 Envia para a API
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      // 🚫 Erro na resposta da API
      if (!res.ok) {
        const erro = await res.json();
        throw new Error(erro?.error || "Erro ao enviar avaliação");
      }

      // ✅ Sucesso: pega a avaliação retornada
      const nova = await res.json();

      // 🧠 Atualiza estado com nova avaliação
      set((state) => ({
        avaliacoes: [...state.avaliacoes, nova],
      }));

      toast.success("Avaliação enviada com sucesso!");
    } catch (err) {
      console.error("❌ Erro no envio da avaliação:", err);
      toast.error("Erro ao enviar avaliação");
      set({ error: "Erro ao enviar avaliação" });
    } finally {
      set({ loading: false });
    }
  },

  // Limpa todas as avaliações do estado
  limparAvaliacoes: () => set({ avaliacoes: [] }),
}));
