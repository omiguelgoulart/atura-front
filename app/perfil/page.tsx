// app/perfil/page.tsx
"use client"

import { useState, FormEvent, useEffect } from "react"; // Adicionado FormEvent e useEffect
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Edit3, KeyRound, Mail, Phone, CalendarDays, User, Save } from "lucide-react"; // Adicionado Save

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose, // Para fechar o dialog programaticamente ou com um botão de fechar
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // Para o formulário no Dialog
import { Label } from "@/components/ui/label"; // Para o formulário no Dialog
import { Textarea } from "@/components/ui/textarea"; // Para o campo de Bio

// Dados fictícios do usuário - Manteremos este como a "fonte da verdade" inicial
const initialMockUser = {
  name: "Usuário Atura Silva",
  email: "usuario.atura@exemplo.com", // Email geralmente não é editável pelo usuário diretamente
  avatarUrl: "https://github.com/shadcn.png",
  initials: "US",
  joinDate: "15 de Janeiro, 2024",
  bio: "Entusiasta de tecnologia e apaixonado por soluções criativas. Sempre em busca de novos aprendizados e desafios no mundo do desenvolvimento.",
  phone: "(XX) XXXXX-XXXX",
};

export default function PerfilPage() {
  const router = useRouter();

  // Estado para os dados do usuário que podem ser exibidos e potencialmente atualizados
  const [displayUser, setDisplayUser] = useState(initialMockUser);

  // Estado para controlar o modal de edição
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Estados para os campos do formulário de edição
  const [editName, setEditName] = useState(displayUser.name);
  const [editBio, setEditBio] = useState(displayUser.bio);
  const [editPhone, setEditPhone] = useState(displayUser.phone);
  // Avatar e Email não serão editáveis neste exemplo simples

  // Efeito para atualizar os campos do formulário se displayUser mudar (ex: após um "save")
  useEffect(() => {
    setEditName(displayUser.name);
    setEditBio(displayUser.bio);
    setEditPhone(displayUser.phone);
  }, [displayUser]);


  const handleLogout = () => {
    alert("Logout simulado!");
    // Aqui você resetaria o displayUser para o initialMockUser ou limparia o estado global
    setDisplayUser(initialMockUser); // Reset para o mock inicial ao sair (para simulação)
    router.push("/");
  };

  const handleEditProfileSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Simulação de salvar os dados
    // Em um app real, você faria uma chamada de API aqui
    const updatedUser = {
      ...displayUser, // Mantém dados não editáveis como email, avatarUrl, initials, joinDate
      name: editName,
      bio: editBio,
      phone: editPhone,
    };
    setDisplayUser(updatedUser); // Atualiza o estado local que exibe os dados
    console.log("Perfil Atualizado (simulação):", updatedUser);
    alert("Perfil atualizado com sucesso (simulação)!");
    setIsEditDialogOpen(false); // Fecha o modal
  };

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height,4rem))] flex-col items-center justify-center bg-muted/20 p-4 py-8 md:p-8">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="items-center text-center pb-6">
          <Avatar className="h-28 w-28 mb-4 border-2 border-primary/50">
            <AvatarImage src={displayUser.avatarUrl} alt={`Avatar de ${displayUser.name}`} />
            <AvatarFallback className="text-3xl">{displayUser.initials}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold">{displayUser.name}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">{displayUser.email}</CardDescription>
          <p className="text-sm text-muted-foreground pt-1">
            <CalendarDays className="inline-block h-4 w-4 mr-1" />
            Membro desde: {displayUser.joinDate}
          </p>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6 px-6 md:px-8 space-y-8">
          {displayUser.bio && (
            <div className="space-y-2">
              <h3 className="text-xl font-semibold flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" /> Sobre Mim
              </h3>
              <p className="text-md text-muted-foreground leading-relaxed whitespace-pre-line">
                {displayUser.bio}
              </p>
            </div>
          )}

          {displayUser.phone && (
            <div className="space-y-2">
              <h3 className="text-xl font-semibold flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary" /> Contato
              </h3>
              <p className="text-md text-muted-foreground">
                {displayUser.phone}
              </p>
            </div>
          )}
          
          <Separator className="my-6" />

          <div className="space-y-3">
            <h3 className="text-xl font-semibold flex items-center">
              Ações da Conta
            </h3>
            {/* Botão Editar Perfil agora abre o Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left">
                  <Edit3 className="mr-2 h-4 w-4" /> Editar Perfil
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle>Editar Perfil</DialogTitle>
                  <DialogDescription>
                    Faça alterações no seu perfil aqui. Clique em salvar quando terminar.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditProfileSubmit} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Nome</Label>
                    <Input id="name" value={editName} onChange={(e) => setEditName(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="bio" className="text-right pt-2">Bio</Label>
                    <Textarea id="bio" value={editBio} onChange={(e) => setEditBio(e.target.value)} className="col-span-3 min-h-[100px]" placeholder="Conte um pouco sobre você..."/>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">Telefone</Label>
                    <Input id="phone" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="col-span-3" />
                  </div>
                  {/* Email e Avatar não são editáveis neste exemplo */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email-display" className="text-right">Email</Label>
                    <Input id="email-display" value={displayUser.email} disabled className="col-span-3" />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit"><Save className="mr-2 h-4 w-4" />Salvar Alterações</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="w-full justify-start text-left">
              <KeyRound className="mr-2 h-4 w-4" /> Alterar Senha
            </Button>
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="pt-6 px-6 md:px-8">
          <Button onClick={handleLogout} variant="destructive" className="w-full">
            Sair (Logout Simulado)
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}