import { ClienteItf } from "./ClienteIf";

export interface Avaliacao {
  id?: number;
  nota: number;
  comentario?: string;
  date: string;
  produtoId: number;  // ✅ troquei para number
  clienteId: string;
  cliente?: ClienteItf;
}
