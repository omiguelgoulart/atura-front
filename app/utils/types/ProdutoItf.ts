// ./utils/types/ProdutoItf.ts
import { MarcaItf } from "./MarcaItf";

// Defina FotoItf conforme a estrutura da sua tabela de Fotos
export interface FotoItf {
  id: number;
  url: string;
  // ... quaisquer outros campos relevantes da foto
}

export interface ProdutoItf {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  estoque: number;
  foto: string;        // URL da foto principal
  volumeMl?: number;   // Opcional
  marcaId: number;
  marca: MarcaItf;
  fotos?: FotoItf[];   // Opcional, pois /produtos/filtro pode não incluir
  notas?: string[];
  avaliacao?: number;
  // createdAt?: string | Date; // Se for usar
  // updatedAt?: string | Date; // Se for usar
}
