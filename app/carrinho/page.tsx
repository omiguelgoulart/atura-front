"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CarrinhoItf } from "../utils/types/CarrinhoItf"
import { useClienteStore } from "../context/ClienteContext"
import { toast } from "sonner"

export default function CarrinhoPage() {
  const [carrinho, setCarrinho] = useState<CarrinhoItf[]>([])
  const { cliente } = useClienteStore()

  useEffect(() => {
    async function fetchCarrinho(): Promise<void> {
      try {
        if (!cliente.id) throw new Error("Cliente não identificado")

        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/carrinho/car/${cliente.id}/itens`)
        if (!response.ok) throw new Error("Erro ao buscar carrinho")

        const dados: CarrinhoItf[] = await response.json()
        setCarrinho(dados)
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error)
      }
    }

    fetchCarrinho()
  }, [cliente.id])

  const total = carrinho.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  )

  async function finalizarPedido() {
    try {
      if (!cliente.id) throw new Error("Cliente não identificado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/finalizar/${cliente.id}/pedido`, {
        method: "POST",
      })

      if (!response.ok) throw new Error("Erro ao finalizar pedido")

      const data = await response.json()
      toast.success("Pedido realizado com sucesso!")
      setCarrinho(data) // limpa o carrinho localmente
    } catch (error) {
      console.error(error)
      toast.error("Falha ao finalizar pedido.")
    }
  }

  if (!cliente.id) {
    return <p className="p-4 text-center text-gray-500">Você precisa estar logado para ver o carrinho.</p>
  }

  if (carrinho.length === 0) {
    return <p className="p-4 text-center text-gray-500">Seu carrinho está vazio.</p>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Seu Carrinho</h1>

      <div className="rounded-lg border divide-y">
        {carrinho.map((item) => (
          <div key={item.id} className="flex items-start gap-4 p-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-md border shrink-0">
              <img
                src={item.produto.foto || "/placeholder.svg"}
                alt={item.produto.nome}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-medium">{item.produto.nome}</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Quantidade: {item.quantidade}
              </p>
            </div>
            <div className="font-medium text-right whitespace-nowrap">
              R$ {(item.produto.preco * item.quantidade).toFixed(2).replace(".", ",")}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-semibold">Total: R$ {total.toFixed(2).replace(".", ",")}</p>
        <Button onClick={finalizarPedido}>Finalizar Pedido</Button>
      </div>
    </div>
  )
}
