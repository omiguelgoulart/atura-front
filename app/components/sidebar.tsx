"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FilterIcon } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { ProdutoItf } from "../utils/types/ProdutoItf"

interface FiltersSidebarProps {
  produtos: ProdutoItf[]
  isMobile?: boolean
}

interface FormValues {
  brandIds: number[]
  types: string[]
}

export default function Sidebar({ produtos, isMobile = false }: FiltersSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { brandIds: [], types: [] },
  })

  // Initialize form with URL params only once
  useEffect(() => {
    const marcaParam = searchParams.get("marca")
    const tipoParam = searchParams.get("tipo")

    const initialValues: FormValues = {
      brandIds: marcaParam ? marcaParam.split(",").map(Number) : [],
      types: tipoParam ? tipoParam.split(",") : [],
    }

    reset(initialValues)
  }, [searchParams, reset])

  const marcasUnicas = Array.from(new Map(produtos.map((p) => [p.marca.id, p.marca])).values())
  const categoriasUnicas = Array.from(new Set(produtos.map((p) => p.categoria)))

  const onSubmit = (data: FormValues) => {
    const params = new URLSearchParams()

    if (data.brandIds.length > 0) {
      params.set("marca", data.brandIds.join(","))
    }
    if (data.types.length > 0) {
      params.set("tipo", data.types.join(","))
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : "/"
    router.push(newUrl)
  }

  const handleReset = () => {
    reset({ brandIds: [], types: [] })
    router.push("/")
  }

  const FiltersContent = () => (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Marcas Filter */}
        <div>
          <h3 className="text-lg font-medium mb-3">Marcas</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
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
                          const newValue = checked ? [...value, marca.id] : value.filter((id) => id !== marca.id)
                          field.onChange(newValue)
                        }}
                      />
                      <Label htmlFor={`brand-${marca.id}`} className="text-sm font-normal cursor-pointer flex-1">
                        {marca.nome}
                      </Label>
                    </div>
                  )
                }}
              />
            ))}
          </div>
        </div>

        {/* Categorias Filter */}
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
                          const newValue = checked ? [...value, categoria] : value.filter((t) => t !== categoria)
                          field.onChange(newValue)
                        }}
                      />
                      <Label htmlFor={`type-${categoria}`} className="text-sm font-normal cursor-pointer flex-1">
                        {categoria}
                      </Label>
                    </div>
                  )
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" type="button" onClick={handleReset} className="flex-1">
            Limpar
          </Button>
          <Button type="submit" className="flex-1">
            Aplicar
          </Button>
        </div>
      </form>
    </div>
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
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Filtros</h2>
      <FiltersContent />
    </div>
  )
}
