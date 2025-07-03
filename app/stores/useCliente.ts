// app/stores/useCliente.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { UsuarioLogado } from "../utils/types/UsuarioItf";

interface ClienteStore {
  cliente: UsuarioLogado | null;
  loading: boolean;
  erro: string | null;

  login: (email: string, senha: string) => Promise<boolean>;
  cadastrar: (nome: string, email: string, senha: string) => Promise<boolean>;
  deslogaCliente: () => void;
  estaLogado: () => boolean;
  ehAdmin: () => boolean;
}

export const useCliente = create<ClienteStore>()(
  persist(
    (set, get) => ({
      cliente: null,
      loading: false,
      erro: null,

      // LOGIN
      login: async (email, senha) => {
        set({ loading: true, erro: null });
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
          });

          if (!res.ok) throw new Error("Falha no login");

          const usuario: UsuarioLogado = await res.json();
          set({ cliente: usuario });
          toast.success("Login realizado com sucesso!");
          return true;
        } catch {
          set({ erro: "Erro ao fazer login" });
          toast.error("Email ou senha inválidos");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      // CADASTRO
      cadastrar: async (nome, email, senha) => {
        set({ loading: true, erro: null });
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cliente`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha, tipo: "cliente" }),
          });

          if (!res.ok) throw new Error("Erro ao cadastrar");

          const usuario: UsuarioLogado = await res.json();
          set({ cliente: usuario });
          toast.success("Cadastro realizado com sucesso!");
          return true;
        } catch {
          set({ erro: "Erro ao cadastrar" });
          toast.error("Erro ao cadastrar. Verifique os dados.");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      deslogaCliente: () => {
        set({ cliente: null });
        toast("Você saiu da conta");
      },

      estaLogado: () => !!get().cliente,
      ehAdmin: () => get().cliente?.tipo === "admin",
    }),
    {
      name: "cliente-store",
      partialize: (state) => ({ cliente: state.cliente }),
    }
  )
);
