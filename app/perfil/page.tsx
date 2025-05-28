// app/perfil/page.tsx
"use client"

import { useState, FormEvent, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Edit3, KeyRound, Save, User, Phone, CalendarDays, ImagePlus } from "lucide-react";
import { toast } from 'sonner';

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

const initialMockUser = {
  name: "Usuário Atura Silva",
  email: "usuario.atura@exemplo.com",
  avatarUrl: "https://github.com/shadcn.png",
  initials: "US",
  joinDate: "15 de Janeiro, 2024",
  bio: "Entusiasta de tecnologia e apaixonado por soluções criativas. Sempre em busca de novos aprendizados e desafios no mundo do desenvolvimento.",
  phone: "(XX) XXXXX-XXXX",
  _currentPasswordMock: "senha1234"
};

const getPasswordChangeErrors = (newPassword: string, confirmPassword: string): string[] => {
  const errors: string[] = [];
  if (newPassword.length < 8) {
    errors.push("A nova senha deve ter pelo menos 8 caracteres.");
  }
  if (!/[a-z]/.test(newPassword)) {
    errors.push("Deve conter pelo menos uma letra minúscula.");
  }
  if (!/[A-Z]/.test(newPassword)) {
    errors.push("Deve conter pelo menos uma letra maiúscula.");
  }
  if (!/[0-9]/.test(newPassword)) {
    errors.push("Deve conter pelo menos um número.");
  }
  if (newPassword !== confirmPassword) {
    errors.push("A nova senha e a confirmação não coincidem.");
  }
  return errors;
};

export default function PerfilPage() {
  const router = useRouter();
  const [displayUser, setDisplayUser] = useState(initialMockUser);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePasswordFieldErrors, setChangePasswordFieldErrors] = useState<{ [key: string]: string[] }>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditDialogOpen) {
      setEditName(displayUser.name);
      setEditBio(displayUser.bio);
      setEditPhone(displayUser.phone);
    }
  }, [displayUser, isEditDialogOpen]);

  const handleLogout = () => {
    toast.info("Logout simulado!");
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
    toast.success("Perfil atualizado com sucesso!");
    setIsEditDialogOpen(false);
  };

  const handleChangePasswordSubmit = (event: FormEvent) => {
    event.preventDefault();
    setChangePasswordFieldErrors({});
    let currentFieldErrors: { [key: string]: string[] } = {};

    if (!currentPassword) {
        currentFieldErrors.currentPassword = ["Senha atual é obrigatória."];
    } else if (currentPassword !== displayUser._currentPasswordMock) {
      currentFieldErrors.currentPassword = ["Senha atual incorreta (simulação)."];
    }

    if (!newPassword) {
        currentFieldErrors.newPassword = [...(currentFieldErrors.newPassword || []), "Nova senha é obrigatória."];
    }
    if (!confirmNewPassword) {
        currentFieldErrors.confirmNewPassword = [...(currentFieldErrors.confirmNewPassword || []), "Confirmação da nova senha é obrigatória."];
    }
    
    if (newPassword) { 
      const passwordValidationErrors = getPasswordChangeErrors(newPassword, confirmNewPassword);
      if (passwordValidationErrors.length > 0) {
          const strengthErrors = passwordValidationErrors.filter(err => !err.includes("não coincidem"));
          if (strengthErrors.length > 0) {
              currentFieldErrors.newPassword = [...(currentFieldErrors.newPassword || []), ...strengthErrors];
          }
          if (confirmNewPassword && passwordValidationErrors.some(err => err.includes("não coincidem"))) {
              currentFieldErrors.confirmNewPassword = [...(currentFieldErrors.confirmNewPassword || []), "A nova senha e a confirmação não coincidem."];
          }
      }
    }

    if (Object.keys(currentFieldErrors).length > 0) {
      setChangePasswordFieldErrors(currentFieldErrors);
      toast.error("Por favor, corrija os erros no formulário.");
      return;
    }

    toast.success("Senha alterada com sucesso (simulação)!");
    setDisplayUser(prev => ({ ...prev, _currentPasswordMock: newPassword }));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setIsChangePasswordDialogOpen(false);
  };

  const handleAvatarChangeClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newUrl = reader.result as string;
          setDisplayUser(prev => ({ ...prev, avatarUrl: newUrl, initials: prev.name.substring(0,1) + (prev.name.split(' ')[1] ? prev.name.split(' ')[1].substring(0,1) : '') }));
          toast.success("Avatar alterado com sucesso (simulação)!");
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Por favor, selecione um arquivo de imagem.");
      }
    }
    if(event.target) {
        event.target.value = "";
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height,4rem))] flex-col items-center justify-center bg-muted/20 p-4 py-8 md:p-8">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="items-center text-center pb-6">
          <div className="relative inline-block group"> 
            <Avatar className="h-28 w-28 border-2 border-primary/50 shadow-sm">
              <AvatarImage src={displayUser.avatarUrl} alt={`Avatar de ${displayUser.name}`} />
              <AvatarFallback className="text-3xl">{displayUser.initials}</AvatarFallback>
            </Avatar>
            <div
              className="absolute inset-0 flex w-28 items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              onClick={handleAvatarChangeClick}
              title="Alterar avatar"
            >
              <ImagePlus className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="mt-4"> 
            <CardTitle className="text-3xl font-bold">{displayUser.name}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">{displayUser.email}</CardDescription>
            <p className="text-sm text-muted-foreground pt-1">
              <CalendarDays className="inline-block h-4 w-4 mr-1" />
              Membro desde: {displayUser.joinDate}
            </p>
          </div>
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
                    Faça alterações nos seus dados. O avatar é alterado diretamente na página de perfil.
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

            <Dialog 
              open={isChangePasswordDialogOpen} 
              onOpenChange={(isOpen) => {
                setIsChangePasswordDialogOpen(isOpen);
                if (!isOpen) {
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