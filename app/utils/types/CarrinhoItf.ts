import  ProdutoITF  from "./ProdutoItf";


export interface Carrinho {
  id: number;
  status: "CARRINHO" | "PEDIDO" | "FINALIZADO";
  quantidade: number;
  preco_unitario: number; // pode usar string se vier como string do backend
  clienteId: string;
  produtoId: number;
  pedidoId: number | null;
  criadoEm: string;
  atualizadoEm: string;
  produto: ProdutoITF;
}
