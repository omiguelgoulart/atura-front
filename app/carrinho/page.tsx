"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface Produto {
  id: number
  nome: string
  preco: number
  foto: string
}

interface ItemCarrinho {
  id: number
  quantidade: number
  produtoId: number
  clienteId: string
  produto: Produto
}

export default function CarrinhoPage() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL_API}/carrinho`)
      .then((res) => res.json())
      .then((data) => setCarrinho(data))
      .catch((err) => console.error("Erro ao carregar carrinho:", err))
      .finally(() => setLoading(false))
  }, [])

  const total = carrinho.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0)

  const finalizarPedido = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pedido`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "PENDENTE",
          total,
          date: new Date().toISOString(),
          itensPedido: carrinho.map((item) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            preco_unitario: item.produto.preco
          }))
        })
      })

      if (!response.ok) throw new Error("Erro ao finalizar pedido")
      alert("Pedido realizado com sucesso!")
      setCarrinho([])
    } catch (error) {
      console.error(error)
      alert("Falha ao enviar pedido.")
    }
  }

  if (loading) return <p className="p-4">Carregando carrinho...</p>

  if (carrinho.length === 0) {
    return <p className="p-4 text-center text-gray-500">Seu carrinho está vazio.</p>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Seu Carrinho</h1>

      <div className="rounded-lg border">
        {carrinho.map((item, index) => (
          <div key={item.id}>
            <div className="flex items-start gap-4 p-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-md border">
                <img src={item.produto.foto} alt={item.produto.nome} />
              </div>
              <div className="flex-1">
                <h2 className="font-medium">{item.produto.nome}</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Quantidade: {item.quantidade}
                </p>
              </div>
              <div className="font-medium text-right">
                R$ {(item.produto.preco * item.quantidade).toFixed(2).replace(".", ",")}
              </div>
            </div>
            {index < carrinho.length - 1 && <Separator />}
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
