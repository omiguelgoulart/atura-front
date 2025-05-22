"use client";

import { useState, useEffect } from "react";
import { CardPerfume } from "./components/perfume-grid";
import Sidebar from "./components/sidebar";
import { ProdutoItf } from "./utils/types/ProdutoItf";

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutoItf[]>([]);

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/produtos`
      );
      const dados = await response.json();
      console.log(dados);
      setProdutos(dados);
    }
    buscaDados();
  }, []);

  const listaProdutos = produtos.map((produto) => (
    <CardPerfume key={produto.id} data={produto} />
  ));

  return (
    <div className="container py-8 px-6 md:py-10">
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Atura Perfumes
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <div className="hidden md:block">
          <Sidebar
            onReset={() => setProdutos([])}
            maxPrice={Math.max(...produtos.map((p) => p.preco), 0)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {listaProdutos}
        </div>
      </div>
    </div>
  );
}
