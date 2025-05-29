"use client"

import { useClienteStore } from "@/app/context/ClienteContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface AddProdutoCarrinhoProps {
  produtoId: number
  quantidade?: number
  
}

export default function AddCarrinho({
  produtoId,
  quantidade = 1,
}: AddProdutoCarrinhoProps) {
  const { cliente } = useClienteStore()
  const router = useRouter()

  const adicionarAoCarrinho = async () => {
    if (!cliente || !cliente.id) {
      toast.warning("Você precisa estar logado para adicionar ao carrinho.")
      router.push("/login")
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/carrinho`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // você pode adicionar token se ainda for necessário para autenticação no backend
        },
        body: JSON.stringify({
          produtoId,
          quantidade,
          clienteId: cliente.id, // envio opcional, caso necessário no backend
        }),
      })

      const res = await response.json()

      if (!response.ok) {
        throw new Error(res.error || "Erro ao adicionar ao carrinho")
      }

      toast.success("Produto adicionado ao carrinho!")
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Erro desconhecido ao adicionar ao carrinho")
      }
    }
  }

  return (
    <Button onClick={adicionarAoCarrinho} className="w-full">
      Adicionar ao carrinho
    </Button>
  )
}
