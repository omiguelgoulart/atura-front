"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { CardPerfume } from "./components/perfume-grid"
import FiltersSidebar from "./components/sidebar"
import type { ProdutoItf } from "./utils/types/ProdutoItf"
import Hero from "./components/Hero"

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutoItf[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    async function buscaDados() {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`)
        const dados = await response.json()
        setProdutos(dados)
      } catch (error) {
        console.error("Erro ao buscar produtos:", error)
      } finally {
        setLoading(false)
      }
    }
    buscaDados()
  }, [])

  // Filter products based on URL params
  const filteredProdutos = useMemo(() => {
    const marcaParam = searchParams.get("marca")
    const tipoParam = searchParams.get("tipo")

    if (!marcaParam && !tipoParam) {
      return produtos
    }

    return produtos.filter((produto) => {
      const marcaIds = marcaParam ? marcaParam.split(",").map(Number) : []
      const tipos = tipoParam ? tipoParam.split(",") : []

      const matchesBrand = marcaIds.length === 0 || marcaIds.includes(produto.marca.id)
      const matchesType = tipos.length === 0 || tipos.includes(produto.categoria)

      return matchesBrand && matchesType
    })
  }, [produtos, searchParams])

  const listaProdutos = filteredProdutos.map((produto) => <CardPerfume key={produto.id} data={produto} />)

  if (loading) {
    return (
      <div className="container py-8 px-6 md:py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando produtos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div>
        <Hero />
      </div>

      <div className="container py-8 px-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <FiltersSidebar produtos={produtos} />
          </div>

          <div className="space-y-4">
            {/* Mobile Filter Button */}
            <div className="md:hidden">
              <FiltersSidebar produtos={produtos} isMobile={true} />
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredProdutos.length === produtos.length
                  ? `${produtos.length} produtos encontrados`
                  : `${filteredProdutos.length} de ${produtos.length} produtos`}
              </p>
            </div>

            {/* Products Grid */}
            {filteredProdutos.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                {listaProdutos}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg font-medium text-muted-foreground mb-2">Nenhum produto encontrado</p>
                <p className="text-sm text-muted-foreground">Tente ajustar os filtros para ver mais resultados</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
