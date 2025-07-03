"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { InteractiveStarRating } from "./InteractiveStarRating";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Avaliacao } from "@/app/utils/types/AvaliacaoItf";
import { useAvaliacao } from "@/app/stores/useAvaliacao";

interface FormReviewProps {
  onSuccess: () => void;
  produtoId: number;
}

export function FormReview({ onSuccess, produtoId }: FormReviewProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<Avaliacao>();

  const { adicionarAvaliacao, enviarAvaliacao } = useAvaliacao();
  const router = useRouter();
  const nota = watch("nota");

  // ✅ Buscar cliente do cookie e registrar no formulário
  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("cliente="));
    if (cookie) {
      try {
        const decoded = decodeURIComponent(cookie.split("=")[1]);
        const cliente = JSON.parse(decoded);
        setValue("clienteId", String(cliente.id));
      } catch (err) {
        console.error("Erro ao decodificar cookie", err);
      }
    }
    setValue("produtoId", produtoId);
    setValue("nota", 0); // valor inicial padrão
  }, [produtoId, setValue]);

  const onSubmitReview = async (data: Avaliacao) => {
    if (!data.clienteId) {
      toast.warning("Você precisa estar logado para avaliar.");
      router.push("/login");
      return;
    }

    const avaliacao: Omit<Avaliacao, "id"> = {
      ...data,
      produtoId: Number(data.produtoId),
      clienteId: String(data.clienteId),
    };

    console.log("📦 Avaliação sendo enviada:", avaliacao);

    try {
      await enviarAvaliacao(avaliacao);
      adicionarAvaliacao({ ...avaliacao, id: Date.now() });
      onSuccess();
      reset();
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      toast.error("Erro ao enviar avaliação. Tente novamente.");
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
        <Label htmlFor="comentario" className="text-gray-300 text-sm font-medium mb-1 block">
          Comentário
        </Label>
        <Textarea
          {...register("comentario", { required: true })}
          placeholder="Escreva seu comentário..."
          rows={4}
          className="bg-[#1e1e1e] border-[#333] text-white placeholder:text-gray-500"
        />
      </div>

      {/* ✅ Campos ocultos para envio correto */}
      <input type="hidden" {...register("nota", { required: true })} />
      <input type="hidden" {...register("clienteId", { required: true })} />
      <input type="hidden" {...register("produtoId", { required: true })} />

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
