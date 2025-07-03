import { ClienteItf } from "./ClienteIf";

export interface Avaliacao {
  id?: number;
  nota: number;
  comentario?: string;
  date: string;
  produtoId: number; // ✅ troquei para number
  clienteId: string;
  cliente?: ClienteItf;
  respostas?: Respostas[];
  produto?: {
    id: number;
    nome: string;
    imagem: string;
  };
}

export interface Respostas {
  mensagem: string;
  admin?: {
    nome: string;
  };
  respondidoEm?: string;
}