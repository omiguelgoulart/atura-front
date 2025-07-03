import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthData = {
  id?: string;
  nome?: string;
  email: string;
  senha: string;
  tipo?: "cliente";
  codigo?: string;
};

type AuthStore = {
  isLoading: boolean;
  error: string | null;
  user: { id: string; nome: string; email: string } | null;

  login: (data: AuthData) => Promise<void>;
  cadastro: (data: AuthData) => Promise<void>;
  recuperarSenha: (data: Pick<AuthData, "email">) => Promise<void>;
  redefinirSenha: (data: Required<AuthData>) => Promise<void>;

  setError: (msg: string | null) => void;
  setUser: (user: AuthStore["user"]) => void;
  deslogaCliente: () => void;
  clienteLogado: () => boolean;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, _get) => ({
      isLoading: false,
      error: null,
      user: null,

      login: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          const result = await res.json();
          if (!res.ok) throw new Error(result.error || "Erro no login");

          const user = {
            id: result.id,
            nome: result.nome,
            email: result.email,
          };

          set({ user });

          // Salva os dados do cliente no cookie 'cliente'
          document.cookie = `cliente=${encodeURIComponent(
            JSON.stringify(user)
          )}; path=/;`;

          toast.success("Login realizado com sucesso!");
        } catch (err: unknown) {
          if (err instanceof Error) {
            set({ error: err.message });
          } else {
            set({ error: "Erro desconhecido" });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      cadastro: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL_API}/clientes`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            }
          );

          const result = await res.json();
          if (!res.ok) throw new Error(result.error || "Erro no cadastro");

          set({
            user: { id: result.id, nome: result.nome, email: result.email },
          });
        } catch (err: unknown) {
          if (err instanceof Error) {
            set({ error: err.message });
          } else {
            set({ error: "Erro desconhecido" });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      recuperarSenha: async ({ email }) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL_API}/login/envia-codigo`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            }
          );

          const result = await res.json();
          if (!res.ok) throw new Error(result.error || "Erro ao enviar código");
        } catch (err: unknown) {
          if (err instanceof Error) {
            set({ error: err.message });
          } else {
            set({ error: "Erro desconhecido" });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      redefinirSenha: async ({ email, codigo, senha }) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL_API}/login/recupera-senha`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, codigo, senha }),
            }
          );

          const result = await res.json();
          if (!res.ok)
            throw new Error(result.error || "Erro ao redefinir senha");
        } catch (err: unknown) {
          if (err instanceof Error) {
            set({ error: err.message });
          } else {
            set({ error: "Erro desconhecido" });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      deslogaCliente: () => set({ user: null }),

      clienteLogado: () => _get().user !== null,

      setError: (msg) => set({ error: msg }),

      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
