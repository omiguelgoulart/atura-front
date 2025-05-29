// components/Review/ReviewProduto.tsx
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { ReviewItf } from "@/app/utils/types/ReviewITF"
import { FormReview } from "./review/FormReview"
import { TabsReview } from "./review/TabsReview"

interface ReviewProdutoProps {
  avaliacao: ReviewItf;
}

export function ReviewProduto({avaliacao}: ReviewProdutoProps) {
  const [reviews, setReviews] = useState<ReviewItf[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacoes`)
      if (!response.ok) throw new Error("Erro ao buscar avaliações")
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error("Erro ao carregar avaliações:", error)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleSuccess = () => {
    fetchReviews()
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
            <FormReview onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <TabsReview reviews={reviews} />
    </div>
  )
}
