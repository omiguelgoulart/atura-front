"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/login/stores/authStore";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  foto?: string | null;
};

type AddCarrinhoItem = {
  produtoId: number;
  quantidade: number;
  preco_unitario: number;
  clienteId: string;
  produto: Produto;
};

interface AddCarrinhoProps {
  produto: Produto;
  quantidade?: number;
}

export default function AddCarrinho({ produto, quantidade = 1 }: AddCarrinhoProps) {
  const router = useRouter();
  const { user, clienteLogado } = useAuthStore();

  const handleAdd = () => {
    if (!clienteLogado() || !user?.id) {
      toast.warning("Faça login para adicionar ao carrinho.");
      return router.push("/login");
    }

    const key = "carrinho";
    const atual: AddCarrinhoItem[] = JSON.parse(localStorage.getItem(key) || "[]");

    const index = atual.findIndex((i) => i.produtoId === produto.id);

    if (index >= 0) {
      atual[index].quantidade += quantidade;
    } else {
      atual.push({
        produtoId: produto.id,
        quantidade,
        preco_unitario: produto.preco,
        clienteId: user.id,
        produto,
      });
    }

    localStorage.setItem(key, JSON.stringify(atual));
    setTimeout(() => {
      console.log("Carrinho salvo", localStorage.getItem(key));
    }, 500);
    toast.success("Produto adicionado ao carrinho!");
  };

  return <Button onClick={handleAdd}>Adicionar ao carrinho</Button>;
}
