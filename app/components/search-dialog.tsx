"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { perfumes } from "@/lib/data"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function SearchDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedType, setSelectedType] = useState("")

  // Get unique brands and types for filters
  const brands = Array.from(new Set(perfumes.map((p) => p.brand)))
  const types = Array.from(new Set(perfumes.map((p) => p.type)))

  // Filter perfumes based on criteria
  const filteredPerfumes = perfumes.filter((perfume) => {
    const matchesSearch =
      searchTerm === "" ||
      perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perfume.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPrice = perfume.price >= priceRange[0] && perfume.price <= priceRange[1]

    const matchesBrand = selectedBrand === "" || perfume.brand === selectedBrand

    const matchesType = selectedType === "" || perfume.type === selectedType

    return matchesSearch && matchesPrice && matchesBrand && matchesType
  })

  const handleReset = () => {
    setSearchTerm("")
    setPriceRange([0, 500])
    setSelectedBrand("")
    setSelectedType("")
  }

  const handlePerfumeClick = (id: string) => {
    router.push(`/perfume/${id}`)
    setOpen(false)
  }

  const maxPrice = Math.max(...perfumes.map((p) => p.price))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="mr-2">
          <Search className="h-5 w-5" />
          <span className="sr-only">Buscar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Buscar Perfumes</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Digite o nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            {searchTerm && (
              <Button variant="ghost" size="icon" onClick={() => setSearchTerm("")}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Marca</label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as marcas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as marcas</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Faixa de Preço</label>
              <span className="text-sm text-muted-foreground">
                R$ {priceRange[0].toFixed(2).replace(".", ",")} - R$ {priceRange[1].toFixed(2).replace(".", ",")}
              </span>
            </div>
            <Slider
              defaultValue={[0, maxPrice]}
              min={0}
              max={maxPrice}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="py-4"
            />
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleReset}>
              Limpar Filtros
            </Button>
            <div className="text-sm text-muted-foreground">{filteredPerfumes.length} perfumes encontrados</div>
          </div>
        </div>

        {filteredPerfumes.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredPerfumes.map((perfume) => (
              <Card
                key={perfume.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handlePerfumeClick(perfume.id)}
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <Image src={perfume.image || "/placeholder.svg"} alt={perfume.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{perfume.name}</h4>
                    <p className="text-sm text-muted-foreground">{perfume.brand}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="font-bold">R$ {perfume.price.toFixed(2).replace(".", ",")}</span>
                      <span className="text-xs text-muted-foreground">{perfume.type}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhum perfume encontrado com os filtros selecionados.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
