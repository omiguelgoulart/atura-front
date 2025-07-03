"use client";

import { useEffect, useMemo, useState } from "react";
import { useProdutos } from "./stores/useProduto";
import { CardPerfume } from "./components/CardPerfume";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProdutoSidebar } from "./components/Sidebar";

export default function PerfumePage() {
  const { produtos, carregarProdutos, filtrarProdutos, loading } = useProdutos();

  const [filtros, setFiltros] = useState({
    marca: "all",
    categoria: "all",
    precoMinimo: "",
    precoMaximo: "",
  });

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  const marcas = useMemo(() => {
    const mapa = new Map();
    produtos.forEach((p) => {
      if (p.marca) mapa.set(p.marca.id.toString(), p.marca.nome);
    });
    return Array.from(mapa.entries()).map(([id, nome]) => ({ id, nome }));
  }, [produtos]);

  const categorias = useMemo(() => {
    return Array.from(new Set(produtos.map((p) => p.categoria))).filter(Boolean);
  }, [produtos]);

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleAplicarFiltros = () => {
    filtrarProdutos({
      marcaId: filtros.marca !== "all" ? filtros.marca : undefined,
      categoria: filtros.categoria !== "all" ? filtros.categoria : undefined,
      precoMin: filtros.precoMinimo,
      precoMax: filtros.precoMaximo,
    });
  };

  const handleLimparFiltros = () => {
    setFiltros({
      marca: "all",
      categoria: "all",
      precoMinimo: "",
      precoMaximo: "",
    });
    carregarProdutos();
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-full">

        {/* Conteúdo com Sidebar à esquerda e produtos à direita */}
        <div className="flex flex-1">
          <ProdutoSidebar
            filtros={filtros}
            onFiltroChange={handleFiltroChange}
            onAplicarFiltros={handleAplicarFiltros}
            onLimparFiltros={handleLimparFiltros}
            marcas={marcas}
            categorias={categorias}
          />

          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loading ? (
                <p>Carregando produtos...</p>
              ) : produtos.length === 0 ? (
                <p>Nenhum produto encontrado.</p>
              ) : (
                produtos.map((produto) => (
                  <CardPerfume key={produto.id} data={produto} />
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
