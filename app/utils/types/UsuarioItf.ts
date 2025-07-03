export type UsuarioTipo = "cliente" | "admin";

export interface UsuarioLogado {
  id: number;
  nome: string;
  email: string;
  tipo: UsuarioTipo;
  token?: string; // se usar JWT
}
