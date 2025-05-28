// app/perfil/page.tsx
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Para o botão de logout (simulado)

// Dados fictícios do usuário - em uma aplicação real, viriam do estado de autenticação/API
const mockUser = {
  name: "Usuário Atura",
  email: "usuario.atura@exemplo.com",
  avatarUrl: "https://github.com/shadcn.png", // URL de um avatar de exemplo
  initials: "UA",
};

export default function PerfilPage() {
  const router = useRouter();

  // Simulação de logout
  const handleLogout = () => {
    // Em uma aplicação real:
    // 1. Chamar API de logout
    // 2. Limpar o estado de autenticação global (context, zustand, etc.)
    // 3. Limpar tokens/cookies de sessão
    alert("Logout simulado!");
    router.push("/"); // Redireciona para a home
  };

  // Em uma aplicação real, você teria uma lógica para verificar se o usuário está logado.
  // Se não estivesse, seria redirecionado para /login.
  // Ex:
  // const { data: session, status } = useSession(); // Exemplo com NextAuth.js
  // if (status === "loading") return <p>Carregando...</p>;
  // if (status === "unauthenticated") {
  //   router.push("/login");
  //   return null;
  // }
  // const user = session?.user;

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height,4rem))] flex-col items-center justify-center bg-muted/40 p-4 md:p-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={mockUser.avatarUrl} alt={`Avatar de ${mockUser.name}`} />
            <AvatarFallback>{mockUser.initials}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{mockUser.name}</CardTitle>
          <CardDescription>{mockUser.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Informações da Conta</h3>
            <p className="text-sm text-muted-foreground">
              Aqui você poderia exibir mais detalhes ou links para editar o perfil,
              mudar a senha, gerenciar preferências, etc.
            </p>
          </div>
          {/* Exemplo de outras seções que poderiam existir */}
          {/* <div className="space-y-2">
            <h4 className="font-medium">Endereço</h4>
            <p className="text-sm text-muted-foreground">Rua Exemplo, 123 - Bairro Modelo</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Pedidos Recentes</h4>
            <p className="text-sm text-muted-foreground">Nenhum pedido recente.</p>
          </div> 
          */}
          <Button onClick={handleLogout} variant="outline" className="w-full">
            Sair (Logout Simulado)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}