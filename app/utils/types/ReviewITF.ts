import { ClienteItf } from "./ClienteIf";
import { ProdutoItf } from "./ProdutoItf";

export interface ReviewItf {
    id?: number;
    nota: number;
    comentario?: string;
    date: string;
    produtoId: ProdutoItf;
    clienteId: ClienteItf;
}