"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormReview } from "./review/FormAvaliacao";
import { useRouter } from "next/navigation";
import { Avaliacao } from "../utils/types/AvaliacaoItf";
import { TabsAvaliacao } from "./review/TabsAvaliacao";


interface ReviewProdutoProps {
  produtoId: number;
  avaliacoes: Avaliacao[];
}

export function AvaliacaoProduto({
  produtoId,
  avaliacoes,
}: ReviewProdutoProps) {
  const [reviews] = useState<Avaliacao[]>(avaliacoes || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    router.refresh();

    setIsModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Comentários</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              Adicionar Comentário
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border-gray-900 text-white max-w-md rounded-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-gray-100">
                Adicionar Comentário
              </DialogTitle>
            </DialogHeader>
            <FormReview onSuccess={handleSuccess} produtoId={produtoId} />
          </DialogContent>
        </Dialog>
      </div>

      <TabsAvaliacao reviews={reviews} />
    </div>
  );
}
