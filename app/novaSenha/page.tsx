"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type FormData = {
  email: string
  codigo: string
  senha: string
}

export default function NovaSenhaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailFromQuery = searchParams.get("email")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  useEffect(() => {
    if (emailFromQuery) {
      setValue("email", emailFromQuery)
    }
  }, [emailFromQuery, setValue])

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/login/recupera-senha`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      )

      const res = await response.json()

      if (!response.ok) {
        throw new Error(res.error || "Erro ao redefinir a senha.")
      }

      toast.success("Senha redefinida com sucesso!")
      router.push("/login")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Erro desconhecido ao redefinir a senha")
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Criar nova senha
          </CardTitle>
          <CardDescription>
            Insira o código que foi enviado por e-mail e escolha uma nova senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="codigo">Código</Label>
              <Input
                id="codigo"
                type="text"
                placeholder="Digite o código recebido"
                {...register("codigo", {
                  required: "O código é obrigatório",
                  minLength: {
                    value: 4,
                    message: "O código deve ter pelo menos 4 dígitos",
                  },
                })}
              />
              {errors.codigo && (
                <p className="text-sm text-destructive">{errors.codigo.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                disabled
                {...register("email", { required: true })}
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="senha">Nova Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="********"
                {...register("senha", {
                  required: "A senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres",
                  },
                })}
              />
              {errors.senha && (
                <p className="text-sm text-destructive">{errors.senha.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Redefinindo..." : "Redefinir Senha"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Lembrou sua senha? <a href="/login" className="text-primary hover:underline ml-1">Faça login</a>
        </CardFooter>
      </Card>
    </div>
  )
}
