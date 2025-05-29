"use client"

import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type LoginItf = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginItf>();

  const router = useRouter();

  async function handleLogin(data: LoginItf) {
    try {
<<<<<<< HEAD
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, senha: data.password }),
      });
=======
    
      setTimeout(() => {
        console.log("Simulando login bem-sucedido...");
        alert("Login (simulado) bem-sucedido! Redirecionando...");
        
        setIsLoading(false);
      }, 1500);
>>>>>>> 5745a66e91d226803c18c8558283e81c0aa65443

      if (response.status === 200) {
        const dados = await response.json();
        localStorage.setItem("token", dados.token);
        toast.success("Login realizado!");
        router.push("/");
        return;
      }

      if (response.status === 401) {
        toast.error("Email ou senha inválidos");
        return;
      }

      if (response.status === 500) {
        toast.error("Erro interno do servidor");
        return;
      }

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Erro ao fazer login");
        return;
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Erro ao fazer login");
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
<<<<<<< HEAD
                  href="/password"
=======
                  href="/senha" 
>>>>>>> 5745a66e91d226803c18c8558283e81c0aa65443
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
  );
}
