"use client"

import { useForm } from "react-hook-form"
import Link from "next/link"
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
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useClienteStore } from "../context/ClienteContext"

type LoginItf = {
  email: string
  password: string
  manter?: boolean
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginItf>()

  const { logaCliente } = useClienteStore()
  const router = useRouter()

  async function handleLogin(data: LoginItf) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, senha: data.password }),
      })

      if (response.status === 200) {
        const dados = await response.json()
        localStorage.setItem("token", dados.token)
        toast.success("Login realizado!")
        logaCliente(dados)
        router.push("/")

        if (data.manter) {
          localStorage.setItem("clienteKey", dados.id)
        } else {
          localStorage.removeItem("clienteKey")
        }
      }

      if (response.status === 401) {
        toast.error("Email ou senha inválidos")
      }

      if (response.status === 500) {
        toast.error("Erro interno do servidor")
      }

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.message || "Erro ao fazer login")
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      toast.error("Erro ao fazer login")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Acesse sua Conta
          </CardTitle>
          <CardDescription>
            Bem-vindo de volta! Digite seu email e senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-sm text-destructive">Email é obrigatório</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="/senha"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-sm text-destructive">Senha é obrigatória</p>
              )}
            </div>

            {/* Checkbox manter conectado */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="manter"
                {...register("manter")}
                className="h-4 w-4 border-gray-300 rounded"
              />
              <Label htmlFor="manter" className="text-sm text-muted-foreground">
                Manter conectado
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link
              href="/cadastro"
              className="font-medium text-primary hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
