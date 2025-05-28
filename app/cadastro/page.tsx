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
import { useRouter } from 'next/navigation';


const isValidEmail = (email: string): boolean => {
 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


const getPasswordStrengthErrors = (password: string): string[] => {
  const errors: string[] = [];
  if (password.length < 8) {
    errors.push("A senha deve ter pelo menos 8 caracteres.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("A senha deve conter pelo menos uma letra minúscula.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("A senha deve conter pelo menos uma letra maiúscula.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("A senha deve conter pelo menos um número.");
  }
 
  return errors;
};

export default function CadastroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); 
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>({}); 
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setFieldErrors({}); 

    let currentFieldErrors: { [key: string]: string[] } = {};


    if (!name) currentFieldErrors.name = ["O nome é obrigatório."];
    if (!email) currentFieldErrors.email = ["O email é obrigatório."];
    if (!password) currentFieldErrors.password = ["A senha é obrigatória."];
    if (!confirmPassword) currentFieldErrors.confirmPassword = ["A confirmação da senha é obrigatória."];

    
    if (email && !isValidEmail(email)) {
      currentFieldErrors.email = [...(currentFieldErrors.email || []), "Formato de email inválido."];
    }

    
    if (password) {
      const passwordErrors = getPasswordStrengthErrors(password);
      if (passwordErrors.length > 0) {
        currentFieldErrors.password = [...(currentFieldErrors.password || []), ...passwordErrors];
      }
    }

    if (password && confirmPassword && password !== confirmPassword) {
      currentFieldErrors.confirmPassword = [...(currentFieldErrors.confirmPassword || []), "As senhas não coincidem."];
    }

    if (Object.keys(currentFieldErrors).length > 0) {
      setFieldErrors(currentFieldErrors);
      setIsLoading(false);
      return;
    }

  
    console.log("Dados de Cadastro Válidos:", { name, email, password });

    try {
      // Simulação de chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      // const response = await fetch('/api/auth/register', { /* ... */ });
      // if (!response.ok) { /* ... Lógica de erro da API ... */ }
      // const data = await response.json();

      alert("Cadastro (simulado) bem-sucedido! Você será redirecionado para o login.");
      router.push('/login');

    } catch (err: any) {
      console.error("Erro no cadastro:", err);
      setError(err.message || "Ocorreu um erro ao tentar se cadastrar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Crie sua Conta
          </CardTitle>
          <CardDescription>
            Insira seus dados para começar a usar o Atura.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
           
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" name="name" type="text" autoComplete="name" placeholder="Seu nome completo" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} aria-invalid={!!fieldErrors.name} aria-describedby="name-error"/>
              {fieldErrors.name && fieldErrors.name.map((err, i) => <p key={i} id="name-error" className="text-sm text-destructive">{err}</p>)}
            </div>

          
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" autoComplete="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} aria-invalid={!!fieldErrors.email} aria-describedby="email-error"/>
              {fieldErrors.email && fieldErrors.email.map((err, i) => <p key={i} id="email-error" className="text-sm text-destructive">{err}</p>)}
            </div>

           
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" autoComplete="new-password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} aria-invalid={!!fieldErrors.password} aria-describedby="password-error"/>
              {fieldErrors.password && fieldErrors.password.map((err, i) => <p key={i} id="password-error" className="text-sm text-destructive">{err}</p>)}
            </div>

           
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" placeholder="********" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isLoading} aria-invalid={!!fieldErrors.confirmPassword} aria-describedby="confirmPassword-error"/>
              {fieldErrors.confirmPassword && fieldErrors.confirmPassword.map((err, i) => <p key={i} id="confirmPassword-error" className="text-sm text-destructive">{err}</p>)}
            </div>

           
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Criar Conta"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Faça login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}