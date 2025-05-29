<<<<<<< HEAD
"use client";
=======
"use client"
>>>>>>> 5745a66e91d226803c18c8558283e81c0aa65443

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

type CadastroItf = {
  name: string;
  email: string;
  senha: string;
  confirmPassword: string;
};

export default function CadastroPage() {
<<<<<<< HEAD
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CadastroItf>();
  const router = useRouter();

  async function handleCadastro(data: CadastroItf) {
    console.log("Dados do cadastro:", data);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clientes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
        nome: data.name,
        email: data.email,
        senha: data.senha,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }
      toast.success("Cadastro realizado com sucesso!");
      router.push("/login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast.error("Erro ao cadastrar usuário");
=======
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
>>>>>>> 5745a66e91d226803c18c8558283e81c0aa65443
    }
  }

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
<<<<<<< HEAD
          <form onSubmit={handleSubmit(handleCadastro)} className="space-y-4">
            {/* Campo Nome */}
=======
          <form onSubmit={handleSubmit} className="space-y-4">
           
>>>>>>> 5745a66e91d226803c18c8558283e81c0aa65443
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                {...register("name", {
                  required: "O nome é obrigatório.",
                  minLength: {
                    value: 3,
                    message: "O nome deve ter pelo menos 3 caracteres.",
                  },
                })}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

          
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                {...register("email", {
                  required: "O email é obrigatório.",
                  validate: (value) =>
                    isValidEmail(value) || "Formato de email inválido.",
                })}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

           
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="senha"
                placeholder="********"
                autoComplete="nova-senha"
                {...register("senha", {
                  required: "A senha é obrigatória.",
                  validate: (value) => {
                    const passwordErrors = getPasswordStrengthErrors(value);
                    return passwordErrors.length === 0
                      ? true
                      : passwordErrors.join(" ");
                  },
                })}
              />
              {errors.senha && (
                <p className="text-sm text-destructive">{errors.senha.message}</p>
              )}
            </div>

           
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
              id="confirmPassword"
              type="password"
              placeholder="********"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "A confirmação da senha é obrigatória.",
                validate: (value) =>
                  value === watch("senha") || "As senhas não coincidem.",
              })}
              />
              {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword.message}
              </p>
              )}
            </div>

<<<<<<< HEAD
            {/* Erro Geral */}
            {Object.values(errors).length > 0 && (
              <div className="text-sm text-destructive">
                {Object.entries(errors).map(([field, error]) =>
                  error?.message ? (
                    <p key={field}>{error.message}</p>
                  ) : null
                )}
              </div>
=======
           
            {error && (
              <p className="text-sm text-destructive">{error}</p>
>>>>>>> 5745a66e91d226803c18c8558283e81c0aa65443
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Criar Conta"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
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


