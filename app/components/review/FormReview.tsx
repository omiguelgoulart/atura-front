"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReviewItf } from "@/app/utils/types/ReviewITF";
import { Label } from "@/components/ui/label";
import { InteractiveStarRating } from "./InteractiveStarRating";

interface FormReviewProps {
  onSuccess: () => void;
}

export function FormReview({ onSuccess }: FormReviewProps) {
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<ReviewItf>();
  const nota = watch("nota");

  const onSubmitReview = async (data: ReviewItf) => {
    console.log("Dados da avaliação:", data);
    try {
      // Obter o cliente do localStorage via contexto (exemplo)
      const clienteStr = localStorage.getItem("cliente");
      const cliente = clienteStr ? JSON.parse(clienteStr) : null;

      // Obter o id do produto da rota
      const url = window.location.pathname;
      const produtoId = url.split("/").pop();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/avaliacoes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            clienteId: cliente?.id,
            produtoId,
            date: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) throw new Error("Erro ao enviar comentário");
      onSuccess();
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
    } finally {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4 mt-4">
      <div>
        <Label className="text-gray-300 text-sm font-medium mb-1 block">
          Avaliação
        </Label>
        <InteractiveStarRating
          rating={nota}
          onRatingChange={(value) => setValue("nota", value)}
        />
      </div>

      <div>
        <Label
          htmlFor="comentario"
          className="text-gray-300 text-sm font-medium mb-1 block"
        >
          Comentário
        </Label>
        <Textarea
          {...register("comentario")}
          placeholder="Escreva seu comentário..."
          rows={4}
          className="bg-[#1e1e1e] border-[#333] text-white placeholder:text-gray-500"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          className="flex-1 border-[#333] text-gray-300 hover:bg-[#1e1e1e]"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={nota === 0}
          className="flex-1 bg-gray-200 text-black hover:bg-gray-300 disabled:bg-gray-800 disabled:text-gray-500"
        >
          Enviar
        </Button>
      </div>
    </form>
  );
}
