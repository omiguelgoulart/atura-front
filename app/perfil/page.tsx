// app/perfil/page.tsx
"use client"

import { useState, FormEvent, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Edit3, KeyRound, Save, User, Phone, CalendarDays } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Dados fictícios do usuário
const initialMockUser = {
  name: "Usuário Atura Silva",
  email: "usuario.atura@exemplo.com",
  avatarUrl: "https://github.com/shadcn.png",
  initials: "US",
  joinDate: "15 de Janeiro, 2024",
  bio: "Entusiasta de tecnologia e apaixonado por soluções criativas. Sempre em busca de novos aprendizados e desafios no mundo do desenvolvimento.",
  phone: "(XX) XXXXX-XXXX",
  _currentPasswordMock: "password123" // APENAS PARA SIMULAÇÃO LOCAL
};

// Função auxiliar para validação de senha
const getPasswordChangeErrors = (newPassword: string, confirmPassword: string): string[] => {
  const errors: string[] = [];
  if (newPassword.length < 8) {
    errors.push("A nova senha deve ter pelo menos 8 caracteres.");
  }
  if (newPassword !== confirmPassword) {
    errors.push("A nova senha e a confirmação não coincidem.");
  }
  // Adicione mais regras se desejar (maiúscula, número, etc.)
  return errors;
};


export default function PerfilPage() {
  const router = useRouter();
  const [displayUser, setDisplayUser] = useState(initialMockUser);

  // Estados para o modal de Edição de Perfil
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState(""); // Inicializado no useEffect
  const [editBio, setEditBio] = useState("");   // Inicializado no useEffect
  const [editPhone, setEditPhone] = useState(""); // Inicializado no useEffect

  // Estados para o modal de Alteração de Senha
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePasswordFieldErrors, setChangePasswordFieldErrors] = useState<{ [key: string]: string[] }>({});


  useEffect(() => {
    setEditName(displayUser.name);
    setEditBio(displayUser.bio);
    setEditPhone(displayUser.phone);
  }, [displayUser, isEditDialogOpen]); // Atualiza quando displayUser muda OU quando o modal de edição é aberto

  const handleLogout = () => {
    alert("Logout simulado!");
    setDisplayUser(initialMockUser);
    router.push("/");
  };

  const handleEditProfileSubmit = (event: FormEvent) => {
    event.preventDefault();
    const updatedUser = {
      ...displayUser,
      name: editName,
      bio: editBio,
      phone: editPhone,
    };
    setDisplayUser(updatedUser);
    alert("Perfil atualizado com sucesso (simulação)!");
    setIsEditDialogOpen(false);
  };

  const handleChangePasswordSubmit = (event: FormEvent) => {
    event.preventDefault();
    setChangePasswordFieldErrors({});
    let currentFieldErrors: { [key: string]: string[] } = {};

    if (!currentPassword) {
        currentFieldErrors.currentPassword = ["Senha atual é obrigatória."];
    } else if (currentPassword !== displayUser._currentPasswordMock) { // SIMULAÇÃO - Verificação real no backend
      currentFieldErrors.currentPassword = ["Senha atual incorreta (simulação)."];
    }

    if (!newPassword) {
        currentFieldErrors.newPassword = ["Nova senha é obrigatória."];
    }
    if (!confirmNewPassword) {
        currentFieldErrors.confirmNewPassword = ["Confirmação da nova senha é obrigatória."];
    }
    
    const passwordValidationErrors = getPasswordChangeErrors(newPassword, confirmNewPassword);
    if (newPassword && passwordValidationErrors.length > 0) {
        // Adiciona erros de força/comprimento ao campo newPassword
        const strengthErrors = passwordValidationErrors.filter(err => !err.includes("não coincidem"));
        if (strengthErrors.length > 0) {
            currentFieldErrors.newPassword = [...(currentFieldErrors.newPassword || []), ...strengthErrors];
        }
        // Adiciona erro de não coincidência ao campo confirmNewPassword
        if (passwordValidationErrors.some(err => err.includes("não coincidem"))) {
            currentFieldErrors.confirmNewPassword = [...(currentFieldErrors.confirmNewPassword || []), "A nova senha e a confirmação não coincidem."];
        }
    }

    if (Object.keys(currentFieldErrors).length > 0) {
      setChangePasswordFieldErrors(currentFieldErrors);
      return;
    }

    console.log("Nova senha (simulação):", newPassword);
    alert("Senha alterada com sucesso (simulação)!");
    setDisplayUser(prev => ({ ...prev, _currentPasswordMock: newPassword }));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setIsChangePasswordDialogOpen(false);
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
          {/* Seções "Sobre Mim" e "Contato" */}
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

          {/* Ações da Conta */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold flex items-center">
              Ações da Conta
            </h3>
            {/* Modal Editar Perfil */}
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
                    <Label htmlFor="edit-name" className="text-right">Nome</Label>
                    <Input id="edit-name" value={editName} onChange={(e) => setEditName(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="edit-bio" className="text-right pt-2">Bio</Label>
                    <Textarea id="edit-bio" value={editBio} onChange={(e) => setEditBio(e.target.value)} className="col-span-3 min-h-[100px]" placeholder="Conte um pouco sobre você..."/>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-phone" className="text-right">Telefone</Label>
                    <Input id="edit-phone" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email-display" className="text-right">Email</Label>
                    <Input id="email-display" value={displayUser.email} disabled className="col-span-3" />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
                    <Button type="submit"><Save className="mr-2 h-4 w-4" />Salvar Alterações</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Modal Alterar Senha - Verifique esta seção cuidadosamente */}
            <Dialog 
              open={isChangePasswordDialogOpen} 
              onOpenChange={(isOpen) => {
                setIsChangePasswordDialogOpen(isOpen);
                if (!isOpen) { // Limpar erros e campos ao fechar o modal
                  setChangePasswordFieldErrors({});
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmNewPassword("");
                }
              }}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left">
                  <KeyRound className="mr-2 h-4 w-4" /> Alterar Senha
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle>Alterar Senha</DialogTitle>
                  <DialogDescription>
                    Defina sua nova senha. Certifique-se de que seja segura.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleChangePasswordSubmit} className="grid gap-4 py-4" noValidate>
                  <div className="space-y-1">
                    <Label htmlFor="currentPassword">Senha Atual</Label>
                    <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    {changePasswordFieldErrors.currentPassword && changePasswordFieldErrors.currentPassword.map((err, i) => (
                        <p key={`current-${i}`} className="text-sm text-destructive">{err}</p>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                     {changePasswordFieldErrors.newPassword && changePasswordFieldErrors.newPassword.map((err, i) => (
                        <p key={`new-${i}`} className="text-sm text-destructive">{err}</p>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirmNewPassword">Confirmar Nova Senha</Label>
                    <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                    {changePasswordFieldErrors.confirmNewPassword && changePasswordFieldErrors.confirmNewPassword.map((err, i) => (
                        <p key={`confirm-${i}`} className="text-sm text-destructive">{err}</p>
                    ))}
                  </div>
                  {/* Removido changePasswordError geral, pois os erros estão por campo */}
                  <DialogFooter>
                     <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
                    <Button type="submit" disabled={!(currentPassword && newPassword && confirmNewPassword)}><Save className="mr-2 h-4 w-4" />Salvar Nova Senha</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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