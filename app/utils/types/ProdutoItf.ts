import { MarcaItf } from "./MarcaItf"
import { ReviewItf } from "./ReviewITF"

export interface ProdutoItf {
    id: number
    nome: string
    descricao: string
    preco: number
    categoria: string
    estoque: number
    foto: string
    volumeMl: number
    marcaId: number
    marca: MarcaItf
    notas?: string[]
    avaliacao?: ReviewItf[];
  }
  