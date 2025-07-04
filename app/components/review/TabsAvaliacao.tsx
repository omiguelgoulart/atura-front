"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avaliacao } from "@/app/utils/types/AvaliacaoItf";
import { Estrelas } from "./Estrelas";

interface TabsReviewProps {
  reviews: Avaliacao[];
}

export function TabsAvaliacao({ reviews }: TabsReviewProps) {
  const [activeTab, setActiveTab] = useState("todos");

  const filteredReviews = reviews.filter((review) => {
    if (activeTab === "positivos") return review.nota >= 4;
    if (activeTab === "negativos") return review.nota <= 2;
    return true; // "todos"
  });

  return (
    <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="border-b border-gray-800 w-full justify-start rounded-none bg-transparent p-0 mb-4 h-auto">
        <TabsTrigger
          value="todos"
          className="px-4 py-2 text-gray-400 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white"
        >
          Todos
        </TabsTrigger>
        <TabsTrigger
          value="positivos"
          className="px-4 py-2 text-gray-400 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white"
        >
          Positivos
        </TabsTrigger>
        <TabsTrigger
          value="negativos"
          className="px-4 py-2 text-gray-400 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white"
        >
          Negativos
        </TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab}>
        <div className="divide-y divide-gray-800">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review, index) => (
              <div
                key={index}
                className="py-6 border-b border-gray-800 last:border-0"
              >
                <Estrelas rating={review.nota} />
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-medium text-gray-100">
                    {review.cliente?.nome}
                  </span>
                  <span className="text-gray-500 text-sm">|</span>
                  <span className="text-gray-400 text-sm">
                    {new Date(review.date).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {review.comentario && (
                  <p className="text-gray-300 mt-2 whitespace-pre-wrap">
                    {review.comentario}
                  </p>
                )}

                {/* ✅ Resposta da avaliação */}
                {Array.isArray(review.respostas) && review.respostas.length > 0 && (
                  <div className=" pl-4 border-l-2 border-gray-700">
                    <p className="text-sm text-gray-400">Resposta da equipe:</p>
                    {review.respostas.map((resposta, idx) => (
                      <div key={idx} className="mb-2">
                        <p className="text-blue mt-1 whitespace-pre-wrap">
                          {resposta.mensagem}
                        </p>
                        {resposta.admin?.nome && (
                          <p className="text-xs text-white mt-1">
                            — {resposta.admin.nome}
                            {resposta.respondidoEm && (
                              <> em {new Date(resposta.respondidoEm).toLocaleDateString("pt-BR")}</>
                            )}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="py-6 text-gray-400">Nenhum comentário encontrado.</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
