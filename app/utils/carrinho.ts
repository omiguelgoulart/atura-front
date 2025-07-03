// utils/carrinho.ts

// Define a type for cart items
export interface CarrinhoItem {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
}

export function atualizarCarrinhoStorage(itens: CarrinhoItem[]) {
  localStorage.setItem("carrinho", JSON.stringify(itens));
  window.dispatchEvent(new Event("carrinhoAtualizado"));
}
