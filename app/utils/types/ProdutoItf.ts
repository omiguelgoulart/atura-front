import { MarcaItf } from "./MarcaItf"

export interface ProdutoItf {
    id: number
    nome: string
    descricao: string
    preco: number
    categoria: string
    estoque: number
    foto: string
    tamanho: number
    marcaId: number
    marca: MarcaItf
    notas?: string[]
    avaliacao?: number;
  }
  