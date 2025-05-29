// components/Review/ReviewProduto.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { ReviewItf } from "@/app/utils/types/ReviewITF"
import { FormReview } from "./review/FormReview"
import { TabsReview } from "./review/TabsReview"

// components/ReviewProduto.tsx
interface ReviewProdutoProps {
  produtoId: number
  avaliacoes: ReviewItf[]
}

export function ReviewProduto({ produtoId, avaliacoes }: ReviewProdutoProps) {
  const [reviews] = useState<ReviewItf[]>(avaliacoes || [])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSuccess = () => {
    // Aqui você poderia opcionalmente refazer o fetch ou apenas adicionar a nova avaliação localmente
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-3xl mx-auto bg-black p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Comentários</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gray-800 text-white hover:bg-gray-700 border-0">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Comentário
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border-gray-900 text-white max-w-md rounded-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-gray-100">Adicionar Comentário</DialogTitle>
            </DialogHeader>
            <FormReview onSuccess={handleSuccess} produtoId={produtoId} />
          </DialogContent>
        </Dialog>
      </div>

      <TabsReview reviews={reviews} />
    </div>
  )
}
