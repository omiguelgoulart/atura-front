"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogIn, LogOut, UserCircle } from "lucide-react"
import { useClienteStore } from "../context/ClienteContext"

interface UserNavProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function UserNav({}: UserNavProps) {
  const { cliente, deslogaCliente } = useClienteStore()
  const isLoggedIn = !!cliente?.id

  if (!isLoggedIn) {
    return (
      <Button variant="outline" asChild>
        <Link href="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Link>
      </Button>
    )
  }

 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/default-avatar.png" alt={`Avatar de ${cliente.nome}`}/>
            <AvatarFallback>
              {cliente.nome?.slice(0, 2).toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{cliente.nome}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {cliente.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/perfil" className="w-full flex items-center">
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={deslogaCliente} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
