"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FilterIcon } from "lucide-react"
import {  Sheet,  SheetContent,  SheetHeader,  SheetTitle,  SheetTrigger,  SheetClose} from "@/components/ui/sheet"
import { ProdutoItf } from "../utils/types/ProdutoItf"

interface FiltersSidebarProps {
  onReset: () => void
  isMobile?: boolean
  maxPrice: number
}

interface FormValues {
  brandIds: number[]
  types: string[]
}

export default function Sidebar({
  onReset,
  isMobile = false,
  
}: FiltersSidebarProps) {
  const [produtos, setProdutos] = useState<ProdutoItf[]>([])
  const router = useRouter()

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { brandIds: [], types: [] }
  })

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`)
        const data: ProdutoItf[] = await response.json()
        setProdutos(data)
      } catch (error) {
        console.error("Erro ao buscar produtos:", error)
      }
    }

    fetchProdutos()
  }, [])

  
  const marcasUnicas = Array.from(
    new Map(produtos.map((p) => [p.marca.id, p.marca])).values()
  )

  const categoriasUnicas = Array.from(new Set(produtos.map((p) => p.categoria)))

  const onSubmit = (data: FormValues) => {
    const params = new URLSearchParams()

    if (data.brandIds.length > 0) {
      
      params.set("marca", String(data.brandIds[0]))
    }
    if (data.types.length > 0) {
      params.set("tipo", data.types[0])
    }

    router.push(`/?${params.toString()}`)
  }

  const FiltersContent = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
     
      <div>
        <h3 className="text-lg font-medium mb-3">Marcas</h3>
        <div className="space-y-2">
          {marcasUnicas.map((marca) => (
            <Controller
              key={marca.id}
              name="brandIds"
              control={control}
              render={({ field }) => {
                const value: number[] = field.value || []
                return (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${marca.id}`}
                      checked={value.includes(marca.id)}
                      onCheckedChange={(checked) => {
                        field.onChange(
                          checked
                            ? [...value, marca.id]
                            : value.filter((id) => id !== marca.id)
                        )
                      }}
                    />
                    <Label htmlFor={`brand-${marca.id}`} className="text-sm font-normal cursor-pointer">
                      {marca.nome}
                    </Label>
                  </div>
                )
              }}
            />
          ))}
        </div>
      </div>

     
      <div>
        <h3 className="text-lg font-medium mb-3">Categoria</h3>
        <div className="space-y-2">
          {categoriasUnicas.map((categoria) => (
            <Controller
              key={categoria}
              name="types"
              control={control}
              render={({ field }) => {
                const value: string[] = field.value || []
                return (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${categoria}`}
                      checked={value.includes(categoria)}
                      onCheckedChange={(checked) => {
                        field.onChange(
                          checked
                            ? [...value, categoria]
                            : value.filter((t) => t !== categoria)
                        )
                      }}
                    />
                    <Label htmlFor={`type-${categoria}`} className="text-sm font-normal cursor-pointer">
                      {categoria}
                    </Label>
                  </div>
                )
              }}
            />
          ))}
        </div>
      </div>

      <Button variant="outline" type="button" onClick={() => { reset(); onReset(); }} className="w-full">
        Limpar Filtros
      </Button>
      <Button type="submit" className="w-full">
        Aplicar Filtros
      </Button>
    </form>
  )

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="mb-4 w-full">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px]">
          <SheetHeader className="mb-5">
            <SheetTitle>Filtros</SheetTitle>
          </SheetHeader>
          <FiltersContent />
          <SheetClose asChild />
        </SheetContent>
      </Sheet>
    )
  }

  return <FiltersContent />
}
