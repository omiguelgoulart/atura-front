"use client"

import { Star, StarHalf } from "lucide-react"
import { AddToCartButton } from "@/app/components/add-carrinho-button"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ProdutoItf } from "@/app/utils/types/ProdutoItf"


export default function ProdutoPage() {
  const params = useParams()
  const [produto, setProduto] = useState<ProdutoItf>()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos/${params.produtoId}`)
      const dados = await response.json()
      setProduto(dados)
    }
    buscaDados()
  }, [])

  

  return (
    <div className="container py-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-2">
        {/* IMAGEM */}
        <div className="flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-lg border">
            <img
              src={produto?.foto || "/placeholder.svg"}
              alt=""
              className="object-cover"
            />
          </div>
        </div>

        
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{produto?.nome}</h1>

          <div className="flex items-center gap-1">
            {Array(Math.floor(4.5)) 
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            {4.5 % 1 !== 0 && <StarHalf className="h-5 w-5 fill-amber-400 text-amber-400" />}
            <span className="ml-2 text-sm text-muted-foreground">(4.5)</span>
          </div>

          <div className="text-3xl font-bold">R$ {produto?.preco.toFixed(2).replace(".", ",")}</div>
          <div className="mt-2 text-muted-foreground">
            {produto?.volumeMl}ml • {produto?.categoria}
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Descrição</h3>
            <p className="text-muted-foreground">{produto?.descricao}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Notas</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium">Topo</h4>
                <p className="text-sm text-muted-foreground">Ex: Bergamota</p>
              </div>
              <div>
                <h4 className="font-medium">Coração</h4>
                <p className="text-sm text-muted-foreground">Ex: Jasmim</p>
              </div>
              <div>
                <h4 className="font-medium">Base</h4>
                <p className="text-sm text-muted-foreground">Ex: Cedro</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
          {produto && <AddToCartButton perfume={produto} />}

          </div>
        </div>
      </div>
    </div>
  )
}
