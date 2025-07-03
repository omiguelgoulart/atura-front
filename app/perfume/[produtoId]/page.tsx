"use client";

import { Star, StarHalf } from "lucide-react";
import AddCarrinho from "@/app/components/AddCarrinho";
import { useParams } from "next/navigation";
import { useEffect,  } from "react";
import { AvaliacaoProduto } from "@/app/components/AvaliacaoProduto";
import { useProdutos } from "@/app/stores/useProduto";

export default function ProdutoPage() {
  const params = useParams();
  const { produto, carregarProdutoPorId } = useProdutos();

  useEffect(() => {
    if (params.produtoId) {
      carregarProdutoPorId(Number(params.produtoId));
    }
  }, [params.produtoId, carregarProdutoPorId]);

return (
  <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-12">
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* IMAGEM */}
      <div className="flex justify-center items-start">
        <div className="aspect-[3/4] w-full max-w-sm overflow-hidden rounded-lg border shadow-sm">
          <img
            src={produto?.foto || "/placeholder.svg"}
            alt={produto?.nome || "Produto"}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* DETALHES */}
      <div className="flex flex-col justify-between gap-8">
        <div>
          <h1 className="text-4xl font-semibold">{produto?.nome}</h1>

          <div className="flex items-center mt-2 gap-1">
            {Array(Math.floor(4.5))
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            {4.5 % 1 !== 0 && (
              <StarHalf className="w-5 h-5 text-amber-400 fill-amber-400" />
            )}
            <span className="ml-2 text-sm text-gray-500">(4.5)</span>
          </div>

          <div className="mt-4 text-3xl font-bold text-primary">
            R$ {produto?.preco.toFixed(2).replace(".", ",")}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {produto?.volumeMl}ml • {produto?.categoria}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Descrição</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {produto?.descricao}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Notas</h2>
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold">Topo</h4>
              <p>Ex: Bergamota</p>
            </div>
            <div>
              <h4 className="font-semibold">Coração</h4>
              <p>Ex: Jasmim</p>
            </div>
            <div>
              <h4 className="font-semibold">Base</h4>
              <p>Ex: Cedro</p>
            </div>
          </div>
        </div>

        <div>{produto && <AddCarrinho produto={produto} />}</div>
      </div>
    </div>

    {/* AVALIAÇÕES */}
    {produto && (
      <div className="mt-20 border-t-2 border-muted pt-10">
        <h2 className="text-2xl font-semibold mb-6">Avaliações</h2>
        <AvaliacaoProduto
          produtoId={produto.id}
          avaliacoes={Array.isArray(produto.avaliacao) ? produto.avaliacao : []}
        />
      </div>
    )}
  </div>
);
}