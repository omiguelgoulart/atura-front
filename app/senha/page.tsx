// app/esqueceu-senha/page.tsx
"use client"

import { useState, FormEvent } from "react";
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
// import { useRouter } from 'next/navigation'; // Poderia ser usado se quiséssemos redirecionar após o envio

// Função para validar o formato do email (reutilizada)
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    if (!email) {
      setError("Por favor, insira seu endereço de e-mail.");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Formato de e-mail inválido.");
      setIsLoading(false);
      return;
    }

    console.log("Solicitação de redefinição de senha para:", email);

    try {
      // AQUI VOCÊ FARÁ A CHAMADA PARA SUA API DE "ESQUECI A SENHA"
      // Exemplo:
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      // if (!response.ok) {
      //   // Mesmo em caso de erro da API (ex: email não encontrado),
      //   // por segurança, geralmente não se informa ao usuário se o email existe ou não.
      //   // A mensagem de sucesso genérica é mais segura.
      //   // No entanto, para debug ou cenários específicos, você pode querer tratar erros:
      //   // const errorData = await response.json();
      //   // throw new Error(errorData.message || 'Falha ao solicitar redefinição de senha');
      // }

      // Simulação de chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccessMessage("Se um e-mail associado a esta conta existir, um link para redefinição de senha foi enviado.");
      setEmail(""); // Limpar o campo de email após o envio bem-sucedido

    } catch (err: any) {
      console.error("Erro na solicitação de redefinição de senha:", err);
      // Em produção, para este fluxo específico, você pode optar por mostrar a mensagem de sucesso genérica
      // mesmo em caso de erro, para não vazar informação sobre contas existentes.
      // setError(err.message || "Ocorreu um erro.");
      setSuccessMessage("Se um e-mail associado a esta conta existir, um link para redefinição de senha foi enviado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Redefinir Senha
          </CardTitle>
          <CardDescription>
            Digite seu e-mail para receber um link de redefinição.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {error && !successMessage && ( // Mostrar erro apenas se não houver mensagem de sucesso
              <p className="text-sm text-destructive">{error}</p>
            )}
            {successMessage && (
              <p className="text-sm text-green-600">{successMessage}</p> // Usar uma cor para sucesso
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Link de Redefinição"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Lembrou sua senha?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Faça login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}