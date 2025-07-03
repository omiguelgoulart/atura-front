import { Avaliacao } from "./AvaliacaoItf";

export interface Marca {
  id: number;
  nome: string;
}

export type CategoriaProduto = "MASCULINO" | "FEMININO" | "INFANTIL" | "UNISSEX";
export default interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: CategoriaProduto; // <- alterado aqui
  estoque: number;
  volumeMl: number;
  foto: string;
  marca: Marca;
  avaliacao: Avaliacao[];
}
