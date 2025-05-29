import { ClienteItf } from "./ClienteIf";

export interface ReviewItf {
    id?: number;
    nota: number;
    comentario?: string;
    date: string;
    produtoId: string;
    clienteId: number;
    cliente?: ClienteItf;
}