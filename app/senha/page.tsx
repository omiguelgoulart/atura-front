// app/senha/page.tsx
"use client"

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function SenhaPage() {
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string[] }>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); 
    setIsLoading(true);
    setFieldErrors({});
    setSuccessMessage("");

    let currentFieldErrors: { email?: string[] } = {};

    if (!email) {
      currentFieldErrors.email = ["Por favor, insira seu endereço de e-mail."];
    } else if (!isValidEmail(email)) {
      currentFieldErrors.email = ["Formato de e-mail inválido."];
    }

    if (Object.keys(currentFieldErrors).length > 0) {
      setFieldErrors(currentFieldErrors);
      setIsLoading(false);
      return;
    }

    
    console.log("Solicitação de redefinição de senha para:", email);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage("Se um e-mail associado a esta conta existir, um link para redefinição de senha foi enviado.");
      setEmail("");
    } catch (err: any) {
      console.error("Erro na solicitação de redefinição de senha:", err);
      setSuccessMessage("Se um e-mail associado a esta conta existir, um link para redefinição de senha foi enviado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Redefinir Senha</CardTitle>
          <CardDescription>Digite seu e-mail para receber um link de redefinição.</CardDescription>
        </CardHeader>
        <CardContent>
          
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email" 
                autoComplete="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                aria-invalid={!!fieldErrors.email}
                aria-describedby="email-error"
              />
              {fieldErrors.email && fieldErrors.email.map((err, i) => (
                <p key={i} id="email-error" className="text-sm text-destructive">{err}</p>
              ))}
            </div>
            {successMessage && (<p className="text-sm text-green-600">{successMessage}</p>)}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Link de Redefinição"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Lembrou sua senha?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">Faça login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}