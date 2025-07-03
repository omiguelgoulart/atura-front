"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuthStore } from "../login/stores/authStore";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  foto?: string | null;
};

type ItemCarrinho = {
  produtoId: number;
  quantidade: number;
  preco_unitario: number;
  clienteId: string;
  produto: Produto;
};

export default function CarrinhoPage() {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const { user } = useAuthStore(); // Supondo que você tenha um hook para obter o usuário logado

  useEffect(() => {
    const data = localStorage.getItem("carrinho");
    if (data) {
      setItens(JSON.parse(data));
    }
  }, []);

  const salvarNoLocalStorage = (novoCarrinho: ItemCarrinho[]) => {
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    setItens(novoCarrinho);
  };

  const remover = (produtoId: number) => {
    const novoCarrinho = itens.filter((item) => item.produtoId !== produtoId);
    salvarNoLocalStorage(novoCarrinho);
  };

  const limpar = () => {
    localStorage.removeItem("carrinho");
    setItens([]);
  };

  const atualizarQuantidade = (produtoId: number, novaQtd: number) => {
    if (novaQtd < 1) return;
    const novoCarrinho = itens.map((item) =>
      item.produtoId === produtoId ? { ...item, quantidade: novaQtd } : item
    );
    salvarNoLocalStorage(novoCarrinho);
  };

const finalizarPedido = async () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

  if (!user?.id || carrinho.length === 0) {
    toast.error("Carrinho vazio ou usuário não identificado.");
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pedido/finalizar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clienteId: user.id,
        itens: carrinho,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao finalizar pedido");
    }

    toast.success("Pedido finalizado com sucesso!");
    limpar();
  } catch (error) {
    console.error(error);
    toast.error("Erro ao salvar pedido. Tente novamente.");
  }
};

  const total = itens.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  );

  if (itens.length === 0) {
    return (
      <p className="p-4 text-center text-gray-500">
        Seu carrinho está vazio.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Seu Carrinho</h1>

      <div className="rounded-lg border divide-y">
        {itens.map((item) => (
          <div key={item.produtoId} className="flex items-start gap-4 p-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <img
                src={item.produto.foto || "/placeholder.svg"}
                alt={item.produto.nome}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex-1">
              <h2 className="font-medium">{item.produto.nome}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => atualizarQuantidade(item.produtoId, item.quantidade - 1)}
                >
                  –
                </Button>
                <span className="text-sm">{item.quantidade}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => atualizarQuantidade(item.produtoId, item.quantidade + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="text-right space-y-2">
              <p className="font-medium">
                R$ {(item.produto.preco * item.quantidade)
                  .toFixed(2)
                  .replace(".", ",")}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => remover(item.produtoId)}
              >
                Remover
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-semibold">
          Total: R$ {total.toFixed(2).replace(".", ",")}
        </p>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={limpar}>
            Limpar Carrinho
          </Button>
          <Button onClick={finalizarPedido}>Finalizar Pedido</Button>
        </div>
      </div>
    </div>
  );
}
