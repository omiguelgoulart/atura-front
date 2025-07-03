"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search, X, } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Produto {
  id: number
  nome: string
  descricao: string
  preco: number
  foto: string
  marca: {
    nome: string
  }
}

export function InputPesquisa() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

 
  useEffect(() => {
    const query = searchParams.get("q")
    if (query) setSearchTerm(query)
  }, [searchParams])

  
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim().length > 1) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos/pesquisa/${searchTerm}`)
          const data = await response.json()
          setFilteredProdutos(data.slice(0, 5))
          setIsDropdownOpen(true)
        } catch (error) {
          console.error("Erro ao buscar produtos:", error)
        }
      } else {
        setFilteredProdutos([])
        setIsDropdownOpen(false)
      }
    }, 400)

    return () => clearTimeout(delayDebounce)
  }, [searchTerm])

  const handlePerfumeClick = (id: number) => {
    router.push(`/perfume/${id}`)
    setIsDropdownOpen(false)
    setSearchTerm("")
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    setFilteredProdutos([])
    setIsDropdownOpen(false)

    if (pathname === "/") {
      const params = new URLSearchParams(searchParams.toString())
      params.delete("q")
      router.push(`/?${params.toString()}`)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  setIsDropdownOpen(false)

  if (filteredProdutos.length > 0) {
    // Redireciona para o primeiro produto encontrado
    router.push(`/perfume/${filteredProdutos[0].id}`)
    setSearchTerm("")
  } else {
    // Fallback: comportamento padrão (opcional)
    if (pathname === "/") {
      const params = new URLSearchParams(searchParams.toString())
      if (searchTerm) {
        params.set("q", searchTerm)
      } else {
        params.delete("q")
      }
      router.push(`/?${params.toString()}`)
    } else {
      router.push(`/${encodeURIComponent(searchTerm)}`)
    }
  }
}


  const handleSearchFocus = () => {
    if (filteredProdutos.length > 0) setIsDropdownOpen(true)
  }



  return (
    <div className="relative flex-1 max-w-sm mx-4" ref={searchRef}>
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar perfumes..."
            className="pl-10 pr-20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleSearchFocus}
          />
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-10 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Limpar busca</span>
            </Button>
          )}
        </div>
      </form>

      
      {isDropdownOpen && filteredProdutos.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-[400px] overflow-auto">
          <CardContent className="p-0">
            {filteredProdutos.map((produto) => (
              <div
                key={produto.id}
                className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer border-b last:border-0"
                onClick={() => handlePerfumeClick(produto.id)}
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-md flex-shrink-0">
                  <img src={produto.foto || "/placeholder.svg"} alt={produto.nome} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{produto.nome}</h4>
                  <p className="text-xs text-muted-foreground truncate">{produto.marca?.nome}</p>
                </div>
                <div className="text-sm font-bold">R$ {produto.preco.toFixed(2).replace(".", ",")}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {isDropdownOpen && searchTerm && filteredProdutos.length === 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Nenhum produto encontrado</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
