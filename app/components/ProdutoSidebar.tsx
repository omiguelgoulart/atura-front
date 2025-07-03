"use client";

import { useMemo } from "react";
import { Filter, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { useProdutos } from "@/app/stores/useProduto"; // ajuste o path se necessário

export interface Filtros {
  marca: string;
  categoria: string;
  precoMinimo: string;
  precoMaximo: string;
}

interface ProdutoFilterSidebarProps {
  filtros: Filtros;
  onFiltroChange: (campo: keyof Filtros, valor: string) => void;
  onAplicarFiltros: () => void;
  onLimparFiltros: () => void;
  marcas: { id: string; nome: string }[];
  categorias: string[];
}

export default function ProdutoSidebar({
  filtros,
  onFiltroChange,
  onAplicarFiltros,
  onLimparFiltros,
}: ProdutoFilterSidebarProps) {
  const { produtos } = useProdutos();

  // Extrair marcas únicas dos produtos
  const marcas = useMemo(() => {
    const mapa = new Map();
    produtos.forEach((p) => {
      if (p.marca) mapa.set(p.marca.id, p.marca.nome);
    });
    return Array.from(mapa.entries()).map(([id, nome]) => ({ id: String(id), nome }));
  }, [produtos]);

// Extrair categorias únicas
const categorias = useMemo(() => {
  const CATEGORIAS_FIXAS = ["Masculino", "Feminino", "Infantil", "Unissex"];
  const categoriasDosProdutos = produtos.map((p) => p.categoria).filter(Boolean);
  const todasCategorias = new Set([...CATEGORIAS_FIXAS, ...categoriasDosProdutos]);
  return Array.from(todasCategorias);
}, [produtos]);


  return (
    <Sidebar className="h-[calc(100vh-64px)] mt-16">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <Filter className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Filtros de Produtos</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="p-4 space-y-6">
          {/* Filtro por Marca */}
          <SidebarGroup>
            <SidebarGroupLabel>Marca</SidebarGroupLabel>
            <SidebarGroupContent>
              <Select
                value={filtros.marca}
                onValueChange={(value) => onFiltroChange("marca", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas as marcas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {marcas.map((marca) => (
                    <SelectItem key={marca.id} value={marca.id}>
                      {marca.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Filtro por Categoria */}
          <SidebarGroup>
            <SidebarGroupLabel>Categoria</SidebarGroupLabel>
            <SidebarGroupContent>
              <Select
                value={filtros.categoria}
                onValueChange={(value) => onFiltroChange("categoria", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Filtros de Preço */}
          <SidebarGroup>
            <SidebarGroupLabel>Faixa de Preço</SidebarGroupLabel>
            <SidebarGroupContent className="space-y-3">
              <div>
                <Label htmlFor="preco-minimo">Preço Mínimo (R$)</Label>
                <Input
                  id="preco-minimo"
                  type="number"
                  placeholder="0,00"
                  value={filtros.precoMinimo}
                  onChange={(e) => onFiltroChange("precoMinimo", e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="preco-maximo">Preço Máximo (R$)</Label>
                <Input
                  id="preco-maximo"
                  type="number"
                  placeholder="999,99"
                  value={filtros.precoMaximo}
                  onChange={(e) => onFiltroChange("precoMaximo", e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Botões de Ação */}
          <div className="space-y-2 pt-4">
            <Button onClick={onAplicarFiltros} className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Aplicar Filtros
            </Button>
            <Button
              onClick={onLimparFiltros}
              variant="outline"
              className="w-full bg-transparent"
            >
              <X className="mr-2 h-4 w-4" />
              Limpar Filtros
            </Button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
