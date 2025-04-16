"use client";

import { CardPerfume } from "./components/perfume-grid";
import { useEffect, useState } from "react";
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
    <div className="container px-6 py-5 md:py-2">
  <div className="flex flex-col items-center gap-2 text-center mb-8">
    <h1 className="text-2xl font-bold tracking-tighter sm:text-5xl">
      Atura Perfumes
    </h1>
    <p className="max-w-[700px] text-muted-foreground">
      Descubra fragrâncias exclusivas que revelam sua personalidade e estilo.
    </p>
  </div>
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
    {listaProdutos}
  </div>
</div>

  );
}
