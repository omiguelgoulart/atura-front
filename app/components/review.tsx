"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

interface Review {
  id: string
  userName: string
  rating: number
  content: string
  date: string
  recommended: boolean
  sentiment: "positive" | "negative" | "neutral"
}

interface NewReview {
  rating: number
  content: string
  recommended: boolean
}

const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Mizael",
    rating: 5,
    content: "Muito Top! Fragrancia de ótima qualidade.",
    date: "27 de maio de 2025",
    recommended: true,
    sentiment: "positive",
  },
  {
    id: "2",
    userName: "Valdenio",
    rating: 5,
    content: "Cheirinho top demais.",
    date: "27 de maio de 2025",
    recommended: true,
    sentiment: "positive",
  },
  {
    id: "3",
    userName: "Carlos",
    rating: 4,
    content: "Bom produto, mas demorou para chegar.",
    date: "25 de maio de 2025",
    recommended: true,
    sentiment: "positive",
  },
  {
    id: "4",
    userName: "Ana",
    rating: 2,
    content: "Qualidade abaixo do esperado. Não recomendo.",
    date: "24 de maio de 2025",
    recommended: false,
    sentiment: "negative",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function InteractiveStarRating({
  rating,
  onRatingChange,
}: { rating: number; onRatingChange: (rating: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onRatingChange(star)} className="focus:outline-none">
          <svg
            className={`w-6 h-6 transition-colors ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500 fill-gray-500 hover:text-yellow-300"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="py-6 border-b border-gray-800 last:border-b-0">
      <StarRating rating={review.rating} />

      <div className="flex items-center gap-2 mt-2">
        <span className="font-medium text-gray-100">{review.userName}</span>
        <span className="text-gray-500 text-sm">|</span>
        <span className="text-gray-400 text-sm">{review.date}</span>
      </div>

      <p className="mt-3 text-gray-200 leading-relaxed">{review.content}</p>

      {review.recommended && (
        <p className="mt-3 text-gray-300">
          <span className="font-medium text-green-400">Sim,</span> eu recomendo este produto!
        </p>
      )}
    </div>
  )
}

export default function ProductReviews() {
  const [activeTab, setActiveTab] = useState("todos")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [newReview, setNewReview] = useState<NewReview>({
    rating: 0,
    content: "",
    recommended: false,
  })

  const handleSubmitReview = () => {
    if (!newReview.content || newReview.rating === 0) {
      return
    }

    const review: Review = {
      id: Date.now().toString(),
      userName: "Cliente Logado", // Nome fixo para o usuário logado
      rating: newReview.rating,
      content: newReview.content,
      date: new Date().toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      recommended: newReview.recommended,
      sentiment: newReview.rating >= 4 ? "positive" : newReview.rating >= 3 ? "neutral" : "negative",
    }

    setReviews([review, ...reviews])
    setNewReview({ rating: 0, content: "", recommended: false })
    setIsModalOpen(false)
  }

  const filteredReviews = reviews.filter((review) => {
    if (activeTab === "todos") return true
    if (activeTab === "positivos") return review.sentiment === "positive"
    if (activeTab === "negativos") return review.sentiment === "negative"
    return true
  })

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
            <DialogHeader className="flex justify-between items-center">
              <DialogTitle className="text-gray-100">Adicionar Comentário</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-gray-300 text-sm font-medium mb-1 block">Avaliação</Label>
                <InteractiveStarRating
                  rating={newReview.rating}
                  onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
                />
              </div>

              <div>
                <Label htmlFor="content" className="text-gray-300 text-sm font-medium mb-1 block">
                  Comentário
                </Label>
                <Textarea
                  id="content"
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  className="bg-[#1e1e1e] border-[#333] text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-0 rounded-md"
                  placeholder="Escreva seu comentário..."
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recommended"
                  checked={newReview.recommended}
                  onCheckedChange={(checked) => setNewReview({ ...newReview, recommended: !!checked })}
                  className="border-[#333] data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600"
                />
                <Label htmlFor="recommended" className="text-gray-300 text-sm">
                  Eu recomendo este produto
                </Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border-[#333] text-gray-300 hover:bg-[#1e1e1e] hover:text-white hover:border-[#444] bg-transparent rounded-md"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  disabled={!newReview.content || newReview.rating === 0}
                  className="flex-1 bg-gray-200 text-black hover:bg-gray-300 disabled:bg-gray-800 disabled:text-gray-500 border-0 rounded-md"
                >
                  Enviar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="border-b border-gray-800 w-full justify-start rounded-none bg-transparent p-0 mb-4 h-auto">
          <TabsTrigger
            value="todos"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 bg-transparent text-gray-400 hover:text-white transition-colors"
          >
            Todos
          </TabsTrigger>
          <TabsTrigger
            value="positivos"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 bg-transparent text-gray-400 hover:text-white transition-colors"
          >
            Positivos
          </TabsTrigger>
          <TabsTrigger
            value="negativos"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 bg-transparent text-gray-400 hover:text-white transition-colors"
          >
            Negativos
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="divide-y divide-gray-800">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => <ReviewCard key={review.id} review={review} />)
            ) : (
              <p className="py-6 text-gray-400">Nenhum comentário encontrado.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
